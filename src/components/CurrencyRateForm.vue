<template>
  <v-container fluid>
    <currency-rate-item :item="this.TOD" />
    <currency-rate-item :item="this.TOM" />
  </v-container>
</template>

<script>
import DataService from "@/backend/services/dataService";
import moment from "moment";
import CurrencyRateItem from "@/components/CurrencyRateItem.vue";

const LOTS = { TOM: "TOM", TOD: "TOD" };

export default {
  name: "CurrencyRateForm",
  components: { CurrencyRateItem },
  mounted() {
    const query_params = this.$route.query;
    if (Object.keys(query_params).length > 0) {
      if ("time" in query_params) {
        this.intervalS = query_params.time;
      }
    }
    this.loadEurRubTOM();
    this.loadEurRubTOD();
  },
  data: function () {
    const defLot = {
      currency: 0.0,
      change: 0,
      intervalIsSet: null,
      responseArray: {},
    };

    return {
      TOM: Object.assign({}, defLot, { selectedLot: "EUR_RUB__TOM" }),
      TOD: Object.assign({}, defLot, { selectedLot: "EUR_RUB__TOD" }),
      intervalS: 10, //s
    };
  },
  methods: {
    loadEurRubTOM() {
      const params = {
        lot: this.TOM.selectedLot,
        timestamp: moment().valueOf(),
      };
      DataService.getData(params).then((data) => {
        const dataRow = data.marketdata.data[0];
        data.marketdata.columns.forEach((fieldName, index) => {
          this.TOM.responseArray[fieldName] = dataRow[index];
        });
        this.TOM.currency = this.TOM.responseArray.MARKETPRICETODAY
          ? this.TOM.responseArray.MARKETPRICETODAY
          : this.TOM.responseArray.LAST;
        this.TOM.change = this.TOM.responseArray.CHANGE;

        if (this.TOM.intervalIsSet == null) {
          this.startInterval(LOTS.TOM);
        }
      });
    },
    loadEurRubTOD() {
      const params = {
        lot: this.TOD.selectedLot,
        timestamp: moment().valueOf(),
      };
      DataService.getData(params).then((data) => {
        const dataRow = data.marketdata.data[0];
        data.marketdata.columns.forEach((fieldName, index) => {
          this.TOD.responseArray[fieldName] = dataRow[index];
        });
        this.TOD.currency = this.TOD.responseArray.MARKETPRICETODAY
          ? this.TOD.responseArray.MARKETPRICETODAY
          : this.TOD.responseArray.LAST;
        this.TOD.change = this.TOD.responseArray.CHANGE;

        if (this.TOD.intervalIsSet == null) {
          this.startInterval(LOTS.TOD);
        }
      });
    },
    startInterval(lotName) {
      const intervalMS = this.intervalS * 1000;
      if (lotName == LOTS.TOM) {
        this.TOM.intervalIsSet = setInterval(() => {
          this.loadEurRubTOM();
        }, intervalMS);
      } else if (lotName == LOTS.TOD) {
        this.TOD.intervalIsSet = setInterval(() => {
          this.loadEurRubTOD();
        }, intervalMS);
      }
    },
  },
};
</script>

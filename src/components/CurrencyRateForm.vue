<template>
  <v-container fluid>
    <p>1 EUR = {{ currency }} р ( {{ responseArray.SECID }} )</p>
    <p>{{ responseArray.SYSTIME }}</p>
  </v-container>
</template>

<script>
import DataService from "@/backend/services/dataService";
import moment from "moment";

export default {
  name: "CurrencyRateForm",
  mounted() {    
    const query_params = this.$route.query;
    if (Object.keys(query_params).length > 0) {
      if ("time" in query_params) {
        this.intervalS = query_params.time;
      }
    }
    this.addCurrency();
  },
  data: function () {
    return {
      currency: 0.0,
      intervalS: 10, //s
      responseArray: {},
      intervalIsSet: null,
    };
  },
  methods: {
    addCurrency() {
      const params = {
        lot: "EUR_RUB__TOM",
        timestamp: moment().valueOf(),
      };
      DataService.getData(params).then((data) => {
        const dataRow = data.marketdata.data[0];
        data.marketdata.columns.forEach((fieldName, index) => {
          this.responseArray[fieldName] = dataRow[index];
        });

        this.currency = this.responseArray.MARKETPRICETODAY;
        if (this.intervalIsSet == null) {
         this.intervalCurrency();
        }
      });
    },
    intervalCurrency() {
      const intervalMS = this.intervalS * 1000;
      this.intervalIsSet = setInterval(() => {
        this.addCurrency();
      }, intervalMS);
    },
  },
};
</script>
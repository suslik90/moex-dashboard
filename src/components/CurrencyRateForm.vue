<template>
  <v-container fluid>
    <div class="d-flex justify-center">
      <div class="currency">{{ currency }}</div>
      <div
        class="change ml-2"
        :class="{ positive: change >= 0, negative: change < 0 }"
      >
        {{ (change > 0 ? "+" : "") + change }}
        <v-icon v-if="change >= 0" color="green"
          >mdi-arrow-top-right-thin</v-icon
        >
        <v-icon v-if="change < 0" color="red"
          >mdi-arrow-bottom-right-thin</v-icon
        >
      </div>
    </div>
    <div class="d-flex justify-center">{{ responseArray.SECID }}</div>
    <div class="d-flex justify-center">{{ responseArray.SYSTIME }}</div>
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
      change: 0,
      intervalS: 10, //s
      responseArray: {},
      intervalIsSet: null,
      selectedLot:"EUR_RUB__TOM"
    };
  },
  methods: {
    addCurrency() {
      const params = {
        lot: this.selectedLot,
        timestamp: moment().valueOf(),
      };
      DataService.getData(params).then((data) => {
        const dataRow = data.marketdata.data[0];
        data.marketdata.columns.forEach((fieldName, index) => {
          this.responseArray[fieldName] = dataRow[index];
        });
        this.currency = this.responseArray.MARKETPRICETODAY
          ? this.responseArray.MARKETPRICETODAY
          : this.responseArray.LAST;
        this.change = this.responseArray.CHANGE;
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
<style lang="scss" scoped>
.currency{
  font-size: 4em;
}
.change{
  font-size: 1.5em;
}
.positive {
  color: green;
}
.negative {
  color: red;
}
</style>
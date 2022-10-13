<template>
  <div class="wrap-item d-flex justify-center flex-column">
    <div class="d-flex justify-space-between">
      <div class="d-flex justify-start name">{{ item.responseArray.SECID }}</div>
      <div class="d-flex justify-end time">
        {{ item.responseArray.SYSTIME }}
      </div>
    </div>
    <div class="d-flex justify-center">
      <div class="currency">{{ item.currency }}</div>
      <div class="change ml-2" :class="{ positive: item.change >= 0, negative: item.change < 0 }">
        {{ (item.change > 0 ? "+" : "") + item.change }}
        <v-icon v-if="item.change >= 0" color="green">mdi-arrow-top-right-thin</v-icon>
        <v-icon v-if="item.change < 0" color="red">mdi-arrow-bottom-right-thin</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CurrencyRateItem",
  props: {
    item: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-item {
  max-width: 350px;
}

.currency {
  font-size: 4em;
}

.change {
  font-size: 1.5em;
}

.positive {
  color: green;
}

.negative {
  color: red;
}

.name,
.time {
  font-size: 0.7rem;
}
</style>
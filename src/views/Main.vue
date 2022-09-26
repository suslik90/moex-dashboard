<template>
  <v-container>
    <currency-rate-form />
  </v-container>
</template>

<script>
import CurrencyRateForm from "@/components/CurrencyRateForm.vue";

export default {
  name: "Main",
  components: {
    CurrencyRateForm,
  },
};
</script>

<style lang="scss" scoped>
</style>
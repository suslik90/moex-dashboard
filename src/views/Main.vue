<template>
  <v-container class="main-container d-flex align-center justify-center" fluid>
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
.main-container {
  height: 100vh;
}
</style>
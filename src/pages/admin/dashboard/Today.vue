<template>
  <div class="dashboard">
    <page-data-table-today-services />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  // import DashboardCharts from './DashboardCharts.vue'
  import PageDataTableTodayServices from '../tables/data-tables/live/PageDataTableTodayServices.vue'

  const dashboardMap = ref()

  function addAddressToMap({ city, country }: { city: { text: string }; country: string }) {
    dashboardMap.value.addAddress({ city: city.text, country })
  }
</script>

<style lang="scss">
  .dashboard {
    .va-card {
      margin-bottom: 0 !important;
      &__title {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>

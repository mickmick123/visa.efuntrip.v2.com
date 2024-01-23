<template>
  <div class="dashboard">
    <page-data-table-pending-services />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  // import DashboardCharts from './DashboardCharts.vue'
  import PageDataTablePendingServices from '../tables/data-tables/live/PageDataTablePendingServices.vue'
  import DashboardInfoBlock from './DashboardInfoBlock.vue'
  import moment from 'moment'

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

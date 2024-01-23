<template>
  <div class="dashboard">
    <page-data-table-clients />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  // import DashboardCharts from './DashboardCharts.vue'
  import PageDataTableClients from '../tables/data-tables/live-clients/PageDataTableClients.vue'
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

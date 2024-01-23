<template>
  <div class="dashboard">
    <!-- <dashboard-charts /> -->

    <dashboard-info-block />

    <data-table-pending-services class="mb-8" />
    <div class="mt-8"></div>
    <data-table-on-process-services class="mb-8" />
    <!-- <div class="mt-8"></div>
    <data-table-reminders-today class="mb-8" />
    <div class="mt-8"></div>
    <data-table-reminders-tomorrow class="mb-8" /> -->
    <!-- <div class="grid grid-cols-12 gap-6 mt-8">
      <dashboard-tabs class="col-span-12 lg:col-span-6" @submit="addAddressToMap" />

      <dashboard-map ref="dashboardMap" class="col-span-12 lg:col-span-6" />
    </div>
    <div class="flex justify-center mt-2">
      <va-button
        class="mr-2"
        size="small"
        preset="plain"
        href="https://www.iubenda.com/privacy-policy/19055770"
        title="Privacy Policy"
      >
        Privacy Policy
      </va-button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  // import DashboardCharts from './DashboardCharts.vue'
  import DataTablePendingServices from '../tables/data-tables/live/DataTablePendingServices.vue'
  import DataTableOnProcessServices from '../tables/data-tables/live/DataTableOnProcessServices.vue'
  import DataTableRemindersToday from '../tables/data-tables/live/DataTableRemindersToday.vue'
  import DataTableRemindersTomorrow from '../tables/data-tables/live/DataTableRemindersTomorrow.vue'
  import DashboardInfoBlock from './DashboardInfoBlock.vue'
  import DashboardTabs from './DashboardTabs.vue'
  import DashboardMap from './DashboardMap.vue'
  import { useContentStore } from '../../../stores/contentStore'
  const contents: any = useContentStore()
  const dashboardMap = ref()

  contents.getNumbers()
  // contents.getPending()
  // contents.getOnProcess()
  contents.getTodayTasks()
  contents.getTomorrowTasks()

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

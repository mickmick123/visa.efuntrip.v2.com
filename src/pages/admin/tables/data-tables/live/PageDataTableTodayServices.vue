<template>
  <div class="flex flex-row justify-between">
    <va-card title="filter" class="bg-white p-5 w-[40%]">
      <VaInput innerLabel v-model="input" placeholder="Filter..." class="w-full" />
    </va-card>
    <va-card title="filter" class="flex justify-center bg-white p-5 w-[25%]">
      <va-date-input innerLabel v-model="dateInput" label="Search date" />
    </va-card>
    <va-card title="filter" class="flex justify-center bg-white p-5 w-[25%]">
      <va-button-toggle
        v-model="model"
        class="col-span-12 lg:col-span-6 flex justify-center items-center"
        preset="outline"
        :options="options"
        border-color="primary"
        color="primary"
      />
    </va-card>
  </div>

  <div class="mb-5"></div>
  <va-card title="On Process Services" class="mb-8">
    <VaDataTable
      sticky-header
      class="va-table--striped custom-table"
      v-if="todayServices.constructor === Array"
      :fields="fields"
      :items="todayServices"
      :columns="fields"
      :per-page="per_page"
      :current-page="currentPage"
      :filter="filter"
      @filtered="filteredCount = $event.items.length"
    >
      <template #cell(created_at)="{ value }">{{ moment(value).format('L') }}</template>
      <!-- <template #item.full_name="{ item }">{{ item.first_name }} {{ item.last_name }}</template> -->

      <template #cell(actions)="{ rowIndex }">
        <VaButton size="large" preset="plain" icon="output" @click="gotoProfile(rowIndex)" />
      </template>
    </VaDataTable>
    <va-card title="filter" class="bg-white p-5 w-[100%]">
      <VaPagination visible-pages="10" v-model="currentPage" :pages="pages" />
    </va-card>
  </va-card>
</template>

<script setup lang="ts">
  import { computed, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { ref } from 'vue'
  import { useContentStore } from '../../../../../stores/contentStore'
  import { storeToRefs } from 'pinia'
  import moment from 'moment'
  import debounce from 'lodash/debounce.js'
  import { any } from '@amcharts/amcharts5/.internal/core/util/Array'

  const options = ref([
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
  ])
  const model = ref('today')

  const { t } = useI18n()
  const per_page = ref(10)
  const page = ref(1)
  const input = ref('')

  const Content: any = useContentStore()

  const current_date = moment(new Date()).format('YYYY-MM-DD')
  Content.getTodayServices(1000000, page.value, current_date, input.value)

  const { todayServices }: any = storeToRefs(Content)
  const currentPage = ref(1)

  var filter = ref(input)

  const pages = computed(() => {
    return per_page.value && per_page.value !== 0
      ? Math.ceil(todayServices.value.length / per_page.value)
      : todayServices.value.length
  })

  const filteredCount = ref(todayServices.value.length)

  const filterExact = (source: any) => {
    if (filter.value === '') {
      return true
    }
    return source?.toString?.() === filter.value
  }

  const updateFilter = (filter: any) => {
    filter = filter
  }

  const debouncedUpdateFilter = debounce(function (filter) {
    updateFilter(filter)
  }, 600)

  const gotoProfile = (row: any) => {
    console.log(todayServices.value[row])
  }

  const dateInput = ref(moment(new Date()).format('YYYY-MM-DD'))

  watch(model, async (newValue) => {
    if (newValue === 'today') {
      const newDate = moment(new Date()).format('YYYY-MM-DD')
      Content.getTodayServices(1000000, page.value, newDate, input.value)
    } else {
      const newDate = moment(new Date()).subtract(1, 'd').format('YYYY-MM-DD')
      Content.getTodayServices(1000000, page.value, newDate, input.value)
    }
  })

  watch(dateInput, async (newValue) => {
    const newDate = moment(newValue).format('YYYY-MM-DD')
    Content.getTodayServices(1000000, page.value, newDate, input.value)
  })

  watch(input, async (newValue) => {
    updateFilter(newValue)
  })

  const fields = ref([
    {
      key: 'created_at',
      label: 'Date',
    },
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'full_name',
      label: 'Client',
    },
    {
      key: 'tracking',
      label: 'Package',
    },
    {
      key: 'detail',
      label: 'Details',
    },
    {
      key: 'cost',
      label: 'Cost',
    },
    {
      key: 'charge',
      label: 'Charge',
    },
    {
      key: 'actions',
      label: 'Actions',
      tdClass: 'items-center-c',
      thClass: 'items-center-c',
    },
  ])
</script>

<style lang="scss" scoped>
  ::v-deep(.custom-table) {
    --va-data-table-thead-background: linear-gradient(0deg, var(--va-primary), var(--va-info));
    --va-data-table-tfoot-background: linear-gradient(0deg, var(--va-info), var(--va-primary));
    --va-data-table-max-height: 300px;
    --va-data-table-thead-color: var(--va-text-inverted);
    --va-data-table-tfoot-color: var(--va-text-inverted);
  }
  ::v-deep(.items-center-c) {
    --va-data-table-align: center !important;
  }
</style>

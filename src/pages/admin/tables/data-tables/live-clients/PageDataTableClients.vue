<template>
  <div class="flex flex-row justify-between">
    <va-card title="filter" class="bg-white p-5 w-[65%]">
      <VaInput v-model="input" placeholder="Filter..." class="w-full" />
    </va-card>
    <!-- <va-card title="filter" class="flex justify-center bg-white p-5 w-[25%]">
            <va-button-toggle v-model="model" class="col-span-12 lg:col-span-6 flex justify-center items-center"
                preset="outline" :options="options" border-color="primary" color="primary" />
        </va-card> -->
    <va-card title="filter" class="flex justify-center bg-white p-5 w-[25%]">
      <va-button :to="{ name: 'add-client' }">
        {{ t('menu.clientAdd') }}
      </va-button>
    </va-card>
  </div>

  <div class="mb-5"></div>
  <va-card title="On Process Services" class="mb-8">
    <VaDataTable
      sticky-header
      class="va-table--striped custom-table"
      v-if="listClientsPaginate.constructor === Array"
      :fields="fields"
      :items="listClientsPaginate"
      :columns="fields"
      :per-page="per_page"
      :current-page="currentPage"
      :filter="filter"
      @filtered="filteredCount = $event.items.length"
    >
      <template #cell(created_at)="{ value }">{{ moment(value).format('L') }}</template>
      <!-- <template #item.full_name="{ item }">{{ item.first_name }} {{ item.last_name }}</template> -->
      <template #cell(full_name)="{ value, rowIndex }">
        <VaPopover v-if="Object.keys(listClientsPaginate[rowIndex].remarks).length" class="mr-2 mb-2" color="warning">
          <VaChip color="info" size="medium">
            {{ value }}
          </VaChip>
          <template #body>
            <div v-for="rem in listClientsPaginate[rowIndex].remarks">
              <p class="font-bold text-blue-500 text-center">{{ rem.remark }}</p>
              <p class="text-center">written by</p>
              <p class="font-bold text-center">{{ rem.created_by }}</p>
              <p class="italic text-center mb-[7px]">{{ rem.created_at }}</p>
            </div>
          </template>
        </VaPopover>
        <div v-else>{{ value }}</div>
      </template>
      <template #cell(actions)="{ rowIndex }">
        <VaPopover message="Add Remarks">
          <VaButton preset="plain" icon="insert_comment" @click="showRemarks(rowIndex)" />
        </VaPopover>
        <!-- <VaPopover message="Change Status">
          <VaButton preset="plain" icon="call_split" @click="gotoProfile(rowIndex)" />
        </VaPopover> -->
        <VaPopover message="Download Excel">
          <VaButton size="large" preset="plain" icon="file_download" @click="generateExcel(rowIndex)" />
        </VaPopover>
        <VaPopover message="Client's Profile">
          <VaButton size="large" preset="plain" icon="output" @click="gotoProfile(rowIndex)" />
        </VaPopover>
      </template>
    </VaDataTable>
    <VaDataTable loading :items="[{ 'Manage Clients': 'Fetching Data' }]" v-else> </VaDataTable>
    <va-card title="filter" class="bg-white p-5 w-[100%]">
      <VaPagination v-model="currentPage" :pages="pages" />
    </va-card>
  </va-card>
  <VaModal
    v-model="showRemarksModal"
    class="modal-crud"
    title="Add Remarks"
    size="small"
    @ok="addRemarks"
    @cancel="resetRemarks"
  >
    <VaTextarea v-model="remarks" autosize max-rows="10" placeholder="Remarks here" class="w-full" />
  </VaModal>
</template>

<script setup lang="ts">
  import { computed, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { ref } from 'vue'
  import { useContentStore } from '../../../../../stores/contentStore'
  import { storeToRefs } from 'pinia'
  import moment from 'moment'
  import debounce from 'lodash/debounce.js'
  import { useToast } from 'vuestic-ui'
  import { addClientRemarks, exportExcelClientSummary, getClientServices } from '../../../../../services/request'
  const options = ref([
    { label: 'Manila', value: 1 },
    { label: 'Cebu', value: 2 },
  ])
  const model = ref(1)
  const { init, notify, close, closeAll } = useToast()
  const { t } = useI18n()
  const per_page = ref(10)
  const page = ref(1)
  const input = ref('')
  const remarkId = ref<any>(null)
  const branch = ref(1)
  const showRemarksModal = ref(false)
  const remarks = ref('')

  const Content: any = useContentStore()

  Content.getClients(1000000, page.value, branch.value, input.value)

  const { listClientsPaginate }: any = storeToRefs(Content)
  const currentPage = ref(1)

  var filter = ref(input)

  const generateExcel = async (index: any) => {
    getClientServices(listClientsPaginate.value[index].id).then((res: any) => {
      exportExcelClientSummary({
        lang: 'EN',
        user: { ...listClientsPaginate.value[index], services: res },
      }).then((exl: any) => {
        setTimeout(() => {
          const fileURL = window.URL.createObjectURL(new Blob([exl]))
          const fileLink = document.createElement('a')
          fileLink.href = fileURL
          fileLink.setAttribute('download', `${listClientsPaginate.value[index].full_name} Services.xls`)
          document.body.appendChild(fileLink)
          fileLink.click()
        }, 1000)
      })
    })
  }
  const showRemarks = (index: any) => {
    showRemarksModal.value = true
    remarkId.value = index
  }

  const addRemarks = async (row: any) => {
    if (remarks.value.toString().trim() !== '') {
      const res = await addClientRemarks(listClientsPaginate.value[remarkId.value].id, remarks.value)
      if (res.id) {
        init({ message: 'Remarks has been successfully added!', color: 'info' })
        Content.getClients(1000000, page.value, branch.value, input.value)
        showRemarksModal.value = false
      } else {
        init({ message: 'Something went wrong!', color: 'danger' })
        showRemarksModal.value = true
      }
    }
  }

  const resetRemarks = () => {
    remarks.value = ''
    remarkId.value = null
    showRemarksModal.value = false
  }

  const pages = computed(() => {
    return per_page.value && per_page.value !== 0
      ? Math.ceil(listClientsPaginate.value.length / per_page.value)
      : listClientsPaginate.value.length
  })

  const filteredCount = ref(listClientsPaginate.value.length)

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
    console.log(listClientsPaginate.value[row])
  }

  const dateInput = ref(moment(new Date()).format('YYYY-MM-DD'))

  watch(model, async (newValue) => {
    Content.getClients(1000000, page.value, newValue, input.value)
  })

  watch(input, async (newValue) => {
    updateFilter(newValue)
  })

  const fields = ref([
    {
      key: 'id',
      label: 'Client ID',
    },
    {
      key: 'full_name',
      label: 'Name',
    },
    {
      key: 'balance',
      label: 'Balance',
    },
    {
      key: 'collectable',
      label: 'Collectable',
    },
    {
      key: 'latest_package',
      label: 'Latest Package',
    },
    {
      key: 'latest_service',
      label: 'Latest Service',
    },
    {
      key: 'wallet',
      label: 'Wallet',
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
    --va-data-table-max-height: 60vh;
    --va-data-table-thead-color: var(--va-text-inverted);
    --va-data-table-tfoot-color: var(--va-text-inverted);
  }

  ::v-deep(.items-center-c) {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
</style>

<template>
  <div class="flex flex-row justify-between">
    <va-card title="filter" class="bg-white p-5 w-[40%]">
      <VaInput v-model="input" inner-label placeholder="Contact type" class="w-full" />
    </va-card>
    <va-card title="filter" class="flex justify-center bg-white p-5 w-[25%]">
      <VaButton class="rounded-sm" @click="() => addContact()"> Save </VaButton>
    </va-card>
  </div>

  <div class="mb-5"></div>
  <va-card title="Contact Types" class="mb-8">
    <VaDataTable
      v-if="contactTypeList.constructor === Array"
      sticky-header
      class="custom-table va-table--striped"
      :fields="fields"
      :items="contactTypeList"
      :columns="fields"
      :per-page="per_page"
      :current-page="currentPage"
    >
      <template #cell(actions)="{ rowIndex }">
        <VaButton class="mr-[10px]" preset="plain" icon="delete" @click="removeValue(rowIndex)" />
      </template>
    </VaDataTable>
    <va-card title="filter" class="bg-white p-5 w-[100%]">
      <VaPagination v-model="currentPage" visible-pages="10" :pages="pages" />
    </va-card>
  </va-card>
</template>

<script setup lang="ts">
  import { computed, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { ref } from 'vue'
  import { useContentStore } from '../../../../../stores/contentStore'
  import { storeToRefs } from 'pinia'
  import { addContactType, deleteContactType } from '../../../../../services/request'
  import { useModal, useToast } from 'vuestic-ui'
  const { confirm } = useModal()
  const { init, notify, close, closeAll } = useToast()
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

  Content.getContactTypeList()

  const { contactTypeList }: any = storeToRefs(Content)
  const currentPage = ref(1)

  const addContact = async () => {
    if (input.value !== '') {
      const res = await addContactType(input.value)
      if (res.status === 'Success') {
        Content.getContactTypeList()
      } else {
        init({ message: res.error, color: 'danger' })
      }
    }
  }

  const pages = computed(() => {
    return per_page.value && per_page.value !== 0
      ? Math.ceil(contactTypeList.value.length / per_page.value)
      : contactTypeList.value.length
  })

  const removeValue = (index: any) => {
    confirm('Are you sure you want to delete this item?').then(async (ok) => {
      if (ok) {
        const res = await deleteContactType(contactTypeList.value[index].id)
        if (res.status === 'Success') {
          Content.getContactTypeList()
        } else {
          init({ message: res.error, color: 'danger' })
        }
      }
    })
  }

  const fields = ref([
    {
      key: 'value',
      label: 'Value',
    },
    {
      key: 'actions',
      value: 'Actions',
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
    --va-data-table-align: end !important;
  }
</style>

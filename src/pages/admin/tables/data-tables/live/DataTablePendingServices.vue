<template>
  <va-card title="Pending Services" class="mb-8">
    <va-data-table
      sticky-header
      class="custom-table va-table--striped"
      v-if="pendingPageServices.constructor === Array"
      :fields="fields"
      :items="pendingPageServices"
      :columns="fields"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <template #cell(actions)="{ rowIndex }">
        <VaButton preset="plain" icon="output" @click="gotoProfile(rowIndex)" />
      </template>
    </va-data-table>
    <va-card title="filter" class="bg-white p-5 w-[100%]">
      <VaPagination v-model="currentPage" :pages="pages" />
    </va-card>
  </va-card>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { ref } from 'vue'
  import { useContentStore } from '../../../../../stores/contentStore'
  import { storeToRefs } from 'pinia'

  const { t } = useI18n()
  const Content: any = useContentStore()
  const perPage: any = 5
  const currentPage = ref(1)
  Content.getPendingServices(100000, currentPage.value, '')
  const { pendingPageServices }: any = storeToRefs(Content)

  const pages = computed(() => {
    return perPage && perPage !== 0
      ? Math.ceil(pendingPageServices.value.length / perPage)
      : pendingPageServices.value.length
  })

  const gotoProfile = (row: any) => {
    console.log(pendingPageServices.value[row])
  }

  const fields = ref([
    {
      key: 'detail',
      label: 'Pending Services',
    },
    {
      key: 'client.first_name',
      label: 'First Name',
    },
    {
      key: 'client.last_name',
      label: 'last Name',
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

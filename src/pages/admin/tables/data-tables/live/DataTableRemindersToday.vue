<template>
  <va-card title="On Process Services" class="mb-8">
    <VaDataTable
      class="va-table--striped"
      v-if="todayTasks.constructor === Array"
      :fields="fields"
      :items="todayTasks"
      :columns="fields"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <template #bodyAppend>
        <tr>
          <td colspan="6">
            <div class="flex justify-end mb-4 mt-2 mr-5">
              <VaPagination v-model="currentPage" :pages="pages" />
            </div>
          </td>
        </tr>
      </template>
    </VaDataTable>
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
  const { todayTasks }: any = storeToRefs(Content)
  const perPage: any = 5
  const currentPage = ref(1)

  const pages = computed(() => {
    return perPage && perPage !== 0 ? Math.ceil(todayTasks.value.length / perPage) : todayTasks.value.length
  })

  const fields = ref([
    {
      key: 'detail',
      label: "Today's Tasks",
    },
    {
      key: 'client.first_name',
      label: 'First Name',
    },
    {
      key: 'client.last_name',
      label: 'last Name',
    },
  ])
</script>

<style lang="scss"></style>

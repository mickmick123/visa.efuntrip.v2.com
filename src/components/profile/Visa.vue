<template>
  <div v-if="!isLoading" class="flex flex-wrap gap-5 mt-5">
    <VaCard :bordered="false">
      <VaCardContent>
        <VaTabs v-model="value" grow class="my-tab">
          <template #tabs>
            <VaTab v-for="tab in tabs" :key="tab.title" :name="tab.title">
              {{ tab.title }}
            </VaTab>
          </template>

          <packages v-if="currentTab.content === 'Services'" />
          <groups v-if="currentTab.content === 'Groups'" />
          <logs v-if="currentTab.content === 'Logs'" />
        </VaTabs>
      </VaCardContent>
    </VaCard>
  </div>
  <div v-else class="flex justify-center items-center w-full h-[400px]">
    <VaProgressCircle :thickness="0.6" indeterminate />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { getClientRemarks } from '../../services/request'
  import Packages from './Tabs/Packages.vue'
  import Groups from './Tabs/Groups.vue'
  import Logs from './Tabs/Logs.vue'
  import moment from 'moment'

  const route = useRoute()

  const TABS = [
    { icon: 'feed', title: 'Services', content: 'Services' },
    { icon: 'person', title: 'Groups', content: 'Groups' },
    { icon: 'mail', title: 'Logs', content: 'Logs' },
  ]
  const tabs = ref<any>(TABS)
  const remarks = ref<any>({})
  const isLoading = ref(true)
  const value = ref<any>(TABS[0].title)

  const currentTab = computed(() => {
    return tabs.value.find(({ title }: any) => title === value.value)
  })
  const loadProfile = async () => {
    isLoading.value = true
    const res = await getClientRemarks(route.params.id)
    remarks.value = res.data
    isLoading.value = false
  }
  loadProfile()
</script>

<style scoped>
  .list__item + .list__item {
    margin-top: 30px;
  }

  .va-list-item-label--caption {
    -webkit-line-clamp: 10 !important;
  }
  .va-tabs__content {
    width: 100% !important;
  }
</style>

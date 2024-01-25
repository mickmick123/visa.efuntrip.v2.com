<template>
  <div v-if="!isLoading" class="flex flex-wrap gap-5 mt-5">
    <VaCard :bordered="false">
      <VaCardTitle>History</VaCardTitle>
      <VaCardContent>
        <VaList>
          <VaListItem v-for="(contact, index) in remarks" :key="index" class="list__item">
            <VaListItemSection avatar>
              <VaBadge :text="contact.created_at" color="success" class="mr-2">
                <VaAvatar color="#540C0C" text-color="#fafaa0">
                  {{ getInitials(contact.created_by) }}
                </VaAvatar>
              </VaBadge>
            </VaListItemSection>

            <VaListItemSection>
              <VaListItemLabel>
                {{ contact.created_by }}
              </VaListItemLabel>

              <VaListItemLabel class="text-red-500" caption :lines="index + 1">
                {{ contact.remark }}
              </VaListItemLabel>
            </VaListItemSection>

            <VaListItemSection icon>
              <VaIcon name="remove_red_eye" color="background-element" />
            </VaListItemSection>
          </VaListItem>
        </VaList>
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
  import moment from 'moment'
  const route = useRoute()

  const remarks = ref<any>({})
  const isLoading = ref(true)

  const getInitials = (name: any) => {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')

    let initials = [...name.matchAll(rgx)] || []

    initials = ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')).toUpperCase()

    return initials
  }
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
</style>

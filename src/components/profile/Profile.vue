<template>
  <div v-if="!isLoading" class="flex flex-wrap gap-5 mt-5">
    <VaCard :bordered="false">
      <VaCardTitle>Personal Information</VaCardTitle>
      <VaCardContent>
        <VaChip icon="face" size="large">
          {{ `${client.first_name} ${client.last_name}` }}
        </VaChip>
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
          <VaInput v-model="client.gender" label="gender" readonly class="mb-6" placeholder="N/A" />
          <VaInput v-model="client.birth_date" label="Birth day" readonly class="mb-6" placeholder="N/A" />
          <VaInput v-model="age" label="Age" readonly class="mb-6" placeholder="N/A" />
          <VaInput v-model="client.nationalities[0]" label="Nationality" readonly class="mb-6" placeholder="N/A" />
          <VaInput v-model="client.birth_country" label="Birth Country" readonly class="mb-6" placeholder="N/A" />
          <VaInput v-model="client.contact" label="Contact #" readonly class="mb-6" placeholder="N/A" />
          <VaInput v-model="client.passport" label="Passport" readonly class="mb-6" placeholder="N/A" />
          <VaInput
            v-model="client.passport_exp_date"
            label="Passport Expiration"
            readonly
            class="mb-6"
            placeholder="N/A"
          />
          <VaInput v-model="client.visa_type" label="Visa Type" readonly class="mb-6" placeholder="N/A" />
          <VaTextarea
            v-model="client.address"
            class="col-span-4"
            label="Address"
            readonly
            placeholder="Empty address"
          />
        </div>
      </VaCardContent>
    </VaCard>

    <VaCard square outlined>
      <VaCardTitle>Statistics</VaCardTitle>
      <VaCardContent>
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 items-end">
          <VaInput v-model="client.total_ewallet" label="E-wallet balance" readonly class="mb-6" placeholder="N/A" />
          <VaInput
            v-model="client.total_complete_service_cost"
            label="Total Complete Service Cost"
            readonly
            class="mb-6"
            placeholder="N/A"
          />
          <VaInput v-model="client.total_cost" label="Total Service Cost" readonly class="mb-6" placeholder="N/A" />
          <VaInput v-model="client.total_payment" label="Total Payment" readonly class="mb-6" placeholder="N/A" />
          <VaInput
            v-model="client.total_refund"
            label="Total Withdrawal Amount"
            readonly
            class="mb-6"
            placeholder="N/A"
          />
          <VaInput
            v-model="client.total_discount"
            label="Total Promo Availed"
            readonly
            class="mb-6"
            placeholder="N/A"
          />
        </div>
      </VaCardContent>
    </VaCard>

    <VaCard :bordered="false">
      <VaCardTitle>Collectables</VaCardTitle>
      <VaCardContent>
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 items-end">
          <VaInput v-model="client.balance" label="Total balance" readonly class="mb-6" placeholder="N/A" />
          <VaInput v-model="client.collectable" label="Total Collectables" readonly class="mb-6" placeholder="N/A" />
        </div>
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
  import { getClientProfile } from '../../services/request'
  import moment from 'moment'
  const route = useRoute()

  const client = ref<any>({})
  const isLoading = ref(true)
  const age = computed(() => {
    return client.value && moment().diff(client.value.birth_date, 'years')
  })
  const loadProfile = async () => {
    isLoading.value = true
    const res = await getClientProfile(route.params.id)
    client.value = res.data.client
    isLoading.value = false
  }
  loadProfile()
</script>

<style scoped></style>

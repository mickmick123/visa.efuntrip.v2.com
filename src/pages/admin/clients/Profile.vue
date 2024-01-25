<template>
  <div class="dashboard">
    <div class="btn-header">
      <VaButtonGroup icon-color="warning" class="w-full">
        <VaButton
          :color="selected === 1 ? 'info' : 'primary'"
          size="small"
          icon="person"
          class="!w-[20%] !h-[40px]"
          @click="() => selectedItem(1)"
        >
          Profile
        </VaButton>
        <VaButton
          :color="selected === 2 ? 'info' : 'primary'"
          size="small"
          icon="book"
          class="!w-[20%] !h-[40px]"
          @click="() => selectedItem(2)"
        >
          Visa
        </VaButton>
        <VaButton
          :color="selected === 3 ? 'info' : 'primary'"
          size="small"
          icon="attach_file"
          class="!w-[20%] !h-[40px]"
          @click="() => selectedItem(3)"
        >
          Documents
        </VaButton>
        <VaButton
          :color="selected === 4 ? 'info' : 'primary'"
          size="small"
          icon="av_timer"
          class="!w-[20%] !h-[40px]"
          @click="() => selectedItem(4)"
        >
          Transactions
        </VaButton>
        <VaButton
          :color="selected === 5 ? 'info' : 'primary'"
          size="small"
          icon="call_split"
          class="!w-[20%] !h-[40px]"
          @click="() => selectedItem(5)"
        >
          Client Remarks
        </VaButton>
      </VaButtonGroup>
    </div>
    <profile v-if="selected === 1" />
    <visa v-if="selected === 2" />
    <documents v-if="selected === 3" />
    <transactions v-if="selected === 4" />
    <remarks v-if="selected === 5" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Profile from '../../../components/profile/Profile.vue'
  import Documents from '../../../components/profile/Documents.vue'
  import Remarks from '../../../components/profile/Remarks.vue'
  import Transactions from '../../../components/profile/Transactions.vue'
  import Visa from '../../../components/profile/Visa.vue'
  const selected = ref(1)
  const selectedItem = (val: any) => {
    selected.value = val
  }
</script>

<style lang="scss">
  .btn-header {
    display: flex;
    align-items: center;
  }

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

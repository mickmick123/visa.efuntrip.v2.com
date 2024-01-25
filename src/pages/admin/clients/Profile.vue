<template>
    <div class="dashboard">
        <div class="btn-header">
            <VaButtonGroup icon-color="warning" class="w-full">
                <VaButton @click="() => selectedItem(1)" :color="selected === 1 ? 'info':'primary'" size="small" icon="person"
                    class="!w-[20%] !h-[40px]">
                    Profile
                </VaButton>
                <VaButton @click="() => selectedItem(2)" :color="selected === 2 ? 'info':'primary'" size="small" icon="book" class="!w-[20%] !h-[40px]">
                    Visa
                </VaButton>
                <VaButton @click="() => selectedItem(3)" :color="selected === 3 ? 'info':'primary'" size="small" icon="attach_file" class="!w-[20%] !h-[40px]">
                    Documents
                </VaButton>
                <VaButton @click="() => selectedItem(4)" :color="selected === 4 ? 'info':'primary'" size="small" icon="av_timer" class="!w-[20%] !h-[40px]">
                    Transactions
                </VaButton>
                <VaButton @click="() => selectedItem(5)" :color="selected === 5 ? 'info':'primary'" size="small" icon="call_split" class="!w-[20%] !h-[40px]">
                    Client Remarks
                </VaButton>
            </VaButtonGroup>
        </div>
        <profile v-if="selected === 1" />
        <visa v-if="selected === 2" />
        <documents v-if="selected === 3" />
        <transactions v-if="selected === 4"/>
        <remarks v-if="selected === 5"/>
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
  
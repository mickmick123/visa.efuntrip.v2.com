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
                    Transaction History
                </VaButton>
                <VaButton @click="() => selectedItem(5)" :color="selected === 5 ? 'info':'primary'" size="small" icon="call_split" class="!w-[20%] !h-[40px]">
                    Client Remarks History
                </VaButton>
            </VaButtonGroup>
        </div>
        <profile v-if="selected === 1" />
        <Documents v-if="selected === 3" />
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import Profile from '../../../components/profile/Profile.vue'
import Documents from '../../../components/profile/Documents.vue'

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
  
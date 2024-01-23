<template>
    <div v-if="!isLoading" class="flex flex-wrap gap-5 mt-5">
        <VaCard :bordered="false">
            <VaCardTitle>Upload Documents</VaCardTitle>
            <VaCardContent>
                <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
                    <VaFileUpload class="col-span-3" v-model="img" undo type="gallery" :undo-duration="1000" undo-button-text="Delete"
                        deleted-file-message="File Deleted" />
                    <VaInput v-if="img.length" label="*Document Type" class="mb-6" />
                    <VaInput v-if="img.length" label="*Issued on" class="mb-6" />
                    <VaInput v-if="img.length" label="Expired on" class="mb-6" />
                    
                </div>
            </VaCardContent>
        </VaCard>
        <VaCard :bordered="false">
            <VaCardTitle>Documents</VaCardTitle>
            <VaCardContent>
                <div class="flex p-10 w-100% flex-wrap ustify-evenly items-center">
                    <VaCard v-for="doc, index in documents" :key="index" class="max-w-[25%] min-w-[25%] m-5">
                        <VaImage :src="`${baseUrl}${doc.file_path}`" :fallbackSrc="noImage" class="h-52" />
                        <VaCardTitle>{{ doc.name }}</VaCardTitle>
                        <VaCardContent>
                            <p>Date Issued:
                                <VaBadge :text="dateFilter(doc.issued_at)" color="success" class="mr-2" />
                            </p>
                            <p>Expiration Date:
                                <VaBadge :text="dateFilter(doc.expired_at)" color="danger" class="mr-2" />
                            </p>
                        </VaCardContent>
                    </VaCard>
                </div>

            </VaCardContent>
        </VaCard>
    </div>
    <div v-else class="flex justify-center items-center w-full h-[400px]">
        <VaProgressCircle :thickness="0.6" indeterminate />
    </div>
</template>
  
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getClientDocuments } from '../../services/request';
import noImage from '../../assets/images/noimage.png';
import moment from 'moment';

const route = useRoute();
const baseUrl = `${import.meta.env.VITE_APP_STORAGE}`
const documents = ref<any>({})
const isLoading = ref(true)
const img = ref([])
const dateFilter = (dt: any) => {
    if (dt !== '0000-00-00') {
        return dt
    } else {
        return 'N/A'
    }
}
const loadProfile = async () => {
    isLoading.value = true
    const res = await getClientDocuments(route.params.id)
    documents.value = res.data
    console.log(documents.value)
    isLoading.value = false
}
loadProfile()
</script>
  
<style scoped>
.flex-container {
    flex: 1;
    display: flex;
    overflow: auto;
}
</style>
  
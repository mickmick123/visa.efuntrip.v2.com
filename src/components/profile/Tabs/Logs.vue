<template>
    <div v-if="!isLoading" class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-1 items-start !w-full">
        <VaAccordion v-model="value" class="w-full mt-10">
            <VaCollapse solid color="success" v-for="(collapse, index) in collapses" :key="index" :header="collapse.title">
                <template #content>
                    <action  v-if="collapse.content === 'Action'"  />
                    <service  v-if="collapse.content === 'Service'"  />
                </template>
            </VaCollapse>
        </VaAccordion>
    </div>
    <div v-else class="flex justify-center items-center w-full h-[400px]">
        <VaProgressCircle :thickness="0.6" indeterminate />
    </div>
</template>
  
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
    addClientPackage,
    addClientService,
    getClientGroups,
    getPackageServices,
    getServices,
} from '../../../services/request'
import moment from 'moment'
import { useForm, useToast } from 'vuestic-ui/web-components'
import { useContentStore } from '../../../stores/contentStore'
import Action from '../Tabs/Logs/Action.vue'
import Service from '../Tabs/Logs/Service.vue'
const route = useRoute()
const { isValid, validate, reset } = useForm('formRef')
const { init, notify, close, closeAll } = useToast()

const Content: any = useContentStore()
const isLoading = ref(true)
const groups = ref<any>([])
const carVal = ref<any>(0)
const selectedPackage = ref<any>(null)

const value = [false, false, false]
const collapses = [
    { title: "Action Logs", content: "Action" },
    { title: "Service Logs", content: "Service" },
    // { title: "Document Logs", content: "Document" },
]

const loadProfile = async () => {
    isLoading.value = true
    const res = await getClientGroups(route.params.id)
    groups.value = res.data
    isLoading.value = false
}
loadProfile()
</script>
  
<style scoped>
.list__item+.list__item {
    margin-top: 30px;
}

.va-list-item-label--caption {
    -webkit-line-clamp: 10 !important;
}

.va-tabs__content {
    width: 100% !important;
}
</style>
  
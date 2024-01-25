<template>
    <div v-if="!isLoading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-start !w-full">
        <div v-if="!selectedPackage && !packages.length"
            class="col-start-4 flex w-full h-[300px] justify-center items-center">
            <VaButton @click="() => generatePackage()" class=""> Create New Package </VaButton>
        </div>
        <div v-if="!selectedPackage && packages.length"
            class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start col-span-4">
            <VaButton @click="() => generatePackage()" class="col-start-3 mb-10"> Create New Package </VaButton>
        </div>

        <div v-if="!selectedPackage"
            class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start col-span-4">
            <VaBadge @click="selectPackage(index)" v-for="pk, index in packages" placement="top-left" :offset="[64, 0]"
                class="w-full h-[95%] cursor-pointer" overlap :text="moment(pk.created_at).format('LL')" color="#34d2eb">
                <VaCard class="w-full" gradient
                    :color="pk.status ? pk.status === 'pending' ? 'warning' : pk.status === 'on process' ? 'primary' : 'success' : 'danger'">
                    <VaCardTitle>
                        {{ pk.status ? pk.status === 'pending' ? 'Pending' :
                            pk.status === 'on process' ? 'On Process' :
                                'Completed' : 'Empty' }}
                    </VaCardTitle>
                    <VaCardContent>
                        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-1 items-start">
                            <h1 class="col-span-2">Package #: <b><i>{{ pk.tracking }}</i></b></h1>
                            <h2 class="col-span-2 mb-3">Package Cost: <b><i>{{ pk.package_cost }}</i></b>
                            </h2>
                        </div>

                    </VaCardContent>
                </VaCard>
            </VaBadge>
        </div>


        <div v-if="selectedPackage" class="col-start-1 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 col-span-2">
            <VaButton icon="clear" color="danger" class="mr-3 mb-2" @click="() => resetSelected()">
                Go back
            </VaButton>
            <VaButton v-if="!isAddService" icon="add" color="primary" class="mr-3 mb-2 col-span-2" @click="() => showAddService()">
                Add new service
            </VaButton>
        </div>



        <div v-if="selectedPackage && isAddService" class="col-span-4">
            <VaForm ref="formRef" class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-6 gap-4 items-start">
                <VaSelect class="col-span-3" inner-label searchable multiple :rules="[(v: any) => v || 'Field is required']"
                    v-model="form.serviceSelected" :options="serviceList" label="Services" placeholder="Services" />
                <VaInput class="col-span-3 col-start-1" inner-label
                    :rules="[(value: any) => (value && value.length > 0) || 'This field is required']" v-model="form.note"
                    label="Note" placeholder="Note" />
                <VaInput class="col-start-1" inner-label
                    v-if="(form.serviceSelected.length == 2 && !form.serviceSelected[0])" readonly
                    v-model="form.serviceSelected[1].charge" label="Total Price" placeholder="Total" />
                <VaInput class="col-start-1" inner-label v-if="form.serviceSelected.length == 1" readonly
                    v-model="form.serviceSelected[0].charge" label="Total Price" placeholder="Total" />
                <VaButton :disabled="!isValid" @click="validate() && submit()" size="medium" color="primary">
                    Save Service
                </VaButton>
                <VaButton  @click="hideAddService()" size="medium" color="danger">
                    Cancel
                </VaButton>
            </VaForm>
        </div>
        <div class="col-span-4" v-if="selectedPackage && isShowServices">
            <page-data-table-services />
        </div>


    </div>
    <div v-else class="flex justify-center items-center w-full h-[400px]">
        <VaProgressCircle :thickness="0.6" indeterminate />
    </div>
</template>
  
<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { addClientPackage, addClientService, getClientPackages, getPackageServices, getServices } from '../../../services/request';
import moment from 'moment';
import { useForm, useToast } from 'vuestic-ui/web-components';
import PageDataTableServices from '../../../pages/admin/tables/data-tables/live-clients/PageDataTableServices.vue';
import { useContentStore } from '../../../stores/contentStore';
const route = useRoute();
const { isValid, validate, reset } = useForm('formRef')
const { init, notify, close, closeAll } = useToast()

const Content: any = useContentStore()
const isLoading = ref(true)
const packages = ref<any>([])
const carVal = ref<any>(0)
const selectedPackage = ref<any>(null)
const packageServices = ref<any>([])
const serviceList = ref<any>([])
const isAddService = ref<any>(false)
const isShowServices = ref<any>(false)

const submit = async () => {
    const branches: any = []
    var tips: any = 0
    var charge: any = 0
    var cost: any = 0

    form.serviceSelected.map((o: any) => {
        if (o) {
            branches.push(o.id)
            tips = tips + parseFloat(o.tip)
            charge = charge + parseFloat(o.charge)
            cost = cost + parseFloat(o.cost)
        }

    })
    const params = {
        "branch_id": 1,
        "services": branches,
        "note": form.note,
        "tip": tips,
        "charge": charge,
        "month": "",
        "cost": cost,
        "client_id": route.params.id,
        "tracking": selectedPackage.value.tracking,
    }
    const res = await addClientService(params)
    if (res.status === 'Success') {
        loadProfile()
        init({ message: 'Service added', color: 'success' })
        reset()
        Content.getClientServices(route.params.id, selectedPackage.value.tracking)
        isShowServices.value = true
    } else {
        let errors: any = ''
        Object.keys(res.errors).forEach(function (key, index) {
            errors = res.errors[key]
            init({ message: errors.toString().replace('[ "', '').replace('" ]', ''), color: 'danger' })
        })
    }
}
const resetSelected = () => {
    selectedPackage.value = null
    isAddService.value = false
    isShowServices.value = false
}

const form: any = reactive({
    serviceSelected: '',
    note: ''
})

const hideAddService = async () => {
    isAddService.value = false
    reset()
    // selectedPackage.value = packages.value[index];
    // const res = await getServices()
    // serviceList.value = res.data.services.map((sr: any) => {
    //     return { ...sr, text: sr.detail, value: sr.id }
    // })
}


const showAddService = async () => {
    isAddService.value = true
    // selectedPackage.value = packages.value[index];
    // const res = await getServices()
    // serviceList.value = res.data.services.map((sr: any) => {
    //     return { ...sr, text: sr.detail, value: sr.id }
    // })
}

const selectPackage = async (index: any) => {
    selectedPackage.value = packages.value[index];
    const res = await getPackageServices(route.params.id, packages.value[index].tracking)
    packageServices.value = res.data
    showServices(index)
}

const showServices = (index: any) => {
    Content.getClientServices(route.params.id, packages.value[index].tracking)
    isShowServices.value = true
}


const generatePackage = async () => {
    const res: any = await addClientPackage(route.params.id)
    if (res.status === "Success") {
        loadProfile()
        init({ message: 'New package has been added', color: 'success' })
    } else {
        init({ message: 'Something went wrong', color: 'danger' })
    }
}

const loadProfile = async () => {
    isLoading.value = true
    const res = await getClientPackages(route.params.id)
    packages.value = res.data
    const sl = await getServices()
    serviceList.value = sl.data.services.map((sr: any) => {
        return { ...sr, text: sr.detail, value: sr.id }
    })
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
  
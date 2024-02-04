<template>
    <div v-if="!isLoading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-start !w-full">
      <div
        v-if="!selectedPackage"
        class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start col-span-4"
      >
        <VaBadge
          v-for="(pk, index) in groups"
          :key="index"
          placement="top-left"
          :offset="[64, 0]"
          class="w-full h-[95%] cursor-pointer"
          overlap
          :text="pk.name"
          color="#34d2eb"
        >
          <VaCard
            class="w-full"
            gradient
            color="primary"
          >
            <VaCardTitle class="!text-lg">
              {{
                `${pk.leader.first_name} ${pk.leader.last_name}`
              }}
            </VaCardTitle>
            <VaCardContent>
              <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-1 items-start">
                <h1 class="col-span-2">
                    Tracking #:
                  <b
                    ><i>{{ pk.tracking }}</i></b
                  >
                </h1>
                <h2 class="col-span-2 mt-3 text-sm">
                 Last active service: 
                  <b
                    ><i>{{ moment(pk.client_last_active.created_at).format('lll') }}</i></b
                  >
                </h2>
                <h2 class="col-span-2 mb-3 text-sm">
                 Group latest service: 
                  <b
                    ><i>{{ moment(pk.group_latest_active.created_at).format('lll') }}</i></b
                  >
                </h2>
              </div>
            </VaCardContent>
          </VaCard>
        </VaBadge>
      </div>
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
    import PageDataTableServices from '../../../pages/admin/tables/data-tables/live-clients/PageDataTableServices.vue'
    import { useContentStore } from '../../../stores/contentStore'
    const route = useRoute()
    const { isValid, validate, reset } = useForm('formRef')
    const { init, notify, close, closeAll } = useToast()
  
    const Content: any = useContentStore()
    const isLoading = ref(true)
    const groups = ref<any>([])
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
        branch_id: 1,
        services: branches,
        note: form.note,
        tip: tips,
        charge: charge,
        month: '',
        cost: cost,
        client_id: route.params.id,
        tracking: selectedPackage.value.tracking,
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
      note: '',
    })
  
  
    const loadProfile = async () => {
      isLoading.value = true
      const res = await getClientGroups(route.params.id)
      groups.value = res.data
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
  
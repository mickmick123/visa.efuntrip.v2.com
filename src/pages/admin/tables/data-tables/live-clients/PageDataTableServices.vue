<template>
  <div class="mb-5"></div>
  <va-card title="Contact Types" class="mb-8">
    <VaDataTable
      v-if="clientServices.constructor === Array"
      :row-bind="getRowBind"
      sticky-header
      class="custom-table va-table--striped"
      :fields="fields"
      :items="clientServices"
      :columns="fields"
      :per-page="per_page"
      :current-page="currentPage"
    >
      <template #cell(charge)="{ value }"> - {{ value }} </template>
      <template #cell(discount_amount)="{ value }">
        {{ value ? value : 0 }}
      </template>
      <template #cell(payment_amount)="{ value }">
        {{ value ? value : 0 }}
      </template>
      <template #cell(sub_total)="{ rowIndex }">
        {{ subTotal(rowIndex) > 0 ? `-${subTotal(rowIndex)}` : subTotal(rowIndex) }}
      </template>
      <template #cell(actions)="{ rowIndex }">
        <VaPopover class="mr-2 mb-2" message="Edit" color="success">
          <VaButton class="mr-[10px]" preset="plain" icon="mode_edit" @click="editThisItem(rowIndex)" />
        </VaPopover>
        <VaPopover class="mr-2 mb-2" message="Add Payment" color="primary">
          <VaButton class="mr-[10px]" preset="plain" icon="payment" @click="payThisItem(rowIndex)" />
        </VaPopover>
      </template>
    </VaDataTable>
    <va-card title="filter" class="bg-white p-5 w-[100%]">
      <VaAlert v-if="showPayment" class="!mt-2 !mb-5" color="info" outline>
        <VaForm ref="paymentRef" hide-error-messages class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-6 gap-3">
          <VaInput
            v-model="form.amount"
            class="col-span-2"
            inner-label
            :rules="[(value: any) => (value && value.length > 0) || 'This field is required']"
            label="Amount"
            placeholder="0.00"
          />
          <VaSelect
            v-model="form.payment_mode"
            class="col-span-2"
            :options="payment_options"
            placeholder="Select an mode"
            :rules="[(v: any) => v || 'Field is required']"
          />
          <VaButton
            :disabled="form.amount === '' || form.payment_mode === ''"
            size="medium"
            color="primary"
            @click="submit()"
          >
            Confirm
          </VaButton>
          <VaButton size="medium" color="danger" @click="cancelPayment()"> Cancel </VaButton>
        </VaForm>
      </VaAlert>
      <VaPagination v-model="currentPage" visible-pages="10" :pages="pages" />
    </va-card>
  </va-card>
</template>

<script setup lang="ts">
  import { computed, reactive, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { ref } from 'vue'
  import { useContentStore } from '../../../../../stores/contentStore'
  import { storeToRefs } from 'pinia'
  import {
    addContactType,
    deleteContactType,
    getClientProfile,
    payClientService,
  } from '../../../../../services/request'
  import { useForm, useModal, useToast } from 'vuestic-ui'
  import { useRoute } from 'vue-router'
  const { confirm } = useModal()
  const { init, notify, close, closeAll } = useToast()
  const { isValid, validate, reset } = useForm('paymentRef')
  const selectedItem = ref<any>({})
  const route = useRoute()
  const form: any = reactive({
    amount: '',
    payment_mode: '',
  })
  const showEdit = ref(false)
  const showPayment = ref(false)
  const client = ref<any>({})

  const submit = async () => {
    if (form.payment_mode.value === 'Ewallet') {
      if (parseFloat(client.value.total_ewallet) < parseFloat(form.amount)) {
        init({ message: 'Insuficient Wallet Balance', color: 'warning' })
        return
      }
    }
    if (parseFloat(form.amount) > submitSub(selectedItem.value)) {
      init({ message: 'Please pay less than or equal to service total cost', color: 'warning' })
      return
    }

    const params = {
      client_id: route.params.id,
      mode: 'batch',
      payments: [
        {
          id: selectedItem.value.id,
          service: selectedItem.value.detail,
          amount: form.amount,
          client_id: route.params.id,
          total_cost: submitSub(selectedItem.value),
        },
      ],
      paymode: form.payment_mode.value,
    }
    const res = await payClientService(params)
    if (res.status === 'Success') {
      init({ message: 'Payment complete', color: 'success' })
      Content.getClientServices(route.params.id, selectedItem.value.tracking)
      reset()
      form.amount = ''
      form.payment_mode = ''
      showPayment.value = false
    } else {
      let errors: any = ''
      Object.keys(res.errors).forEach(function (key, index) {
        errors = res.errors[key]
        init({ message: errors.toString().replace('[ "', '').replace('" ]', ''), color: 'danger' })
      })
    }
  }

  const cancelPayment = () => {
    reset()
    form.amount = ''
    form.payment_mode = ''
    showPayment.value = false
  }

  const getRowBind = (row: any) => {
    if (row.id === selectedItem.value.id) {
      return {
        class: ['custom-class'],
      }
    }
  }

  const resetEditedItem = () => {
    showEdit.value = false
  }

  const per_page = ref(10)

  const payThisItem = (index: any) => {
    selectedItem.value = clientServices.value[index]
    showPayment.value = true
  }

  const editThisItem = (index: any) => {
    selectedItem.value = clientServices.value[index]
    showEdit.value = true
  }

  const payment_options = [
    {
      text: 'Ewallet',
      value: 'Ewallet',
    },
    {
      text: 'Cash',
      value: 'Cash',
    },
  ]

  const Content: any = useContentStore()

  const { clientServices }: any = storeToRefs(Content)
  const currentPage = ref(1)

  const pages = computed(() => {
    return per_page.value && per_page.value !== 0
      ? Math.ceil(clientServices.value.length / per_page.value)
      : clientServices.value.length
  })

  const subTotal = (index: any) => {
    const pa = clientServices.value[index].payment_amount ? parseFloat(clientServices.value[index].payment_amount) : 0
    const da = clientServices.value[index].discount_amount ? parseFloat(clientServices.value[index].discount_amount) : 0
    return parseFloat(clientServices.value[index].charge) - (pa + da)
  }

  const submitSub = (obj: any) => {
    const pa = obj.payment_amount ? parseFloat(obj.payment_amount) : 0
    const da = obj.discount_amount ? parseFloat(obj.discount_amount) : 0
    return parseFloat(obj.charge) - (pa + da)
  }

  const loadProfile = async () => {
    const res = await getClientProfile(route.params.id)
    client.value = res.data.client
  }

  loadProfile()

  const fields = ref([
    {
      key: 'created_at',
      label: 'Date',
    },
    {
      key: 'detail',
      label: 'Details',
    },
    {
      key: 'status',
      label: 'Status',
    },
    {
      key: 'charge',
      label: 'Charge',
    },
    {
      key: 'discount_amount',
      label: 'Discount',
    },
    {
      key: 'payment_amount',
      label: 'Payment',
    },
    {
      key: 'sub_total',
      label: 'Sub Total',
    },
    {
      key: 'tracking',
      label: 'Tracking',
    },
    {
      key: 'actions',
      value: 'Actions',
      tdClass: 'items-center-c',
      thClass: 'items-center-c',
    },
  ])
</script>

<style lang="scss" scoped>
  ::v-deep(.custom-table) {
    --va-data-table-thead-background: linear-gradient(0deg, var(--va-primary), var(--va-info));
    --va-data-table-tfoot-background: linear-gradient(0deg, var(--va-info), var(--va-primary));
    --va-data-table-max-height: 300px;
    --va-data-table-thead-color: var(--va-text-inverted);
    --va-data-table-tfoot-color: var(--va-text-inverted);
  }

  ::v-deep(.items-center-c) {
    --va-data-table-align: end !important;
  }

  ::v-deep(.custom-class) {
    pointer-events: none;
    color: #f16108;
  }
</style>

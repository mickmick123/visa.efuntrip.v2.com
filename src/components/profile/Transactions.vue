<template>
    <div v-if="!isLoading" class="flex flex-wrap gap-5 mt-5">
        <VaCard :bordered="false">
            <VaCardContent>
                <VaForm ref="formRef">
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
                        <VaSelect v-model="form.fundType" :options="fundList"
                            :rules="[(v: any) => v || 'Field is required']" label="Type" />

                        <VaSelect v-model="form.storage" :options="storageList"
                            :rules="[(v: any) => v || 'Field is required']" label="Storage" />

                        <VaSelect v-if="form.storage.value === 'Bank'" v-model="form.bank" :options="bankList"
                            :rules="[(v: any) => v || 'Field is required']" label="Storage" />

                        <VaSelect v-if="form.storage.value === 'Alipay'" v-model="form.bank" :options="alipayList"
                            :rules="[(v: any) => v || 'Field is required']" label="Storage" />

                        <VaInput v-if="form.fundType.value === 'Deposit'" v-model="form.amount" placeholder="0"
                            label="Amount" :rules="[(value: any) => (value && value.length > 0) || 'Amount is required']" />

                        <VaSelect v-if="form.fundType.value === 'Balance Transfer'" v-model="form.transfer_to" :options="transferList"
                            :rules="[(v: any) => v || 'Field is required']" label="Transfer to" />

                        <VaSelect @update:search="(val: any) => getClients(val)" v-if="form.fundType.value === 'Balance Transfer' && form.transfer_to.value === 'Client'" v-model="form.selected_client" :options="clientList"
                            :rules="[(v: any) => v || 'Field is required']" label="Client" placeholder="Search for client id or client name" searchable/>
                         
                        <VaSelect @update:search="(val: any) => getClients(val)"  v-if="form.fundType.value === 'Balance Transfer' && form.transfer_to.value === 'Group'" v-model="form.selected_group" :options="groupList"
                            :rules="[(v: any) => v || 'Field is required']" label="Group" placeholder="Search for group name" searchable/>

                        <VaInput v-if="form.fundType.value !== 'Deposit'" v-model="form.amount" placeholder="0"
                            label="Amount"
                            :rules="[(value: any) => (value && value.length > 0) || 'Amount is required', (v: any) => v <= parseInt(client.total_ewallet) || 'Insuficient Balance']" />

                        <VaInput v-if="form.storage.value === 'Alipay'" v-model="form.reference"
                            placeholder="Reference number" label="Alipay Reference"
                            :rules="[(value: any) => (value && value.length > 0) || 'Reference is required']" />
                    </div>
                    <div class="mt-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 items-end">
                        <VaTextarea v-model="form.remarks" label="Remarks"
                            :rules="[(value: any) => (value && value.length > 0) || 'Remarks is required']" />
                    </div>
                    <div class="mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4 items-end">
                      
                        <VaButton class="col-start-4" :disabled="!isValid" @click="validate() && submit()"> Confirm
                            Transaction </VaButton>
                    </div>
                </VaForm>
            </VaCardContent>
        </VaCard>
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4" v-for="(trans, index) in transactions" :key="index">
            <VaCard :bordered="false">
                <VaCardTitle><div v-html="trans.data.title"></div></VaCardTitle>
                <VaCardContent>
                    <div class="flex justify-center">
                        <span>Current Balance: </span>
                        <VaChip size="small" class="mb-2" color="success">
                            {{ trans.data.balance }}
                        </VaChip>
                    </div>
                    <div class="flex justify-center">
                        <span>Previous Balance: </span>
                        <VaChip size="small" class="mb-2" color="warning">
                            {{ trans.data.prevbalance }}
                        </VaChip>
                    </div>
                    <div class="flex justify-center">
                        <span>Amount: </span>
                        <VaChip size="small" class="mb-2" :color="trans.data.title === 'Deposit' ? 'primary' : 'danger'">
                            {{ trans.data.amount }}
                        </VaChip>
                    </div>

                </VaCardContent>
            </VaCard>
            <VaCard :bordered="false">
                <VaCardTitle>
                    <VaChip icon="access_time" class="mb-2">
                        {{ trans.data.date_time }}
                    </VaChip>
                </VaCardTitle>
                <VaCardContent>

                    <h4>{{ `${trans.data.processor} ${trans.data.head}` }}</h4>
                </VaCardContent>
            </VaCard>
        </div>

    </div>
    <div v-else class="flex justify-center items-center w-full h-[400px]">
        <VaProgressCircle :thickness="0.6" indeterminate />
    </div>
</template>
  
<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { addClientFund, getClientBySearch, getClientProfile, getGroupBySearch, getTransactionHistory } from '../../services/request';
import moment from 'moment';
import { useForm, useToast } from 'vuestic-ui';
const { isValid, validate, reset } = useForm('formRef')
const route = useRoute();
const { init, notify, close, closeAll } = useToast()
const transactions = ref<any>({})
const isLoading = ref(true)
const client = ref<any>({})
const clientList = ref<any>([])
const groupList = ref<any>([])
    
const form: any = reactive({
    storage: '',
    fundType: '',
    amount: '',
    remarks: '',
    bank: '',
    reference: '',
    transfer_to: '',
    selected_group: '',
    selected_client: ''
})
const getClients = async (val: any) => {
    if(form.transfer_to.value === 'Group') {
        const res = await getGroupBySearch(val)
        groupList.value = res.data.map((ob: any) => {
            return {...ob, text: `[${ob.id}] ${ob.name}`, value: ob.id}
        })
       
    }else {
        const res = await getClientBySearch(val)
        clientList.value = res.data.map((ob: any) => {
            return {...ob, text: `[${ob.id}] ${ob.full_name}`, value: ob.id}
        })
    }
}
const submit = async () => {
    const params = {
        "client_id": route.params.id,
        "storage": form.storage.value,
        "type": form.fundType.value,
        "bank": form.bank.value ? form.bank.value: 'aub',
        "amount": form.amount,
        "reason": "",
        "reason2": form.remarks,
        "alipay_reference": form.reference,
        "transfer_to": form.transfer_to.value ? form.transfer_to.value: "Client",
        "selected_client": form.selected_client.value ? form.selected_client.value: '',
        "selected_group": form.selected_group.value ? form.selected_group.value: ''
    }
    const res = await addClientFund(params)
    if(res.status === 'Success') {
        reset()
        loadProfile()
        init({ message: 'Transaction complete', color: 'success' })
    }else {
        let errors: any = ''
        Object.keys(res.errors).forEach(function (key, index) {
          errors = res.errors[key]
          init({ message: errors.toString().replace('[ "', '').replace('" ]', ''), color: 'danger' })
        })
    }
}

const transferList = [
    {
        text: 'Group',
        value: 'Group'
    },
    {
        text: 'Client',
        value: 'Client'
    },
]
const bankList = [
    {
        text: 'AUB',
        value: 'aub'
    },
    {
        text: 'Metro Bank',
        value: 'metrobank'
    },
    {
        text: 'Security Bank',
        value: 'securitybank'
    },
    {
        text: 'China Bank',
        value: 'chinabank'
    },
    {
        text: 'Eastwest',
        value: 'eastwest'
    },
    {
        text: 'PNB',
        value: 'pnb'
    },
]

const alipayList = [
    {
        text: 'AUB',
        value: 'aub'
    }
]


const fundList = [
    {
        text: 'Add Funds to Wallet',
        value: 'Deposit'
    },
    {
        text: 'Withdraw',
        value: 'Refund'
    },
    {
        text: 'Balance Transfer',
        value: 'Balance Transfer'
    },
]
const storageList = [
    {
        text: 'Cash',
        value: 'Cash'
    },
    {
        text: 'Bank',
        value: 'Bank'
    },
    {
        text: 'Alipay',
        value: 'Alipay'
    },
    {
        text: 'Promo',
        value: 'Promo'
    },
]
const loadProfile = async () => {
    isLoading.value = true
    const c = await getClientProfile(route.params.id)
    client.value = c.data.client
    const res = await getTransactionHistory(route.params.id)
    transactions.value = res.data
    isLoading.value = false
    console.log(client.value)
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
</style>
  
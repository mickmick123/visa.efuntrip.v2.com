<template>
  <div class="form-elements grid grid-cols-12 gap-6">
    <va-card class="col-span-12">
      <va-card-title>{{ t('client.personalInfo') }}</va-card-title>
      <va-card-content>
        <form>
          <div class="grid grid-cols-12 gap-6">
            <div class="flex md:col-span-4 sm:col-span-6 col-span-12">
              <va-input
                v-model="first_name"
                :rules="[(v: any) => Boolean(v)]"
                placeholder="Enter your first name"
                label="*First name"
              />
            </div>
            <div class="flex md:col-span-4 sm:col-span-6 col-span-12">
              <va-input v-model="middle_name" placeholder="Enter your middle name" label="Middle name" />
            </div>
            <div class="flex md:col-span-4 sm:col-span-6 col-span-12">
              <va-input
                v-model="last_name"
                :rules="[(v: any) => Boolean(v)]"
                placeholder="Enter your last name"
                label="*Last name"
              />
            </div>
            <div class="flex md:col-span-4 sm:col-span-6 col-span-12">
              <va-date-input
                :rules="[(v: any) => Boolean(v)]"
                :format="formatFn"
                label="*Date of birth"
                placeholder="YYYY-MM-DD"
                @click:day="(d: any) => dtSelected('birth_date', d)"
              />
            </div>
            <div class="flex md:col-span-4 sm:col-span-6 col-span-12">
              <va-select
                v-model="nationalities"
                searchable
                placeholder="Please select"
                label="Nationalities"
                :options="countriesList"
                multiple
              />
            </div>
            <div class="flex md:col-span-4 sm:col-span-6 col-span-12">
              <va-select
                v-model="birth_country"
                searchable
                placeholder="Please select"
                label="Birth country"
                :options="countriesList"
              />
            </div>
            <div class="flex md:col-span-4 sm:col-span-6 col-span-12">
              <va-select v-model="gender" label="Gender" placeholder="Please select" :options="genderList" />
            </div>
            <div class="flex md:col-span-4 sm:col-span-6 col-span-12">
              <va-select
                v-model="civil_status"
                label="Civil Status"
                placeholder="Please select"
                :options="statusList"
              />
            </div>
            <div class="flex md:col-span-4 sm:col-span-6 col-span-12"></div>
            <div class="flex md:col-span-4 sm:col-span-6 col-span-12">
              <va-input v-model="height" placeholder="Enter your height" label="Height" />
            </div>
            <div class="flex md:col-span-4 sm:col-span-6 col-span-12">
              <va-input v-model="weight" placeholder="Enter your weight" label="Weight" />
            </div>
            <div class="flex md:col-span-4 sm:col-span-6 col-span-12"></div>
            <div class="flex md:col-span-4 sm:col-span-6 col-span-12">
              <va-input v-model="passport" placeholder="Enter your passport" label="Passport #" />
            </div>
            <div class="flex md:col-span-4 sm:col-span-6 col-span-12">
              <va-date-input
                :format="formatFn"
                placeholder="YYYY-MM-DD"
                label="Passport Valid Until"
                @click:day="(d: any) => dtSelected('passport_expiration_date', d)"
              />
            </div>
          </div>
        </form>
      </va-card-content>
    </va-card>
    <va-card class="col-span-12">
      <va-card-title>{{ t('client.visaInfo') }}</va-card-title>
      <va-card-content>
        <form>
          <div class="grid grid-cols-4 gap-6">
            <va-select v-model="visaType" label="Visa Type" placeholder="Please select" :options="visaList" clearable />
            <va-date-input
              v-if="visaType === '9A'"
              :format="formatFn"
              label="Arrival date"
              placeholder="YYYY-MM-DD"
              @click:day="(d: any) => dtSelected('arrival_date', d)"
            />
            <va-date-input
              v-if="(visaType === '9A' && !autoSet) || visaType === 'CWV'"
              :format="formatFn"
              label="First Expiration date"
              placeholder="YYYY-MM-DD"
              @click:day="(d: any) => dtSelected('first_expiration_date', d)"
            />
            <va-date-input
              v-if="visaType === '9A' && autoSet"
              v-model="first_expiration_date"
              :format="formatFn"
              label="First Expiration date"
              placeholder="YYYY-MM-DD"
              @click:day="(d: any) => dtSelected('first_expiration_date', d)"
            />
            <va-date-input
              v-if="visaType === '9A'"
              :format="formatFn"
              label="Extended Expiration date"
              placeholder="YYYY-MM-DD"
              @click:day="(d: any) => dtSelected('extended_expiration_date', d)"
            />
            <va-date-input
              v-if="visaType === '9G' || visaType === 'TRV'"
              :format="formatFn"
              label="Visa Expiration Date"
              placeholder="YYYY-MM-DD"
              @click:day="(d: any) => dtSelected('expiration_date', d)"
            />
            <va-date-input
              v-if="visaType === '9G' || visaType === 'TRV'"
              :format="formatFn"
              label="I-Card date issued"
              placeholder="YYYY-MM-DD"
              @click:day="(d: any) => dtSelected('icard_issue_date', d)"
            />
            <va-date-input
              v-if="visaType === '9G' || visaType === 'TRV'"
              :format="formatFn"
              label="I-Card Expiration date"
              placeholder="YYYY-MM-DD"
              @click:day="(d: any) => dtSelected('icard_expiration_date', d)"
            />
          </div>
        </form>
      </va-card-content>
    </va-card>
    <va-card class="col-span-12">
      <va-card-title>{{ t('client.contactInfo') }}</va-card-title>
      <va-card-content>
        <form>
          <div class="grid grid-cols-12 gap-6">
            <div class="flex md:col-span-12 col-span-12">
              <VaTextarea v-model="address" label="Address" placeholder="Enter your address" />
            </div>
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
              <va-input v-model="email" type="email" label="Email" placeholder="Email address"> </va-input>
            </div>
            <div
              v-for="(items, index) in contact_alternate"
              :key="index"
              class="md:col-span-12 sm:col-span-12 col-span-12 grid-cols-12 gap-6 grid"
            >
              <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <VaInput
                  v-model="items.detail"
                  class="mb-6 with-inner-select"
                  :label="
                    items.type === ''
                      ? 'Contact information'
                      : `Contact information (${items.type.toString().toUpperCase()})`
                  "
                  placeholder="Enter contact information"
                >
                  <template #prependInner>
                    <va-select
                      v-model="items.type"
                      class="inner-select"
                      placeholder="Select"
                      :options="contactTypeList"
                    />
                  </template>

                  <template v-if="index === contact_alternate.length - 1 && index !== 0" #append>
                    <VaButton
                      icon="add"
                      color="primary"
                      icon-color="#ffffff"
                      class="ml-3 rounded-sm"
                      @click="() => addContact()"
                    />
                    <VaButton
                      icon="clear"
                      color="danger"
                      icon-color="#ffffff"
                      class="ml-3 rounded-sm"
                      @click="removeFromContact(index)"
                    />
                  </template>
                  <template v-else #append>
                    <VaButton
                      v-if="index === 0 && contact_alternate.length - 1 === 0"
                      icon="add"
                      color="primary"
                      icon-color="#ffffff"
                      class="ml-3 rounded-sm"
                      @click="() => addContact()"
                    />
                    <VaButton
                      v-else
                      icon="clear"
                      color="danger"
                      icon-color="#ffffff"
                      class="ml-3 rounded-sm"
                      @click="removeFromContact(index)"
                    />
                  </template>
                  <!-- <template #append v-else>
                                        <VaButton icon="clear" color="danger" icon-color="#ffffff" class="ml-3 rounded-sm"
                                            @click="(index: any) => removeFromContact(index)" />
                                    </template> -->
                </VaInput>
              </div>
            </div>
          </div>
        </form>
      </va-card-content>
    </va-card>
    <va-card class="col-span-12">
      <va-card-title>{{ t('client.accountInfo') }}</va-card-title>
      <va-card-content>
        <form>
          <div class="grid grid-cols-12 gap-6">
            <div class="flex md:col-span-6 col-span-12">
              <va-select
                v-model="branches"
                multiple
                label="*Branches"
                placeholder="Please select"
                :options="branchList"
              />
            </div>
            <div class="flex md:col-span-6 col-span-12">
              <va-select v-model="groups" multiple label="Group" placeholder="Please select" :options="groupList" />
            </div>
          </div>
        </form>
      </va-card-content>
    </va-card>
    <va-card class="col-span-12">
      <va-card-content>
        <div class="grid grid-cols-6 gap-4">
          <div class="col-end-10 col-span-2">
            <VaButton size="medium" class="rounded-sm" @click="() => saveClient()"> Save Client </VaButton>
          </div>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import CountriesList from '../forms/data/CountriesList'
  import { useI18n } from 'vue-i18n'
  import moment from 'moment'
  import { useContentStore } from '../../../stores/contentStore'
  import { storeToRefs } from 'pinia'
  import { addClient } from '../../../services/request'
  import router from '../../../router'
  import { useToast } from 'vuestic-ui'
  const Content: any = useContentStore()
  Content.getContactTypeList()
  Content.getBranches()
  Content.getGroups()

  const { contactTypeList, branchList, groupList }: any = storeToRefs(Content)
  const { t } = useI18n()
  const { init, notify, close, closeAll } = useToast()

  const countriesList = ref(CountriesList)

  const contact_alternate = ref([
    {
      detail: '',
      type: '',
    },
  ])
  const branches = ref<any>([])
  const groups = ref<any>([])
  const gender = ref('')
  const civil_status = ref('')
  const first_name = ref('')
  const last_name = ref('')
  const middle_name = ref('')
  const nationalities = ref<any>([])
  const birth_country = ref('')
  const birth_date = ref('')
  const address = ref('')
  const email = ref('')
  const height = ref('')
  const weight = ref('')
  const passport = ref('')
  const passport_expiration_date = ref('')
  const extended_expiration_date = ref('')
  const first_expiration_date = ref('')
  const arrival_date = ref('')
  const expiration_date = ref('')
  const icard_expiration_date = ref('')
  const icard_issue_date = ref('')
  const visaType = ref('')

  const autoSet = ref(false)
  const visaList = ref(['9A', '9G', 'TRV', 'CWV'])
  const genderList = ref(['Male', 'Female'])
  const statusList = ref(['Single', 'Married', 'Divorced', 'Widowed', 'Seperated'])

  const dtSelected = (model: any, dt: any) => {
    if (model === 'first_expiration_date') {
      first_expiration_date.value = moment(dt).format('YYYY-MM-DD')
    } else if (model === 'extended_expiration_date') {
      extended_expiration_date.value = moment(dt).format('YYYY-MM-DD')
    } else if (model === 'arrival_date') {
      arrival_date.value = moment(dt).format('YYYY-MM-DD')
    } else if (model === 'expiration_date') {
      expiration_date.value = moment(dt).format('YYYY-MM-DD')
    } else if (model === 'icard_expiration_date') {
      icard_expiration_date.value = moment(dt).format('YYYY-MM-DD')
    } else if (model === 'icard_issue_date') {
      icard_issue_date.value = moment(dt).format('YYYY-MM-DD')
    } else if (model === 'passport_expiration_date') {
      passport_expiration_date.value = moment(dt).format('YYYY-MM-DD')
    } else if (model === 'birth_date') {
      birth_date.value = moment(dt).format('YYYY-MM-DD')
    }
  }
  const addContact = () => {
    contact_alternate.value.push({
      detail: '',
      type: '',
    })
  }

  const removeFromContact = (index: any) => {
    contact_alternate.value.splice(index, 1)
  }

  const formatFn = (dt: any) => {
    try {
      return moment(dt).format('YYYY-MM-DD')
    } catch (error) {
      return ''
    }
  }

  watch(arrival_date, async (newValue) => {
    if (visaType.value === '9A') {
      first_expiration_date.value = moment(String(newValue)).add(59, 'd').format('YYYY-MM-DD')
      autoSet.value = true
    }
  })

  watch(visaType, async (newValue) => {
    autoSet.value = false
  })

  const saveClient = async () => {
    try {
      if (contact_alternate.value.length) {
        contact_alternate.value = contact_alternate.value.map((o: any) => {
          return {
            detail: o.detail,
            type: o.type.value,
          }
        })
      }
    } catch (error) {
      console.log(error)
    }

    try {
      first_expiration_date.value = moment(first_expiration_date.value).format('YYYY-MM-DD')
    } catch (error) {
      console.log(error)
    }

    if (first_name.value.trim() !== '' && last_name.value.trim() !== '' && birth_date.value !== '') {
      let newBranches: any = []
      let newGroups: any = []
      let newNationalities: any = []
      if (branches.value.length) {
        branches.value.map((o: any) => {
          if (o.value) {
            newBranches.push(o.value)
          }
        })
      }
      if (groups.value.length) {
        groups.value.map((o: any) => {
          if (o.value) {
            newGroups.push(o.value)
          }
        })
      }
      if (nationalities.value.length) {
        nationalities.value.map((o: any) => {
          if (o) {
            newNationalities.push(o)
          }
        })
      }
      const res = await addClient(
        contact_alternate.value,
        newBranches,
        newGroups,
        gender.value,
        civil_status.value,
        first_name.value,
        last_name.value,
        middle_name.value,
        newNationalities,
        birth_country.value,
        birth_date.value,
        address.value,
        email.value,
        height.value,
        weight.value,
        passport.value,
        passport_expiration_date.value,
        extended_expiration_date.value,
        first_expiration_date.value,
        arrival_date.value,
        expiration_date.value,
        icard_expiration_date.value,
        icard_issue_date.value,
        [],
        visaType.value,
      )
      if (res.status === 'Success') {
        router.push('/admin/clients/list')
      } else {
        let errors: any = ''
        Object.keys(res.errors).forEach(function (key, index) {
          errors = res.errors[key]
          init({ message: errors.toString().replace('[ "', '').replace('" ]', ''), color: 'danger' })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  fieldset {
    margin-bottom: 0.5rem;
  }
</style>

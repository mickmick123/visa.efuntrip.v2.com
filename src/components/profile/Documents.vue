<template>
  <div v-if="!isLoading" class="flex flex-wrap gap-5 mt-5">
    <VaCard :bordered="false">
      <VaCardTitle>Upload Documents</VaCardTitle>
      <VaCardContent>
        <VaSplit class="split-demo split-demo--image" :limits="[10, 10]">
          <template #start>
            <div class="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
              <div class="col-span-3">
                <VaFileUpload
                  v-model="img"
                  file-types="jpg,png"
                  type="single"
                  undo
                  :undo-duration="1000"
                  undo-button-text="Delete"
                  deleted-file-message="File Deleted"
                />
              </div>
            </div>
          </template>
          <template #end>
            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 items-end p-5">
              <VaSelect
                v-if="img"
                v-model="docValue"
                class="mb-6"
                label="*Document Type"
                :options="documentTypes"
                searchable
                highlight-matched-text
              />
              <va-date-input
                v-if="img"
                class="mb-6"
                :format="formatFn"
                label="*Issued on"
                placeholder="YYYY-MM-DD"
                @click:day="(d: any) => dtSelected('issued_on', d)"
              />
              <va-date-input
                v-if="img"
                class="mb-6"
                :format="formatFn"
                label="Expired on"
                placeholder="YYYY-MM-DD"
                @click:day="(d: any) => dtSelected('expired_on', d)"
              />
              <VaButton v-if="img" @click="saveFile()"> Save </VaButton>
            </div>
          </template>
        </VaSplit>
      </VaCardContent>
    </VaCard>
    <VaCard :bordered="false">
      <VaCardTitle>Documents</VaCardTitle>
      <VaCardContent>
        <div class="flex p-10 w-100% flex-wrap ustify-evenly items-center">
          <VaCard v-for="(doc, index) in documents" :key="index" class="max-w-[25%] min-w-[25%] m-5">
            <VaImage
              :src="`${baseUrl}${doc.file_path}`"
              fallback-src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
              class="h-52"
            />
            <VaCardTitle>{{ doc.name }}</VaCardTitle>
            <VaCardContent>
              <p>
                Date Issued:
                <VaBadge :text="dateFilter(doc.issued_at)" color="success" class="mr-2" />
              </p>
              <p>
                Expiration Date:
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
  import { computed, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { getAllDocumentTypes, getClientDocuments, uploadClientDocument } from '../../services/request'
  // import noImage from '../../assets/images/noimage.png'
  import moment from 'moment'
  import { useToast } from 'vuestic-ui'
  const { init, notify, close, closeAll } = useToast()
  const route = useRoute()
  const baseUrl = `${import.meta.env.VITE_APP_STORAGE}`
  const documents = ref<any>({})
  const documentTypes = ref<any>([])
  const docValue = ref<any>('')
  const isLoading = ref(true)
  const img = ref({})
  const expired_on = ref('')
  const issued_on = ref('')
  const img64 = ref<any>('')
  const formatFn = (dt: any) => {
    try {
      return moment(dt).format('YYYY-MM-DD')
    } catch (error) {
      return ''
    }
  }

  const saveFile = () => {
    const fl: any = img.value
    var reader = new FileReader()
    reader.onloadend = async function () {
      img64.value = reader.result

      if (issued_on.value === '') {
        init({ message: 'Please fill all fields', color: 'warning' })
      } else {
        const params = {
          client_id: route.params.id,
          client_document_type_id: docValue.value.id,
          file_path: `${makeid(30)}.png`,
          issued_at: issued_on.value,
          expired_at: expired_on.value,
          imgBase64: img64.value,
        }
        const res = await uploadClientDocument(params)
        if (res.success) {
          img64.value = ''
          docValue.value = ''
          img.value = ''
          loadProfile()
        }
      }
    }
    reader.readAsDataURL(fl)
  }

  const makeid = (length: any) => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result
  }

  const dtSelected = (model: any, dt: any) => {
    if (model === 'expired_on') {
      expired_on.value = moment(dt).format('YYYY-MM-DD')
    } else {
      issued_on.value = moment(dt).format('YYYY-MM-DD')
    }
  }

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
    const docTypes = await getAllDocumentTypes()
    documentTypes.value = docTypes.data.map((d: any) => {
      return { ...d, text: d.name, value: d.id }
    })
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

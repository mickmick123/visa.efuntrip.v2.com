<template>
  <va-card title="Internal Users" class="mb-8">
    <VaDataTable
      sticky-header
      class="custom-table va-table--striped"
      v-if="internalUsers.constructor === Array"
      :fields="fields"
      :items="internalUsers"
      :columns="fields"
      :per-page="per_page"
      :current-page="currentPage"
    >
      <template #cell(employee)="{ rowIndex }">
        <VaSwitch
          @update:modelValue="updateUserStatus(rowIndex)"
          color="success"
          v-model="internalUsers[rowIndex].employee"
        />
      </template>
      <template #cell(admin)="{ rowIndex }">
        <VaSwitch
          @update:modelValue="updateUserStatus(rowIndex)"
          color="danger"
          v-model="internalUsers[rowIndex].admin"
        />
      </template>
      <template #cell(actions)="{ rowIndex }">
        <VaButton color="warning" size="small" class="mr-6 mb-2" @click="openModalToEditItemById(rowIndex)">
          Change Password
        </VaButton>
      </template>
    </VaDataTable>
    <va-card title="filter" class="bg-white p-5 w-[100%]">
      <VaPagination visible-pages="10" v-model="currentPage" :pages="pages" />
    </va-card>
    <VaModal
      v-model="showModal"
      class="modal-crud"
      title="Change Password"
      size="small"
      @ok="changePassword"
      @cancel="resetEditedItem"
    >
      <va-input v-model="password" class="mb-4" type="password" :label="t('auth.password')" />
      <va-input v-model="confirmPassword" class="mb-4" type="password" :label="t('auth.confirm')" />
    </VaModal>
  </va-card>
</template>

<script setup lang="ts">
  import { computed, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { ref } from 'vue'
  import { useContentStore } from '../../../../../stores/contentStore'
  import { storeToRefs } from 'pinia'
  import {
    addContactType,
    changeUserPassword,
    deleteContactType,
    updateUserRoles,
  } from '../../../../../services/request'
  import { useModal, useToast } from 'vuestic-ui'
  const { confirm } = useModal()
  const { init, notify, close, closeAll } = useToast()

  const { t } = useI18n()
  const per_page = ref(10)

  const editedItemId = ref<any>(null)
  const password = ref<any>(null)
  const confirmPassword = ref<any>(null)
  const showModal = ref<any>(false)
  const Content: any = useContentStore()

  Content.getInternalUsers()

  const { internalUsers }: any = storeToRefs(Content)
  const currentPage = ref(1)

  const openModalToEditItemById = (id: any) => {
    editedItemId.value = internalUsers.value[id].id
    showModal.value = true
  }

  const changePassword = async () => {
    if (confirmPassword.value !== password.value) {
      init({ message: 'Password did not matched!', color: 'danger' })
      showModal.value = true
    } else {
      const res = await changeUserPassword(editedItemId.value, password.value)
      if (res.status === 'Success') {
        init({ message: 'Password has been updated', color: 'info' })
        showModal.value = false
      } else {
        init({ message: 'Something went wrong!', color: 'danger' })
        showModal.value = true
      }
    }
  }

  const resetEditedItem = () => {
    editedItemId.value = null
    showModal.value = false
  }
  const pages = computed(() => {
    return per_page.value && per_page.value !== 0
      ? Math.ceil(internalUsers.value.length / per_page.value)
      : internalUsers.value.length
  })

  const updateUserStatus = async (row: any) => {
    setTimeout(() => {
      const res = updateUserRoles(
        internalUsers.value[row].id,
        internalUsers.value[row].admin,
        internalUsers.value[row].employee,
      )
    }, 500)
  }

  const fields = ref([
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'first_name',
      label: 'First Name',
    },
    {
      key: 'middle_name',
      label: 'Middle Name',
    },
    {
      key: 'last_name',
      label: 'Last Name',
    },
    {
      key: 'employee',
      value: 'Employee',
      tdClass: 'items-center-c',
      thClass: 'items-center-c',
    },
    {
      key: 'admin',
      value: 'Admin',
      tdClass: 'items-center-c',
      thClass: 'items-center-c',
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
    --va-data-table-max-height: 600px;
    --va-data-table-thead-color: var(--va-text-inverted);
    --va-data-table-tfoot-color: var(--va-text-inverted);
  }

  ::v-deep(.items-center-c) {
    --va-data-table-align: end !important;
  }
</style>

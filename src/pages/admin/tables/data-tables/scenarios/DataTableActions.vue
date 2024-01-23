<template>
  <va-card :title="t('tables.labelsActions')">
    <va-data-table :fields="fields" :items="users" :columns="fields" :per-page="10" :current-page="1">
      <template #marker="props">
        <va-icon name="fa fa-circle" :color="props.rowData.color" size="8px" />
      </template>

      <template #actions="props">
        <va-button preset="plain" small color="gray" class="m-0" @click="edit(props.rowData)">
          {{ t('tables.edit') }}
        </va-button>

        <va-button preset="plain" small color="danger" class="m-0" @click="remove(props.rowData)">
          {{ t('tables.delete') }}
        </va-button>
      </template>
    </va-data-table>
  </va-card>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import users from '../data/users.json'
  import { ref } from 'vue'

  const { t } = useI18n()

  const fields = ref([
    {
      key: 'marker',
      width: '30px',
      dataClass: 'text-center',
    },
    {
      key: 'fullName',
      title: t('tables.headings.name'),
    },
    {
      key: 'email',
      title: t('tables.headings.email'),
    },
    {
      key: 'country',
      title: t('tables.headings.country'),
    },
    {
      key: '__slot:actions',
      dataClass: 'va-text-right',
    },
  ])
  const edit = (user: any) => {
    alert('Edit User: ' + JSON.stringify(user))
  }
  const remove = (user: any) => {
    const idx = users.findIndex((u) => u.id === user.id)
    users.splice(idx, 1)
  }
</script>

<style lang="scss"></style>

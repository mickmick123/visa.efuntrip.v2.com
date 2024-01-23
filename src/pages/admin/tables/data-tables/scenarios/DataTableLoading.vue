<template>
  <va-card :title="t('tables.loading')">
    <va-data-table :fields="fields" :data="users" loading />
  </va-card>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import users from '../data/users.json'
  const { t } = useI18n()
  const fields = () => {
    return [
      {
        name: 'fullName',
        title: t('tables.headings.name'),
      },
      {
        name: 'email',
        title: t('tables.headings.email'),
      },
      {
        name: 'country',
        title: t('tables.headings.country'),
      },
    ]
  }
</script>

<style lang="scss"></style>

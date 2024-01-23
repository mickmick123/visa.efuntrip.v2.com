<template>
  <VaNavbar color="#F4F8FA">
    <template #left>
      <VaNavbarItem class="navbar-item-slot max-sm:flex max-sm:flex-row">
        <va-icon-menu-collapsed
          :class="{ 'x-flip': isSidebarMinimized }"
          class="va-navbar__item lg:mr-5"
          :color="colors.primary"
          @click="isSidebarMinimized = !isSidebarMinimized"
        />
        <router-link to="/">
          <vuestic-logo class="logo" />
        </router-link>
      </VaNavbarItem>
    </template>
    <template #right>
      <VaNavbarItem class="navbar-item-slot">
        <app-navbar-actions class="app-navbar__actions" />
      </VaNavbarItem>
    </template>
    <template #center>
      <VaNavbarItem class="navbar-item-slot">
        <!-- Center slot -->
      </VaNavbarItem>
    </template>
  </VaNavbar>
</template>

<script setup>
  import { computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useGlobalStore } from '../../stores/global-store'
  import { useI18n } from 'vue-i18n'
  import { useColors } from 'vuestic-ui'
  import VuesticLogo from '../VuesticLogo.vue'
  import VaIconMenuCollapsed from '../icons/VaIconMenuCollapsed.vue'
  import AppNavbarActions from './components/AppNavbarActions.vue'

  const GlobalStore = useGlobalStore()

  const { t } = useI18n()

  const { isSidebarMinimized } = storeToRefs(GlobalStore)

  const { getColors } = useColors()
  const colors = computed(() => getColors())
</script>

<style lang="scss" scoped>
  .navbar-item-slot {
    padding: 6px 10px;
  }
</style>

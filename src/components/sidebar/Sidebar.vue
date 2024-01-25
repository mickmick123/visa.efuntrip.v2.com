<template>
  <va-sidebar :width="width" :minimized="minimized" :minimized-width="minimizedWidth" :animated="animated">
    <menu-minimized v-if="minimized" :items="items" />
    <menu-accordion v-else :items="items" />
  </va-sidebar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import NavigationRoutes from './NavigationRoutes'
import MenuAccordion from './menu/MenuAccordion.vue'
import MenuMinimized from './menu/MenuMinimized.vue'
import { useUsersStore } from '../../stores/userStore'
import { storeToRefs } from 'pinia'
import { object } from '@amcharts/amcharts5'

const CurrentUser = useUsersStore()
const { user } = storeToRefs(CurrentUser)

const items = ref(NavigationRoutes.routes)

watch(user, async (newValue: any) => {
  if (newValue) {
    try {
      let isAdmin = false
      newValue.roles.map((obj: any) => {
        if (obj.name === 'master') {
          isAdmin = true
        }
      })
      if (!isAdmin) {
        items.value = items.value.filter((r: any) => !r.name || r.name !== 'settings')
      }
    } catch (error) {
      console.log(error)
    }
  }

})

withDefaults(
  defineProps<{
    width?: string
    color?: string
    animated?: boolean
    minimized?: boolean
    minimizedWidth?: string
  }>(),
  {
    width: '16rem',
    color: 'secondary',
    animated: true,
    minimized: true,
    minimizedWidth: undefined,
  },
)
</script>

<style lang="scss">
.va-sidebar {
  &__menu {
    padding: 2rem 0;
  }

  &-item {
    &__icon {
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

<template>
  <div class="pt-6 pb-6 grid grid-cols-4 gap-6">
    <div class="col-span-12 lg:col-span-6 flex flex-wrap">
      <div class="w-full pb-6 grid grid-cols-4 gap-6">
        <va-card v-for="(info, idx) in infoTiles" :key="idx" class="max-sm:col-span-4 mb-8" :color="info.color">
          <va-card-content>
            <h2 class="va-h2 m-0 text-white">
              {{
                info.text === 'total_clients'
                  ? counter.total_clients
                  : info.text === 'total_services'
                  ? counter.total_services
                  : info.text === 'todays_services'
                  ? counter.total_services_today
                  : counter.total_services_yesterday
              }}
            </h2>
            <p class="text-white">{{ t('dashboard.info.' + info.text) }}</p>
          </va-card-content>
        </va-card>
      </div>

      <div class="w-full grid grid-cols-12 gap-6">
        <va-card class="col-span-12 sm:col-span-6">
          <va-card-content class="h-full flex flex-col justify-center">
            <h2 class="va-h2 m-0" :style="{ color: colors.primary }">
              {{ formatPrice(counter.total_services_cost_today) }}
            </h2>
            <p class="no-wrap">{{ t('dashboard.info.todays_cost') }}</p>
          </va-card-content>
        </va-card>
        <va-card class="col-span-12 sm:col-span-6">
          <va-card-content class="h-full flex flex-col justify-center">
            <h2 class="va-h2 m-0" :style="{ color: colors.secondary }">
              {{ formatPrice(counter.total_services_cost_yesterday) }}
            </h2>
            <p class="no-wrap">{{ t('dashboard.info.yesterdays_cost') }}</p>
          </va-card-content>
        </va-card>
        <!-- <va-card class="col-span-12 sm:col-span-6">
          <va-card-content class="grid grid-cols-12 row-separated">
            <div class="col-span-4 p-4 flex flex-col">
              <h2 class="va-h2 m-0 va-text-center" :style="{ color: colors.primary }">3</h2>
              <p class="va-text-center">{{ t('dashboard.info.users') }}</p>
            </div>
            <div class="col-span-4 p-4 flex flex-col">
              <h2 class="va-h2 m-0 va-text-center" :style="{ color: colors.info }">24</h2>
              <p class="va-text-center no-wrap">{{ t('dashboard.info.points') }}</p>
            </div>
            <div class="col-span-4 p-4 flex flex-col">
              <h2 class="va-h2 m-0 va-text-center" :style="{ color: colors.warning }">91</h2>
              <p class="va-text-center">{{ t('dashboard.info.units') }}</p>
            </div>
          </va-card-content>
        </va-card> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { VaCarousel, VaModal, VaCard, VaCardContent, VaCardTitle, VaButton, VaImage, useColors } from 'vuestic-ui'
  import { useContentStore } from '../../../stores/contentStore'
  import { storeToRefs } from 'pinia'

  const { t } = useI18n()
  const { colors } = useColors()
  const Counters: any = useContentStore()
  const { counter }: any = storeToRefs(Counters)

  const formatPrice = (value: any) => {
    let val = (value / 1).toFixed(2)
    return val.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  }

  const infoTiles = ref([
    {
      color: 'success',
      text: 'total_clients',
      icon: '',
    },
    {
      color: 'danger',
      text: 'total_services',
      icon: '',
    },
    {
      color: 'info',
      text: 'todays_services',
      icon: '',
    },
    {
      color: 'warning',
      text: 'yesterdays_services',
      icon: '',
    },
  ])

  const modal = ref(false)
  const currentImageIndex = ref(0)
  const images = ref([
    'https://i.imgur.com/qSykGko.jpg',
    'https://i.imgur.com/jYwT08D.png',
    'https://i.imgur.com/9930myH.jpg',
    'https://i.imgur.com/2JxhWD6.jpg',
    'https://i.imgur.com/MpiOWbM.jpg',
  ])

  function showModal() {
    modal.value = true
  }
</script>

<style lang="scss" scoped>
  .row-separated {
    .flex + .flex {
      border-left: 1px solid var(--va-background-primary);
    }
  }

  .rich-theme-card-text {
    line-height: 1.5;
  }

  .gallery-carousel {
    width: 80vw;
    max-width: 100%;

    @media all and (max-width: 576px) {
      width: 100%;
    }
  }
</style>

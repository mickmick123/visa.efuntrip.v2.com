<template>
  <form @submit.prevent="onsubmit()">
    <va-input
      v-model="firstName"
      class="mb-4"
      type="text"
      :label="t('auth.first_name')"
      :error="!!firstNameErrors.length"
      :error-messages="firstNameErrors"
    />

    <va-input v-model="middleName" class="mb-4" type="text" :label="t('auth.middle_name')" />

    <va-input
      v-model="lastName"
      class="mb-4"
      type="text"
      :label="t('auth.last_name')"
      :error="!!lastNameErrors.length"
      :error-messages="lastNameErrors"
    />

    <va-input
      v-model="email"
      class="mb-4"
      type="email"
      :label="t('auth.email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      v-model="password"
      class="mb-4"
      type="password"
      :label="t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <va-input
      v-model="confirmPassword"
      class="mb-4"
      type="password"
      :label="t('auth.confirm')"
      :error="!!confirmErrors.length"
      :error-messages="confirmErrors"
    />

    <!-- <div class="auth-layout__options flex items-center justify-between">
      <va-checkbox
        v-model="agreedToTerms"
        class="mb-0"
        :error="!!agreedToTermsErrors.length"
        :error-messages="agreedToTermsErrors"
      >
        <template #label>
          <span class="ml-2">
            {{ t('auth.agree') }}
            <span class="va-link">{{ t('auth.termsOfUse') }}</span>
          </span>
        </template>
      </va-checkbox>
      <router-link class="ml-1 va-link" :to="{ name: 'recover-password' }">
        {{ t('auth.recover_password') }}
      </router-link>
    </div> -->

    <div class="flex justify-center mt-4">
      <va-button class="my-0" @click="onsubmit">{{ t('auth.sign_up') }}</va-button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { useModal, useToast } from 'vuestic-ui'
  import { addUser } from '../../../services/request'
  import router from '../../../router'
  const { t } = useI18n()
  const { confirm } = useModal()
  const { init, notify, close, closeAll } = useToast()
  const confirmPassword = ref('')
  const email = ref('')
  const password = ref('')
  const firstName = ref('')
  const lastName = ref('')
  const middleName = ref('')
  const agreedToTerms = ref(false)
  const confirmErrors = ref<string[]>([])
  const emailErrors = ref<string[]>([])
  const passwordErrors = ref<string[]>([])
  const firstNameErrors = ref<string[]>([])
  const lastNameErrors = ref<string[]>([])
  const agreedToTermsErrors = ref<string[]>([])

  const formReady = computed(() => {
    return !(
      confirmErrors.value.length ||
      lastNameErrors.value.length ||
      firstNameErrors.value.length ||
      emailErrors.value.length ||
      passwordErrors.value.length ||
      agreedToTermsErrors.value.length
    )
  })

  async function onsubmit() {
    // if (!formReady.value) return

    emailErrors.value = email.value ? [] : ['Email is required']
    passwordErrors.value = password.value ? [] : ['Password is required']
    agreedToTermsErrors.value = agreedToTerms.value ? [] : ['You must agree to the terms of use to continue']
    firstNameErrors.value = firstName.value ? [] : ['First name is required']
    lastNameErrors.value = lastName.value ? [] : ['Last name is required']
    confirmErrors.value = confirmPassword.value ? [] : ['confirm password is required']
    if (confirmPassword.value.toString().trim() !== password.value.toString().trim()) {
      init({ message: 'Password did not matched', color: 'danger' })
    } else {
      const res: any = await addUser(firstName.value, middleName.value, lastName.value, email.value, password.value)
      if (res.status === 'Success') {
        confirm('You have successfully registered, please wait for admin approval.').then(async (ok: any) => {
          if (ok) {
            router.push('/auth/login')
          }
        })
      } else {
        let errors: any = ''
        Object.keys(res.errors).forEach(function (key, index) {
          errors = res.errors[key]
          init({ message: errors.toString().replace('[ "', '').replace('" ]', ''), color: 'danger' })
        })
      }
    }
    // useRouter().push({ name: 'dashboard' })
  }
</script>

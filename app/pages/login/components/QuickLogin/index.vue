<script setup lang="ts">
import useCountdown from './useCountdown'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const phone = ref('')
const code = ref('')
const countdown = useCountdown(60)
const isCounting = computed(() => countdown.isCounting.value)

async function handleSubmit() {
  if (!phone.value || !code.value) {
    message.error('请输入手机号和验证码')
    return
  }

  loading.value = true
  try {
    await userStore.quickLogin({
      phone: phone.value,
      code: code.value,
    })
    message.success('登录成功')
    await userStore.getUserInfo()
    router.push('/')
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

async function getCode() {
  if (!phone.value) {
    message.error('请输入手机号')
    return
  }

  try {
    await userStore.getCaptcha(phone.value)
    message.success('验证码已发送')
    countdown.start()
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="mx-auto max-w-sm w-full">
    <h2 class="mb-8 text-center text-2xl font-bold">
      快速登录
    </h2>

    <div class="space-y-6">
      <div class="mb-1 flex items-center gap-1">
        <Input v-model="phone" type="text" placeholder="请输入手机号" />
      </div>

      <div class="mb-1 flex items-center gap-1">
        <Input v-model="code" class="flex-1" type="text" placeholder="请输入验证码" />
        <button class="h-[42px] w-25 text-nowrap text-[12px] btn" :disabled="!!isCounting" @click="getCode">
          {{ isCounting ? `${countdown.current.value}s` : '获取验证码' }}
        </button>
      </div>

      <button
        class="block w-full bg-primary py-3 text-white btn-plain !hover:bg-primary/80"
        :loading="loading"
        @click.stop="handleSubmit"
      >
        登录
      </button>
      <div class="text-center">
        <a
          class="cursor-pointer text-sm text-blue-600 hover:text-blue-500"
          @click="router.push('/register')"
        >
          没有账号？去注册
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

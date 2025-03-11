<script setup>
import BasicLogin from './components/BasicLogin.vue'
// import QuickLogin from './components/QuickLogin/index.vue'

definePageMeta({
  layout: 'blank',
})

const router = useRouter()
const route = useRoute()

const userStore = useUserStore()

async function handleSubmitSuccess() {
  await userStore.getUserInfo()
  const redirect = ['404', '/403'].includes(route.query.redirect) ? '' : route.query.redirect
  router.push(redirect || '/')
}
</script>

<template>
  <!-- 主要内容区 -->
  <div class="relative h-[100vh] w-[100vw] flex justify-center p-5 md:items-center md:bg-[#eee]">
    <div class="w-100 rounded-[10px] bg-white md:p-10 md:shadow">
      <!-- <QuickLogin @success="handleSubmitSuccess" /> -->
      <BasicLogin @success="handleSubmitSuccess" />
    </div>
  </div>
</template>

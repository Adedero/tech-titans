<script setup>
import { RouterView, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()

/* let isOpen = ref(false)

let adminPassword = ref('')

function goToAdmin() {
  if (adminPassword.value !== 'titans') {
    adminPassword.value = ''
    isOpen.value = false
    localStorage.removeItem('isAuthenticated')
    return
  }
  
  adminPassword.value = ''
  isOpen.value = false
  localStorage.setItem('isAuthenticated', true)
  router.push('/admin')
}

onMounted(() => {
  localStorage.removeItem('isAuthenticated')
}) */

//@dblclick="isOpen = true"
</script>

<template>
  <header 
    class="flex items-center justify-between gap-2 px-5 text-white cursor-context-menu select-none">
    <div class="flex items-center gap-2">
      <img src="./assets/images/logo.png" alt="logo" class="w-6">
      <h1 @click="router.push('/')" class="text-2xl">Tech<span class="font-bold">Titans</span></h1>
    </div>
    
    <RouterLink to="/admin"
      class="bg-white font-medium text-green-800 rounded p-2 hover:bg-green-100 transition-colors grid place-content-center">
      Admin Panel
    </RouterLink>
  </header>

  <!-- <Transition name="fade">
    <form @submit.prevent="goToAdmin" v-if="isOpen"
      class="w-72 h-60 bg-white absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md rounded p-4">
      <h1 class="text-center text-2xl text-green-800 font-semibold uppercase">Admin access</h1>

      <div class="w-full mt-5 flex flex-col gap-3">
        <label>Admin Password:</label>
        <input v-model="adminPassword" type="password" placeholder="Enter password"
          class="border-2 rounded-md p-2 h-10">
      </div>

      <button @submit.prevent="goToAdmin" :disabled="adminPassword == ''"
        class="w-full mt-5 bg-green-800 hover:bg-green-900 transition-colors rounded text-white font-semibold uppercase p-2 h-10 disabled:bg-gray-500 disabled:text-gray-200 disabled:cursor-not-allowed">
        Login
      </button>

    </form>
  </Transition>

  <Transition name="fade">
    <div v-if="isOpen" @click="isOpen = false"
      class="overlay z-10 w-[100dvw] h-[100dvh] top-0 bg-black bg-opacity-40 fixed overflow-hidden"></div>
  </Transition> -->


  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  height: 4rem;
  background-image: url(./assets/images/header-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

main {
  min-height: calc(100dvh - 4rem);
  height: calc(100dvh - 4rem);
  overflow: hidden;
}
</style>

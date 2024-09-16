import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || {})

  function setUser(data) {
    localStorage.setItem('user', JSON.stringify(data))
    user.value = data
  }

  return { user, setUser }
})

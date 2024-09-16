<script setup>
import { ref, onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';
import useFileUpload from '@/composables/useFileUpload'

const { deleteFile } = useFileUpload();

var users = ref([]);

let studentToSearch = ref('');


async function getAllUsers() {
    try {
        const res = await fetch('https://tech-titans-6i23.onrender.com/api');
        const data = await res.json();
        users.value = data;

        // Sort the users array alphabetically by fullNames
        users.value.sort((a, b) => a.fullName.localeCompare(b.fullName));

        return data;
    } catch (error) {
        console.error(error);
    }
}

async function deleteUser(user) {
    try {
        user.isLoading = true;

        await deleteFile(user.imageURL)

        const res = await fetch('https://tech-titans-6i23.onrender.com/api/delete-user/' + user._id, {
            method: 'DELETE',
        });
        const data = await res.json();

        getAllUsers();
        return data;
    } catch (error) {
        console.error(error);
    } finally {
        user.isLoading = false;
    }
}


onMounted(() => {
    getAllUsers();
});

// Create a computed property for filteredUsers based on the search query
const filteredUsers = computed(() => {
    if (!studentToSearch.value) {
        return users.value;
    }

    const query = studentToSearch.value.toLowerCase();
    return users.value.filter(user => user.fullName.toLowerCase().includes(query));
});
</script>

<template>
    <section class="bg-gray-200 h-[inherit] min-h-[inherit] w-full p-5 md:w-[30rem] md:mx-auto overflow-hidden">
        <header class="bg-white p-2 rounded-md border border-gray-300 shadow-sm">
            <p class="font-semibold text-xs text-right text-[var(--dark-green)]">ADMINISTRATOR</p>

            <div class="">
                <p class="font-semibold">Number of Students</p>
                <p class="text-2xl font-semibold text-green-800">{{ users.length }}</p>
            </div>

            <div class="w-full h-9 flex mt-3 gap-2 relative">
                <span class="material-symbols-rounded absolute select-none text-2xl top-[0.1rem] left-1 text-gray-600">search</span>
                <input v-model="studentToSearch" type="search" class="searchInput" placeholder="Search...">
            </div>
        </header>

        <ul class="w-full py-5">
            <li
            v-for="user, index in filteredUsers"
            :key="user._id"
            class="classList relative">

                <RouterLink
                :to="{name: 'generate-profile', params: { id: user._id }}"
                class="w-full flex items-center">
                    <span class="font-semibold">
                        <span>{{ index + 1 }}</span>&rpar; </span>
                    <span
                    class="ml-1 font-semibold text-green-900 text-base w-[80%] text-ellipsis overflow-hidden whitespace-nowrap"
                    :title="user.fullName">{{ user.fullName }}</span>
                </RouterLink>

                <button v-if="!user.isLoading" class="absolute right-1">
                    <span v-if="!user.isDeleting" @click="user.isDeleting = true" class="material-symbols-rounded text-2xl text-red-600">delete</span>

                    <span v-else class="flex items-center gap-2">                
                        <span @click="deleteUser(user)" class="material-symbols-rounded text-2xl font-bold text-green-800">check</span>

                        <span @click="user.isDeleting = false" class="material-symbols-rounded text-2xl text-red-600">cancel</span>
                    </span>
                </button>

                <button v-else>
                    <span class="loader"></span>
                </button>
            </li>
        </ul>
    </section>
</template>

<style scoped>
.searchInput {
    @apply w-full outline-none border border-gray-400 rounded pl-8
}

.classList {
    @apply  odd:bg-gray-300  even:bg-white min-h-10 border border-gray-500 rounded py-2 px-2 w-full overflow-hidden flex items-center gap-2
}

ul {
    height: calc(100dvh - 15rem);
    display: grid;
    gap: 0.5rem;
    align-content: start;
    overflow-y: scroll;
}

.loader {
  width: 20px;
  height: 20px;
  border: 3px solid var(--dark-green);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
} 
</style>

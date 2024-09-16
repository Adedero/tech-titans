<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
let userStore = useUserStore()

const $router = useRouter()

function editResponse() {
    $router.push('/edit-response')
}
</script>

<template>
    <div class="h-[inherit] min-h-[inherit] bg-gray-200">
        <section class="h-[inherit] min-h-[inherit] p-5 w-full md:w-[32rem] md:mx-auto relative">
            <div class="card relative shadow-md">
                <div class="h-2 rounded-t-md w-full bg-[var(--dark-green)] absolute top-0 left-0"></div>

                <h1 h1 class="text-2xl font-semibold">Thanks, 
                    {{ userStore.user.fullName.split(' ')[0] }}!
                </h1>

                <p class="mt-3">Your response has been received.</p>

                <button
                @click="editResponse"
                class="mt-5 bg-[var(--dark-green)] text-white rounded p-2 w-32 hover:bg-green-800 transition-colors disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-200">Edit Response</button>
            </div>
        </section>
    </div>
    
</template>
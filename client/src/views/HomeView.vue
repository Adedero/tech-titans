<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.store'
import useFileUpload from '@/composables/useFileUpload'

const { uploadFile } = useFileUpload();

const $router = useRouter()

let userStore = useUserStore()

let fileInput = ref(null)


let fileUploadError = ref(false)

let imageFile = ref(null)

let user = reactive({
  imageURL: '',
  fullName: '',
  regNumber: '',
  nickname: '',
  birthday: '',
  hobbies: '',
  relStatus: '',
  faveQuote: '',
  faveCourse: '',
  faveLecturer: '',
  mostStressfulLevel: '',
  classCrush: '',
  whatNext: ''
})

let error = reactive({
  fullName: false,
  faveQuote: false,
  whatNext: false,
  hobby: false,
})

const fullName = ref(null)

const submitBtn = ref(null)

let quoteWordCount = ref(50)

let whatNextWordCount = ref(50)

let hobbyWordCount = ref(30)

let loading = ref(false)

let whatNextText = ref('');

const handleFileChange = () => {
  var maxSizeInBytes = 2 * 1024 * 1024; // 2MB
  if (fileInput.value.files[0].size > maxSizeInBytes) {
    imageFile.value = null;
    fileUploadError.value = true;
    return
  } else {
    fileUploadError.value = false;
    imageFile.value = fileInput.value.files[0];
    return
  }
}

async function submitForm() {
  try {
    loading.value = true
    submitBtn.value.disabled = true

    const url = await uploadFile(fileInput.value.files[0])
    if (!url) {
      alert('Error uploading file. Please try again')
      console.log('Error uploading file')
      return
    }

    user.imageURL = url

    const res = await fetch('https://tech-titans-6i23.onrender.com/api/add-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const data = await res.json()

    userStore.setUser(data)

    $router.push('/completed')

  } catch (error) {
    alert('An error occured. Please try again.')
    console.error(error)
  } finally {
    loading.value = false
    submitBtn.value.disabled = false
  }
}

function validateFields() {
  user.fullName = user.fullName.trim()
  if (user.fullName.split(' ').length < 2 || user.fullName.split(' ').length > 3) {
    error.fullName = true
    fullName.value.focus()
    return
  }
  error.fullName = false

  submitForm()
}

function validateQuote() {
  quoteWordCount.value = 50 - user.faveQuote.split('').length

  if (user.faveQuote.split('').length > 35) { error.faveQuote = true }
  else { error.faveQuote = false }

  if (user.faveQuote.split('').length > 49) {
    user.faveQuote = user.faveQuote.slice(0, -1)
  }
}

function validateWhatNext() {
  whatNextWordCount.value = 50 - user.whatNext.split('').length

  if (user.whatNext.split('').length > 35) { error.whatNext = true }
  else { error.whatNext = false }

  if (user.whatNext.split('').length > 49) {
    user.whatNext = user.whatNext.slice(0, -1)
  }

  if (user.whatNext.toLowerCase().includes('bomb')) {
    whatNextText.value = '💣💣'
  } else whatNextText.value=''
  
  if (user.whatNext.toLowerCase().includes('bombing')) {
    whatNextText.value = '💣💣💣 Oshey Osama Bin Laden! 🔥🔥🔥'
  }
}

function validateHobby() {
  hobbyWordCount.value = 30 - user.hobbies.split('').length

  if (user.hobbies.split('').length > 25) {
    error.hobby = true
  } else {
    error.hobby = false
  }

  if (user.hobbies.split('').length > 29) {
    user.hobbies = user.hobbies.slice(0, -1)
  }
}

</script>

<template>
  <div class="bg-gray-200 h-[inherit] min-h-[inherit]">

    <section class="h-[inherit] min-h-[inherit] overflow-y-scroll p-5 w-full md:w-[32rem] md:mx-auto relative">

      <div class="card relative">
        <div class="h-2 rounded-t-md w-full bg-[var(--dark-green)] absolute top-0 left-0"></div>
        <h1 class="text-2xl font-semibold">Face of the Finalists</h1>
        <p class="mt-3">This form has been created to collect important details of the CSC Tech Titans finalists which
          will be used to generate custom posters showing the profile of each student during the final year week. <br><br>
          <span class="text-red-500">* Required.</span>
        </p>
      </div>

      <!-- Form -->
      <div class="mt-3 grid gap-3">
        <div class="card form--card">
          <label>Full Name <span>*</span></label>
          <span v-if=error.fullName class="text-xs text-red-500">For the best result please fill in a surname, an optional
            middle name and a first name. Your middle name will be shortened to an initial.</span>
          <input ref="fullName" v-model="user.fullName" type="text" placeholder="Surname (middlename) firstname" required>
        </div>

        <div class="card form--card">
          <label>Registration Number <span>*</span></label>
          <input v-model="user.regNumber" type="text" placeholder="Your answer" required>
        </div>

        <div class="card form--card">
          <label>Nickname</label>
          <input v-model="user.nickname" type="text" placeholder="Your answer">
        </div>

        <div class="card form--card">
          <label>Birthday</label>
          <input v-model="user.birthday" type="text" placeholder="Your answer">
        </div>

        <div class="card form--card">
          <label>Hobbies</label>
          <span class="text-xs">max word count: <span class="font-semibold">{{ hobbyWordCount }}</span></span>
          <span v-if="error.hobby" class="text-xs text-red-500">Your hobbies don too plenty. Try rest!</span>
          <input v-model="user.hobbies" @input="validateHobby" type="text" placeholder="Your answer">
        </div>

        <div class="card form--card">
          <label>Relationship Status</label>
          <input v-model="user.relStatus" type="text" placeholder="Your answer">
        </div>

        <div class="card form--card">
          <label>Favourite Quote</label>
          <span class="text-xs">max word count: <span class="font-semibold">{{ quoteWordCount }}</span></span>
          <span v-if="error.faveQuote" class="text-xs text-red-500">You too dey talk plenty!</span>
          <textarea v-model="user.faveQuote" @input="validateQuote" rows="2" placeholder="Your answer"
            class="resize-none"></textarea>
        </div>

        <div class="card form--card">
          <label>Favourite Course</label>
          <input v-model="user.faveCourse" type="text" placeholder="Your answer">
        </div>

        <div class="card form--card">
          <label>Favourite Lecturer</label>
          <input v-model="user.faveLecturer" type="text" placeholder="Your answer">
        </div>

        <div class="card form--card">
          <label>Most Stressful Level</label>
          <input v-model="user.mostStressfulLevel" type="text" placeholder="Your answer">
        </div>

        <div class="card form--card">
          <label>Class Crush</label>
          <input v-model="user.classCrush" type="text" placeholder="Your answer">
        </div>

        <div class="card form--card">
          <label>After School, What Next?</label>
          <span class="text-xs">max word count: <span class="font-semibold">{{ whatNextWordCount }}</span></span>
          <span v-if="error.whatNext" class="text-xs text-red-500">E never do? 🙄</span>

          <span>{{ whatNextText }}</span>
          <textarea v-model="user.whatNext" @input="validateWhatNext" rows="2" placeholder="Your answer"
            class="resize-none"></textarea>
        </div>

        <div class="card form--card">
          <label>Upload Image <span>*</span></label>
          <span v-if="fileUploadError" class="text-red-500">File size exceeds 2MB</span>
          <input required type="file" ref="fileInput" accept=".png, .jpg, .jpeg" @change="handleFileChange">
        </div>

        <div>
          <button ref="submitBtn" @click.prevent="validateFields"
            :disabled="user.fullName == '' || user.regNum == '' || imageFile == null"
            class="bg-[var(--dark-green)] text-white rounded p-2 w-20 hover:bg-green-800 transition-colors disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-200 grid place-content-center">
            <span v-if="!loading">Submit</span>
            <span v-else class="loader"></span>
          </button>
        </div>

        <div>
          <p class="text-xs">By submitting this form, you agree for the data provided to be used and reproduced freely by
            the Tech Titans.</p>
        </div>
      </div>

      <footer class="h-10 mt-20 text-center flex flex-col justify-end text-xs">
        <p class="font-bold text-[var(--dark-green)]">
          <span>&copy; TechTitans Set '23</span>
        </p>
        <p class="text-[0.6rem]">
          Created by <span class="font-bold">Adedero Cosmos</span>
        </p>
      </footer>
    </section>
  </div>
</template>

<style>
.card {
  @apply bg-white w-full p-5 rounded-md border border-gray-300
}

.form--card {
  @apply flex flex-col gap-4
}

input, textarea {
  @apply outline-none rounded-b-sm border-b-2 focus:border-b-2 focus:border-b-[var(--dark-green)] transition-all
}

label {
  @apply font-semibold
}

label>span {
  @apply text-red-500 font-normal
}

.loader {
  width: 20px;
  height: 20px;
  border: 3px solid #FFF;
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

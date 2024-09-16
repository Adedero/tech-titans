<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';

let user = ref({})

const $route = useRoute()

let imageIsReady = ref(false)

let loading = ref(false)

function getSingleUser(id) {
    fetch(`https://tech-titans-6i23.onrender.com/api/${$route.params.id}`, {})
     .then((res) => res.json())
     .then((data) => {
            user.value = data
            imageIsReady.value = true
        })
     .catch((error) => {
        imageIsReady.value = false
        console.error(error)
     })
}


onMounted(() => getSingleUser())

watchEffect(() => getSingleUser())

let names = computed(() => {
    if (!user.value.fullName) return

    let initialArray = user.value.fullName.trim().split(' ')

    if (initialArray.length > 3) initialArray.pop()

    let nameArray = initialArray

    if (nameArray.length == 3) {
        return {
            surname: nameArray[0],
            middleName: nameArray[1],
            middleInitial: nameArray[1].split('')[0],
            firstName: nameArray[2].split('').length <= 9? nameArray[2]: `${nameArray[2].split('')[0]}.`,
        }
    } else if (nameArray.length == 2) {
        return {
            surname: nameArray[0],
            firstName: nameArray[1],
        }
    }
})

/* function downloadProfileImage() {

    if(!imageIsReady.value) return

    html2canvas(document.querySelector('#profile'), {
        useCORS: true
    }).then((canvas) => {
        const dataURL = canvas.toDataURL('image/png'); // Change format as needed
        FileSaver.saveAs(dataURL, 'profile_image.png'); // Change filename
    });
}
 */
function downloadProfileImage() {
    if (!imageIsReady.value) return
    loading.value = true
    const domNode = document.querySelector('#profile')
    let scale = 4
    domtoimage.toJpeg(domNode, {
        quality: 0.99,
        width: domNode.clientWidth * scale,
        height: domNode.clientHeight * scale,
        style: {
            transform: 'scale('+scale+')',
            transformOrigin: 'top left'
        }
    })
    .then((dataURL) => FileSaver.saveAs(dataURL, user.value?.fullName?.toLowerCase().split(' ').join('_')) ?? 'profile_image.jpeg')
    .catch((err) => {
        alert(err)
        console.error(err)
    })
    .finally(() => loading.value = false)
}

</script>

<template>
    <div class="box p-2 pb-10 overflow-y-scroll md:flex md:justify-center md:gap-5">
        <div
        id="profile" ref="profiile" class="select-none">

            <div class="absolute w-[58%] h-[70%] right-10 top-[4%]  bg-transparent">
                <div class="w-full h-full relative">

                    <img
                    class="absolute -right-[5%] top-[2.5%] h-[90%] w-[100%]"
                    src="../assets/images/polygon-2.png">
                    
                    <div class="absolute z-10 w-[165%] -left-[17%] top-[29%]">
                        <div class="surname-div absolute top-[21.5%] left-[23%]">
                            <h1 class="surname uppercase font-semibold text-white text-lg md:text-2xl">{{ names?.surname ?? '' }}</h1>
                            <p
                            class="other-names text-white uppercase text-lg md:text-2xl font-light -mt-1 flex items-center gap-1">
                                <span>{{ names?.firstName ?? '' }} </span>
                                <span
                                v-if="names?.middleName"
                                > {{ names?.middleInitial ?? '' }}.</span>
                            </p>
                        </div>
                        <img
                        class=""
                        src="../assets/images/polygon-1.svg">
                    </div>
                    

                    <div class="user-image-div absolute top-[9.7%] h-[75%] w-[62%] right-2 rounded-tl-[6rem] md:rounded-tl-[7rem] rounded-br-[6rem] bottom-14 overflow-hidden">
                        <img
                        class="h-full w-full object-cover"
                        :src="user.imageURL">
                    </div>
                </div>
            </div>

            <div class="absolute w-[90%] h-[27%] bottom-[8%] left-[6%]">

                <div class="h-full w-full relative flex gap-6">
                    <div class="w-[40%] details">

                        <p class="font-semibold text-green-900 text-[62%] md:text-xs mt-1">Nickname: <span class="text-black font-light">{{ user.nickname }}</span></p>

                        <p class="font-semibold text-green-900 text-[62%] md:text-xs mt-1">Birthday: <span class="text-black font-light">{{ user.birthday }}</span></p>

                        <p class="font-semibold text-green-900 text-[62%] md:text-xs mt-1">Hobbies: <span class="text-black font-light">{{ user.hobbies }}</span></p>

                        <p class="font-semibold text-green-900 text-[62%] md:text-xs mt-1">Relationship Status: <span class="text-black font-light">{{ user.relStatus }}</span></p>

                        <p class="font-semibold text-green-900 text-[62%] md:text-xs mt-1">Favourite Quote: <span class="text-black font-light">{{ user.faveQuote }}</span></p>
                        
                        <p class="font-semibold text-green-900 text-[62%] md:text-xs mt-1">Favourite Course: <span class="text-black font-light">{{ user.faveCourse }}</span></p>

                    </div>

                    <div class="w-[40%] details">
                        
                        <p class="font-semibold text-green-900 text-[62%] md:text-xs mt-6 md:mt-7">Favourite Lecturer: <span class="text-black font-light">{{ user.faveLecturer }}</span></p>

                        <p class="font-semibold text-green-900 text-[62%] md:text-xs mt-1">Most Stressful Level: <span class="text-black font-light">{{ user.mostStressfulLevel }}</span></p>

                        <p class="font-semibold text-green-900 text-[62%] md:text-xs mt-1">Class Crush: <span class="text-black font-light">{{ user.classCrush }}</span></p>

                        <p class="font-semibold text-green-900 text-[62%] md:text-xs mt-1">After School, What Next? <span class="text-black font-light">{{ user.whatNext }}</span></p>
                    </div>
                </div>
            </div>

            <img
            class=""
            src="../assets/images/background.svg"
            alt="profile">

        </div>

        <div class="mt-10 md:mt-0 h-10 flex items-center justify-center md:justify-start">
           <button
           @click="downloadProfileImage"
           class="bg-green-500 hover:bg-green-600 transition-colors w-36 p-2 text-white font-semibold rounded grid place-content-center disabled:bg-gray-400 disabled:cursor-not-allowed"
           :disabled="loading">
                <span v-if="!loading">Download</span>
                <span v-else class="loader"></span>
            </button>
        </div>
    </div>
    
</template>

<style scoped>
.box {
    height: calc(100dvh - 4rem);
}

#profile {
    height: fit-content;
    overflow: hidden;
    position: relative;
    max-width: 600px;
}

.loader {
  width: 20px;
  height: 20px;
  border: 4px solid #FFF;
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

@media (min-width: 270px) {
    .user-image-div {
        border-top-left-radius: 3.5rem;
        border-bottom-right-radius: 3.2rem;
        right: 3%
    }

    .surname, .other-names {
        font-size: 0.8rem;
        line-height: 1.5rem;
    }

    .surname-div {
        top: 19%
    }

    .details {
        font-size: 0.5rem;
    }
}

@media (min-width: 310px) {
    .details {
        font-size: 0.6rem;
    }
}

@media (min-width: 390px) {
    .user-image-div {
        border-top-left-radius: 4rem;
        border-bottom-right-radius: 4rem;
        right: 3%
    }

    .surname, .other-names {
        font-size: 1rem;
        line-height: 1.6rem;
    }

    .surname-div {
        top: 20.2%
    }

    .details {
        font-size: 0.7rem;
    }
}


@media (min-width: 410px) {
    .details {
        font-size: 0.8rem;
    }

    .user-image-div {
        border-top-left-radius: 5rem;
        border-bottom-right-radius: 4rem;
        right: 3%
    }
}

@media (min-width: 490px) {
    .user-image-div {
        border-top-left-radius: 6rem;
        border-bottom-right-radius: 5rem;
        right: 2.5%
    }

    .surname, .other-names {
        font-size: 1.2rem;
        line-height: 1.8rem;
    }

    .surname-div {
        top: 20.5%
    }

    .details {
        font-size: 0.8rem;
    }
}

@media (min-width: 550px) {
    .user-image-div {
        border-top-left-radius: 7.5rem;
        border-bottom-right-radius: 6rem;
    }

    .surname, .other-names {
        font-size: 1.3rem;
    }

    .surname-div {
        top: 21.2%
    }

    .details {
        font-size: 1rem;
        line-height: 1.2rem;
    }

}



</style>
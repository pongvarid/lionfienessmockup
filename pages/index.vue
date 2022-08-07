<template>
<div class="relative    bg-white shadow-md  bg-cover text-gray-800  overflow-hidden cursor-pointer object-cover object-center  h-screen w-full" style="background-position: center; background-image:url('https://sv1.picz.in.th/images/2022/08/07/XlRf2t.png')">
    <div class="absolute bg-gradient-to-b from-black/90 via-black-500/90 to-black/90   opacity-50 inset-0 z-0">

    </div>
    <div class="flex flex-col w-full h-full justify-center" >
        <img src="@/assets/images/logoz.png" alt="">
        <div class="p-4 w-full">
            <v-btn @click="$router.push('/home')" x-large block rounded color="white">
                <span class="font-semibold">Let's start</span>
            </v-btn>
        </div>
    </div>
</div>
</template>

<script>
export default {
    layout: "root",

};
</script>

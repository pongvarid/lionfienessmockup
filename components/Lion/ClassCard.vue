<template>
<div class="relative flex flex-col justify-between   bg-white shadow-md rounded-3xl  bg-cover text-gray-800  overflow-hidden cursor-pointer w-32 object-cover object-center rounded-lg shadow-md h-40 m-2" style="background-position: center; background-image:url('https://sv1.picz.in.th/images/2022/08/06/XE20Yl.png')">
    <div v-if="active" class="absolute bg-gradient-to-t from-green-400 to-blue-400  opacity-50 inset-0 z-0">
    </div>
    <div @click="$router.push('/class/1/')" class="relative flex flex-row items-end  h-72 w-full ">
        <div class="absolute flex  w-full top-0">
            <h2 class=" footerx text-sm  text-gray-300 font-normal m-2 b-0">
                <v-icon size="16">mdi-clock</v-icon>
                08:00
            </h2>
            <v-spacer></v-spacer>
            <img :class="(active)?'animate__animated animate__pulse animate__infinite	infinite':''" class="m-2 h-10 w-10 rounded-full shadow-xl" src="@/assets/images/teacher.png" alt="">
        </div> 
    </div>
</div>
</template>

<script>
export default {
    name: 'ClassCard',
    created() {

    },
    data() {
        return {}
    },
    props: {
        active: {
            default: false,
        }
    },
    methods: {

    },
}
</script>

<style lang="scss" scoped>
 
</style>

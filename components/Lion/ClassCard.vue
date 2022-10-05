<template>
<div class="relative flex flex-col justify-between   bg-white shadow-md rounded-3xl  bg-cover text-gray-800  overflow-hidden cursor-pointer w-32 object-cover object-center rounded-lg shadow-md h-40 m-2" :style="`background-position: center; background-image:url(${image})`">
    <div v-if="active" class="absolute bg-gradient-to-t from-green-400 to-blue-400  opacity-50 inset-0 z-0">
    </div>
    <div @click="$router.push(`/class/${id}/`)" class="relative flex flex-row items-end  h-72 w-full ">
        <div class="absolute flex  w-full top-0">
            <h2 class=" footerx text-sm  text-gray-300 font-normal m-2 b-0">
                <v-icon size="16">mdi-clock</v-icon>
                {{time}}
            </h2>
            <v-spacer></v-spacer>
            <img :class="(active)?'animate__animated animate__pulse animate__infinite	infinite':''" class="m-2 h-10 w-10 rounded-full shadow-xl" :src="teacher" alt="">
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
        image: {
            type: String,
            default: 'https://sv1.picz.in.th/images/2022/08/06/XE20Yl.png'
        },
        time: {
            type: String,
            default: '16:00'
        },
        teacher: {
            type: String,
            default: require(`@/assets/images/teacher.png`)
        },
        active: {
            default: false,
        },
        id: {
            default: 0,
        }
    },
    methods: {

    },
}
</script>

<style lang="scss" scoped>
 
</style>

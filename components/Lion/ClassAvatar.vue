<template>
<center>
    <v-img class="rounded-full w-20 h-20" :src="img" alt=""></v-img>
    <h2 class="xt mt-1 text-base"  >{{text}}</h2>
</center>
</template>

<script>
export default {
    name: 'Icon',
    created() {

    },
    data() {
        return {}
    },
    props: {
        img:{
          default:'mdi-clock'
        },
        text:{
           default:'text'
        },
        color:{
          default:'white'
        }
    },
    methods: {

    },
}
</script>

<style lang="scss" scoped>

</style>

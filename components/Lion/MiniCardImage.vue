<template>
<center>
    
    <v-img height="50" width="50"  class="rounded-full shadow-xl" :src="icon" alt="" srcset=""></v-img>
 
    <h2 class="xt mt-1 text-sm"  >{{text}}</h2>
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
        icon:{
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

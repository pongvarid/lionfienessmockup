<template>
<center>
    <v-btn small fab>
        <v-icon size="36" :color="color">{{icon}}</v-icon>
    </v-btn>
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

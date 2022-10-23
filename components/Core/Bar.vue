<template>
<v-toolbar dense color="transparent" flat>
    <span class="font-semibold text-base"><v-icon size="13" class="mr-2" v-if="icon">{{icon}}</v-icon><span v-html="head"></span></span>
    <v-spacer></v-spacer>
      <span class="text-base" >{{txt}}</span>
</v-toolbar>
</template>

<script>
export default {
    props: {
        icon: { 
            default: null
        },
        head: { 
            default: ''
        },
        txt: { 
            default: ''
        },
    },

}
</script>

<style>

</style>

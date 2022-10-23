
<template>
  <div>
    <br>   <br>   <br>   <br> 
    <v-btn @click="switchLang('th')" color="success">Th</v-btn>
    <v-btn @click="switchLang('en')"  color="success">En</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Menu.vue',
  created() {

  },
  data() {
    return {
    }
  },
  props: {
   
  },
  methods: {
    async switchLang(lang) {
      await localStorage.setItem('lang',lang)
      await location.reload()
    }
  },
}
</script>

<style lang="scss" scoped>

</style>


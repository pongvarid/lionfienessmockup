<template>
<div> 
    <v-carousel :show-arrows="false" class="slide w-full  rounded-xl shadow-xl" style="height:200px;">
        <v-carousel-item class="slide w-full" v-for="(slide,i) in slides" :key="i">  
            <img class="w-full slide" :src="`${$url}/${slide.image}`" alt="">
        </v-carousel-item>
    </v-carousel>
</div>
</template>

<script>
import {Core} from '@/vuexes/core'
export default {
    data:()=>{
        return ({
            slides:[ 
            ] 
        })
    },
    async created(){
        await this.run()
    },
    methods:{
        async run(){
           let slides =  await Core.getHttp(`/api/app/promotion/?is_show=true&is_active=true`)
           this.slides = (slides.length > 0)? slides : this.slides
        }
    }

}
</script>

<style>

</style>

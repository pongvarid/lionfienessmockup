<template>
<div> 
    <!-- <v-carousel :show-arrows="false" class="  w-full  rounded-xl shadow-xl" style="height:200px;">
        <v-carousel-item  style="height:200px;" class="  w-full" v-for="(slide,i) in slides" :key="i">  
            <img  style="height:200px;"  class="w-full  " :src="`${$url}/${slide.image}`" alt="">
        </v-carousel-item>
    </v-carousel> -->
     <v-slide-group  active-class="black">
        <v-slide-item v-for="slide,i in slides" :key="i" v-slot="{ active, toggle }" class="w-full">
            <v-card  class="ma-2" height="200" :width="($vuetify.breakpoint.width > 700 )?`400`:$vuetify.breakpoint.width-80" @click="toggle">
                <img   class="h-full w-full" :src="`${$url}/${slide.image}`"> 
            </v-card>
        </v-slide-item>
    </v-slide-group>
</div>
</template>

<script>
import {Core} from '@/vuexes/core'
export default {
    data:()=>{
        return ({
            slides:[ 
            ], 
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

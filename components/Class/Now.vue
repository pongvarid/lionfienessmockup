<template>
<div>
    <v-slide-group show-arrows="false" multiple v-if="response">
        <v-slide-item v-for="course,n in courses" :key="n" v-slot="{ active, toggle }" >
            <div style="width:200px;" > 
                <Lion-ClassCard :id="course.id" :teacher="(course.teacher_image)?$url+course.teacher_image:`https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg`" :image="$url+course.image_1" :time="core.timeX(course.updated_at)"  :active="n==1"></Lion-ClassCard>
            </div> 
        </v-slide-item>
    </v-slide-group>
</div>
</template>

<script>
import {
    Core
} from '@/vuexes/core'
export default {
    data: () => {
        return ({ 
            courses:[],
            core:Core,
            response: false,
        })
    },
    async mounted(){
        await this.run()
    },
    methods:{
        async run(){
            this.courses =  await Core.getHttp(`/api/course/class/?category=&is_active=true&is_open=true`)
            this.response = true
        }
    }
}
</script>

<style>

</style>

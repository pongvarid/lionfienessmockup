<template>
<div class="pt-6 pl-6 pr-6">
    <h2 class="text-xl xd">Teacher</h2>
    <div class="flex flex-row flex-wrap"> 
        <Lion-ClassAvatar v-for="coach,i in coaches" :key="i" class="p-4 w-1/3" :img="`${$url}/${coach.coach_img}`" :text="`Kru.${coach.coach_name}`"></Lion-ClassAvatar>
       </div>
</div>
</template>

<script>
import {
    Core
} from '@/vuexes/core'
import _ from 'lodash'
export default {
    data:()=>{
        return ({
            coaches:[]
        })
    },
    async created(){
        await this.run();
    },
    methods:{
        async run(){
            let coaches = await Core.getHttp(`/api/account/coach/`)
            if(coaches.length > 0){
                coaches = _.map(coaches,(r)=>{
                    let obj = r
                    obj.coach_name = r.user.nick_name
                    obj.coach_img = r.user.image
                    obj.coach_major = r.major.name
                    return obj
                })
                this.coaches = coaches
            }
            
        }
    }
}
</script>

<style>

</style>

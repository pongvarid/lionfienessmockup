<template>
<div class="pt-6 pl-6 pr-6">
    <h2 class="text-xl xd">Teacher</h2>
    <div class="flex flex-row flex-wrap"> 
        <Lion-ClassAvatar v-for="coach,i in coaches" :key="i" class="p-4 w-1/3" :img="(coach.coach_img)?`${$url}/${coach.coach_img}`:`https://cdn-icons-png.flaticon.com/512/147/147144.png`" :text="`Kru.${coach.coach_name}`"></Lion-ClassAvatar>
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
            console.log(coaches);
            if(coaches.length > 0){
                coaches = _.map(coaches,(r)=>{
                    let obj = r
                    if(r.user){
                        let user = r.user
                        obj.coach_name = user.nick_name
                        obj.coach_img = user.image
                    } 
                    // if(r.major){
                    //     let major = r.major
                    //     obj.coach_major = major.name

                    // } 
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

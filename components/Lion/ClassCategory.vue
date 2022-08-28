<template>
<div class="flex justify-between ">
    <div v-for="list,i in lists" key="i" @click="openCategory(list.id)">
        <Lion-MiniCardImage :text="list.name" :icon="`${$url}/${list.icon}`"></Lion-MiniCardImage>
    </div> 
</div>
</template>

<script>
import {
    Core
} from '@/vuexes/core'
export default {
    data:()=>{
        return ({
            lists:[]
        })
    },
    props:{
        pageMode:{
            default:true
        }
    },  
    async created(){
        await this.run();
    }, 
    methods:{
        async run(){
            let lists = await Core.getHttp(`/api/course/category/?is_active=true`)
            if(lists.length > 0){
                this.lists = lists
            }
        },
        async openCategory(id){
            if(this.pageMode){
               await this.$router.push(`/class/?category=${id}`)
            }else{  
                await this.$emit(`callback`,id)
            }
        }
    }
}
</script>

<style>

</style>

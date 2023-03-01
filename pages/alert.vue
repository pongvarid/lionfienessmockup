<template>
<div class="p-6 flex flex-col">
    <div class="text-2xl xd">Notification & Promitions</div>
    <Lion-Promotions class="mt-4"></Lion-Promotions>
    <div class="mt-6">
        <v-card v-for="list,i in lists" :key="i" class="p-4 m-2 mt-4">
            <div class="flex flex-row " @click="openDialog(list)">
                <div>
                    <v-icon color="#eaab4d">mdi-information</v-icon>
                </div>
                <div class="pl-2">
                    <h2 class="font-semibold">{{list.name}}</h2>
                    <span class="text-xs">{{core.dateTH(list.created_at)}}</span>
                </div>
            </div>
        </v-card>
    
    </div>
    <v-dialog v-model="dialog" scrollable max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
                {{data.name}} <v-spacer></v-spacer>
                <v-btn @click="dialog=false" dark text small  ><v-icon>mdi-close</v-icon></v-btn>
            </v-card-title>
            <v-card-text>
                <img :src="`${$url}/${data.image}`" alt="">
                <div v-html="data.detail" class="mt-4"> 
                </div>
                <div v-if="data.type == 2 ">  
                    <div v-if="mytier">
                        <v-btn color="success" block @click="$router.push(`/payout?old_id=${mytier.id}&pro_id=${data.tier}`)" >ไปที่ Package</v-btn>
                    </div>
                    <div v-else>
                        <v-btn color="success" block @click="$router.push(`/payout?pro_id=${data.tier}`)" >ไปที่ Package</v-btn>
                    </div> 
                </div>
            </v-card-text>
         </v-card>
    </v-dialog>
</div>
</template>

<script>
import {
    Core
} from '@/vuexes/core'
export default {
    data: () => {
        return ({
            core:Core,
            dialog: false,
            lists: [{
                    name: "LionFitnessChiangMai นี่แหล่ะ",
                    date: "10/05/2022"
                },
                {
                    name: "โปรโมชัน ลด พิเศษ",
                    date: "10/05/2022"
                },
                {
                    name: "ประกาศปรับ ตารางคลาสประจำสัปดาห์ ",
                    date: "10/05/2022"
                }
            ],
            data:{},
        })
    },
    async created() {
        await this.run();
    },
    methods:{
        async run(){
            let lists = await Core.getHttp(`/api/app/promotion/?is_active=true`)
            if(lists.length > 0){
                this.lists = lists
            }
        },
        async openDialog(data){
            this.data = data
            this.dialog = true
        },
        async loadMyTier() {
           try {
            let inTier = await this.$auth.loadMyTierDiff();
            if(inTier.status){
                this.mytier = inTier.data 
            } else {
                this.showAlert = false 
            }
           } catch (error) {
            this.showAlert = false
            console.log(error);
           }
        }
        
    }
}
</script>

<style>

</style>

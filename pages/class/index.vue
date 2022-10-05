<template>
<div class="p-6 flex flex-col">

    <div class="text-2xl xd">Class</div>
    
    <div class="mt-6">
        <Lion-ClassCategory :pageMode="false" @callback="getData" class="mb-6"></Lion-ClassCategory>

        <v-card class="rounded-lg" v-for="(data,i) in lists" :key="i" @click="$router.push(`/class/${data.id}/`)">
            <img class="h-32 w-full" style="object-fit: cover;" :src="`${$url}/${data.image_1}`" alt="">
            <v-card-actions>
              <span class="font-semibold">{{data.name}}</span>
            </v-card-actions>
        </v-card>
    </div>

</div>
</template>

  
  
<script>
import {
    Core
} from '@/vuexes/core'
export default {
    data: () => {
        return ({
            core: Core,
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
            data: {},
        })
    },
    async created() {
        await this.run();
    },
    methods: {
        async run() {
            let category = (this.$route.query.category)?`&category=${this.$route.query.category}`:``
            let lists = await Core.getHttp(`/api/course/class/?is_active=true${category}`)
            if (lists.length > 0) {
                this.lists = lists
            }
        },
        async getData(id){
            this.lists = []
            let lists = await Core.getHttp(`/api/course/class/?is_active=true&category=${id}`)
            if (lists.length > 0) {
                this.lists = lists
            }
        }
    }
}
</script>
  
  
<style>
  
  </style>

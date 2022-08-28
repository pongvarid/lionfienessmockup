<template>
<div>
    <v-card class="rounded-lg" v-for="(data,i) in classes" :key="i" @click="$router.push(`/class/${data.id}/`)">
        <img class="h-32 w-full" style="object-fit: cover;" :src="`${$url}/${data.image_1}`" alt="">
        <v-card-actions>
              <span class="font-semibold">{{data.name}}</span>
            </v-card-actions>
    </v-card> 
</div>
</template>

    
    
<script>
import {
    Core
} from '@/vuexes/core'
export default {
    data: () => {
        return ({
            classes: [{
                "id": 1,
                "name": "BODYPUMB",
                "detail": "เรื่องความไว้วางใจเทรนเนอร์ส่วนตัวสอนออกกำลังกาย  ที่ Lion Fitness ไม่ต้องใหวตก็ตัดสินใจได้ทันที  แค่เริ่มมาทดลองเทรนฟรีกับเรา เทรนเนอร์ที่มีประสบการณ์มากกว่า 100 ชม. พร้อมทั้งประเมินสมรรถภาพการออกกำลังกาย วิเคราะห์มวลร่างกายและให้คำปรึกษาการวางเป้าหมายในการออกกำลังกาย",
                "video": "video/class/01_bpfhtbk.mp4",
                "image_1": "images/class/cbg_KwrYJbJ.png",
                "image_2": null,
                "image_3": null,
                "image_4": null,
                "image_5": null,
                "recommend": true,
                "is_active": true,
                "created_at": "2022-08-07T08:13:01.030758Z",
                "updated_at": "2022-08-28T17:07:48.114550Z",
                "category": 1
            }]
        })
    },
    async created() {
        await this.run()
    },
    methods: {
        async run() {
            this.classes = await Core.getHttp(`/api/course/class/?is_active=true&recommend=true`)
        }
    }

}
</script>
    
    
<style>
    
    </style>

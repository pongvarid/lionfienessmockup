<template>
<div v-if="response">
    <v-toolbar class="w-full mt-4" absolute color="transparent" flat fixed>
        <h2 class=" text-2xl ml-4 text-white ">{{data.name}}</h2>
        <v-spacer></v-spacer>
        <v-btn dark @click="$router.push('/home/')" small text>
            <v-icon size="28">mdi-close</v-icon>
        </v-btn>
    </v-toolbar>

    <v-carousel :continuous="false" :cycle="true" :show-arrows="false" hide-delimiter-background delimiter-icon="mdi-minus" style="height: 60vh;">
        <v-carousel-item>
            <div class="relative overflow-hidden  w-full  ">
                <div class="absolute bg-gradient-to-b from-black/80 via-black-500/0 to-black/0  inset-0 z-0"></div>
                <video autoplay muted playsinline loop class="class-video">
                    <source :src="`${$url}/${data.video}`" type="video/mp4">
                    Your browser does not support HTML5 video.
                </video>
            </div>
        </v-carousel-item>
        <v-carousel-item v-if="data.image_1">
            <div class="relative overflow-hidden  w-full  ">
                <div class="absolute bg-gradient-to-b from-black/80 via-black-500/0 to-black/0  inset-0 z-0"></div>
                <img class="class-video" :src="`${$url}/${data.image_1}`" alt="">
            </div>
        </v-carousel-item>
        <v-carousel-item v-if="data.image_2">
            <div class="relative overflow-hidden  w-full  ">
                <div class="absolute bg-gradient-to-b from-black/80 via-black-500/0 to-black/0  inset-0 z-0"></div>
                <img class="class-video" :src="`${$url}/${data.image_2}`" alt="">
            </div>
        </v-carousel-item>
        <v-carousel-item v-if="data.image_3">
            <div class="relative overflow-hidden  w-full  ">
                <div class="absolute bg-gradient-to-b from-black/80 via-black-500/0 to-black/0  inset-0 z-0"></div>
                <img class="class-video" :src="`${$url}/${data.image_3}`" alt="">
            </div>
        </v-carousel-item>
        <v-carousel-item v-if="data.image_4">
            <div class="relative overflow-hidden  w-full  ">
                <div class="absolute bg-gradient-to-b from-black/80 via-black-500/0 to-black/0  inset-0 z-0"></div>
                <img class="class-video" :src="`${$url}/${data.image_4}`" alt="">
            </div>
        </v-carousel-item>

        <v-carousel-item v-if="data.image_5">
            <div class="relative overflow-hidden  w-full  ">
                <div class="absolute bg-gradient-to-b from-black/80 via-black-500/0 to-black/0  inset-0 z-0"></div>
                <img class="class-video" :src="`${$url}/${data.image_5}`" alt="">
            </div>
        </v-carousel-item>
    </v-carousel>

    <div>
        
        <div class="p-6 pb-20">
            <!-- <div class="flex justify-between pl-6 pr-6">
                <Lion-Icon text="MON" icon="mdi-calendar"></Lion-Icon>
                <Lion-Icon text="8:00 AM"></Lion-Icon>
                <Lion-Icon text="6/10" icon="mdi-account-group"></Lion-Icon>
                <Lion-Icon text="9.8" icon="mdi-star" color="orange"></Lion-Icon>
            </div> -->
            <v-divider class="mt-6"></v-divider>
            <h2 class="text-xl xd uppercase mt-8">DETAILS</h2>
            <div class="p-2">
                <span v-html="data.detail">

                </span>
            </div>
            <v-divider class="mt-6 mb-4"></v-divider>
            <div class="flex items-center" v-for="coach,i in coaches" key="i">

                <img v-if="coach.image" class="rounded-full w-20 h-20 object-cover" :src="`${$url}/${coach.image}`" alt="">
                <img v-else class="rounded-full w-20 h-20 object-cover" src="@/assets/images/logox.jpg" alt="">
                <div>
                    <h2 class="text-xl xd ml-2">Kru.{{coach.nick_name}} </h2>
                </div>
            </div>
            <v-divider class="mt-4 mb-6"></v-divider>
         
        </div>
    </div>

</div>
</template>

<script>
import {
    Web
} from '@/vuexes/web'
import {
    Core
} from '@/vuexes/core'
import {
    Auth
} from '@/vuexes/auth'
import {
    Course
} from '@/vuexes/course'
import _ from 'lodash'
export default {
    name: 'classId',

    async mounted() {
        await this.run();
        this.response = true;
    },
    data() {
        return {
            response: false,
            tier: Auth.mytier,
            id: 0,
            def: {
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
            },
            data: this.def,
            coaches: [],
            user: Auth.user,
            isClass: true,

        }
    },
    methods: {
        async run() {
            console.log(this.$route.params.id)
            this.id = this.$route.params.id;
            let data = await Core.getHttp(`/api/course/class/${this.id}/`)
            this.data = (data.id) ? data : this.def
            await this.getCoaches();
            if (Auth.user) {
                this.isClass = await Course.fundingClass(this.user.id, this.id)
            }

        },
        async getCoaches() {
            if (this.data.coaches) {
                this.coaches = _.map(this.data.coaches, (r) => {
                    return r.coach_training.user
                })
            }
        },
        async registerClass() {
            let auth = Auth;
            let user = Auth.user;
            if (auth.mytier && user.in_class) {
                if (await Web.confirm('ยืนยันการลงทะเบียนเข้าคลาส')) {
                    let register = await Course.registerClass(this.user.id, this.id)
                    if (register.id) {
                        await Web.alert(`ลงทะเบียนเข้าคลาส ${this.data.name} สำเร็จ`)
                    }
                    await this.run();
                }
            }else{
                await Web.alert('กรุณาเลือกแพ็คเกจสมาชิกก่อนลงทะเบียนคลาส หรือ ต่ออายุสมาชิก','info')
            }

        },
        async getClass() {
            this.$router.push(`/auth/login/`)
        }
    },
}
</script>

<style lang="scss" scoped>
.class-video {

    width: 100vw;
    height: 60vh;
    object-fit: cover;
}
</style>

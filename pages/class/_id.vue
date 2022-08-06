<template>
<div>
    <v-toolbar class="w-full mt-4" absolute color="transparent" flat fixed>
        <h2 class=" text-2xl ml-4 xd">BODYPUMB</h2>
        <v-spacer></v-spacer>
        <v-btn @click="$router.push('/home/')" small text>
            <v-icon size="28">mdi-close</v-icon>
        </v-btn>
    </v-toolbar>

    <v-carousel :continuous="false" :cycle="true" :show-arrows="false" hide-delimiter-background delimiter-icon="mdi-minus"  style="height: 60vh;">
        <v-carousel-item  >
            <div class="relative overflow-hidden  w-full  ">
                <div class="absolute bg-gradient-to-b from-black/80 via-black-500/0 to-black/0  inset-0 z-0"></div>
                <video autoplay muted playsinline loop class="class-video">
                    <source src="@/assets/videos/01.mp4" type="video/mp4">
                    Your browser does not support HTML5 video.
                </video>
            </div>
        </v-carousel-item>
          <v-carousel-item >
            <div class="relative overflow-hidden  w-full  ">
                <div class="absolute bg-gradient-to-b from-black/80 via-black-500/0 to-black/0  inset-0 z-0"></div>
                <img  class="class-video" src="https://scontent.fcnx3-1.fna.fbcdn.net/v/t39.30808-6/295458729_546732387244783_5645233148420814976_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=8Y8lBVSklvwAX-BpLbz&tn=2VnzdktOo7v9BF8O&_nc_ht=scontent.fcnx3-1.fna&oh=00_AT8ljDi5pPoHhMzBs4MIyWYVxCWui0F1MMv0Yaq0k1532w&oe=62F36052" alt="">
            </div>
        </v-carousel-item>
          <v-carousel-item >
            <div class="relative overflow-hidden  w-full  ">
                <div class="absolute bg-gradient-to-b from-black/80 via-black-500/0 to-black/0  inset-0 z-0"></div>
                 <img  class="class-video" src="https://scontent.fcnx3-1.fna.fbcdn.net/v/t39.30808-6/294136196_538385268079495_8914706552612966188_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=730e14&_nc_ohc=GYqLExF0BLYAX_c9iQN&tn=2VnzdktOo7v9BF8O&_nc_ht=scontent.fcnx3-1.fna&oh=00_AT83l7mn0ykpfXjAgpg4XfBjKGGuzsF1gz7ttZrq_laLQg&oe=62F2CACD" alt="">
             
             </div>
        </v-carousel-item>
    </v-carousel>

    <div>

        <div class="p-6 pb-20">
            <div class="flex justify-between pl-6 pr-6">
                <Lion-Icon text="MON" icon="mdi-calendar"></Lion-Icon>
                <Lion-Icon text="8:00 AM"></Lion-Icon>
                <Lion-Icon text="6/10" icon="mdi-account-group"></Lion-Icon>
                <Lion-Icon text="9.8" icon="mdi-star" color="orange"></Lion-Icon>
            </div>
            <v-divider class="mt-6"></v-divider>
            <h2 class="text-xl xd uppercase mt-8">DETAILS</h2>
            <div class="p-2">
                <span>
                    ☝🏻 เรื่องความไว้วางใจเทรนเนอร์ส่วนตัวสอนออกกำลังกาย 🥇 ที่ Lion Fitness ไม่ต้องใหวตก็ตัดสินใจได้ทันที ⚡️⚡️ 🔰 แค่เริ่มมาทดลองเทรนฟรีกับเรา เทรนเนอร์ที่มีประสบการณ์มากกว่า 100 ชม. พร้อมทั้งประเมินสมรรถภาพการออกกำลังกาย วิเคราะห์มวลร่างกาย 📛💯 🏆 และให้คำปรึกษาการวางเป้าหมายในการออกกำลังกาย 🏆
                </span>
            </div>
            <v-divider class="mt-6 mb-4"></v-divider>
            <div class="flex items-center">
                <img class="rounded-full w-20 h-20 object-cover" src="@/assets/images/teacher2.png" alt="">
                <div>
                    <h2 class="text-xl xd">Kru.NamFon</h2>
                </div>
            </div>
                 <v-divider class="mt-4 mb-6"></v-divider>
            <v-btn block color="success">
                <span class="font-outbold">ลงทะเบียนเข้าคลาส</span>
            </v-btn>
        </div>
    </div>

</div>
</template>

<script>
export default {
    name: 'classId',
    async asyncData({
        params
    }) {
        const id = params.id
        return {
            id
        }
    },
    created() {

    },
    data() {
        return {}
    },
    props: {

    },
    methods: {

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

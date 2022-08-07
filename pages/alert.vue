<template>
<div class="p-6 flex flex-col">
    <div class="text-2xl xd">Notification</div>
    <v-carousel :show-arrows="false" class="slide w-full  rounded-xl shadow-xl mt-6" style="height:200px;">
        <v-carousel-item class="slide w-full" v-for="(i) in 5" :key="i">
            <img class="w-full slide" src="https://scontent.fcnx3-1.fna.fbcdn.net/v/t39.30808-6/296648946_550590026859019_6460658217799407405_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=ApC-Jo8SGBQAX_6AOv8&_nc_ht=scontent.fcnx3-1.fna&oh=00_AT-5qN56-Jl58ezFriF768YtigieL5gcokRshagYljY2Dw&oe=62F4519E" alt="">
        </v-carousel-item>
    </v-carousel>
    <div class="mt-6">
        <v-card v-for="list,i in lists" :key="i" class="p-4 m-2 mt-4">
            <div class="flex flex-row " @click="dialog=true">
                <div>
                    <v-icon color="#eaab4d">mdi-information</v-icon>
                </div>
                <div class="pl-2">
                    <h2 class="font-semibold">{{list.name}}</h2>
                    <span class="text-xs">{{list.date}}</span>
                </div>
            </div>
        </v-card>
    </div>
    <v-dialog v-model="dialog" scrollable  max-width="500px" transition="dialog-transition">
      <v-card>
        <img src="https://scontent.fcnx3-1.fna.fbcdn.net/v/t39.30808-6/296319811_546068773977811_5448770042187559304_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=lpCrR4S7nmgAX-ovEEG&_nc_ht=scontent.fcnx3-1.fna&oh=00_AT_Vv1oWtlmTih4QSBi9c5r-H7Ro43XA_2C9fyHcCCvH3g&oe=62F3725B" alt="">
      </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    data: () => {
        return ({
          dialog:false,
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
            ]
        })
    }
}
</script>

<style>

</style>

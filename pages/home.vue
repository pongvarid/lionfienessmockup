<template>
<div>
    <div class="w-full    ">
        <v-toolbar color="transparent " plat>

            <img class="w-28" src="@/assets/images/logo.png" alt="">
            <v-spacer></v-spacer>
        </v-toolbar>
        <div class="pt-4 pl-6 pr-6">
            <h2 class="text-xl  xd mb-2">Promotions</h2>
            <v-carousel :show-arrows="false" class="slide w-full  rounded-xl shadow-xl" style="height:200px;">
                <v-carousel-item class="slide w-full" v-for="(i) in 5" :key="i">
                    <img class="w-full slide" src="https://scontent.fcnx3-1.fna.fbcdn.net/v/t39.30808-6/296648946_550590026859019_6460658217799407405_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=ApC-Jo8SGBQAX_6AOv8&_nc_ht=scontent.fcnx3-1.fna&oh=00_AT-5qN56-Jl58ezFriF768YtigieL5gcokRshagYljY2Dw&oe=62F4519E" alt="">
                </v-carousel-item>
            </v-carousel>
        </div>
        <div class="pt-4 pl-6 pr-6 ">
            <h2 class="text-xl  xd">Class Now</h2>
            <v-slide-group show-arrows="false" multiple>
                <v-slide-item v-for="n in 25" :key="n" v-slot="{ active, toggle }">
                    <Lion-ClassCard :active="n==1"></Lion-ClassCard>
                </v-slide-item>
            </v-slide-group>
        </div>
        <div class="pt-6 pl-6 pr-6">
            <h2 class="text-xl xd">Category</h2>
            <div class="pt-4 p-3 space-y-4 z-0">
                <div class="flex justify-between ">
                    <Lion-MiniCard text="Runnung" icon="mdi-run-fast"></Lion-MiniCard>
                    <Lion-MiniCard text="Dancing" icon="mdi-dance-ballroom"></Lion-MiniCard>
                    <Lion-MiniCard text="Weight" icon="mdi-weight-lifter"></Lion-MiniCard>
                    <Lion-MiniCard text="Walking" icon="mdi-walk"></Lion-MiniCard>
                </div>
            </div>
        </div>

        <div class="pt-2 pl-6 pr-6">
            <div class=" p-3 space-y-4 z-0">
                <v-card class="rounded-lg">
                    <img src="@/assets/images/c1.png" alt="">
                </v-card>
                <v-card class="rounded-lg">
                    <img src="@/assets/images/c2.png" alt="">
                </v-card>
                <v-card class="rounded-lg">
                    <img src="@/assets/images/c3.png" alt="">
                </v-card>
                <v-card class="rounded-lg">
                    <img src="@/assets/images/c4.png" alt="">
                </v-card>
            </div>
        </div> 

        <div class="pt-6 pl-6 pr-6">
            <h2 class="text-xl xd">Teacher</h2>
            <div class="flex flex-wrap">
                <Lion-ClassAvatar class="m-4" :img="require('@/assets/images/teacher.png')" text="Kru.Ton"  ></Lion-ClassAvatar>
                <Lion-ClassAvatar class="m-4"  :img="require('@/assets/images/teacher2.png')" text="Kru.Namfon" ></Lion-ClassAvatar>
                <Lion-ClassAvatar class="m-4"  :img="require('@/assets/images/teacher3.png')" text="Kru.Nam" ></Lion-ClassAvatar>
                     <Lion-ClassAvatar class="m-4" :img="require('@/assets/images/teacher.png')" text="Kru.Ton"  ></Lion-ClassAvatar>
                <Lion-ClassAvatar class="m-4"  :img="require('@/assets/images/teacher2.png')" text="Kru.Namfon" ></Lion-ClassAvatar>
                <Lion-ClassAvatar class="m-4"  :img="require('@/assets/images/teacher3.png')" text="Kru.Nam" ></Lion-ClassAvatar>
                
            </div>
        </div>
        <br><br><br> 

    </div>
</div>
</template>

<script>
export default {
    name: "IndexPage",
};
</script>

<style>
::-webkit-scrollbar {
    width: 0;
}

::-webkit-scrollbar-track {}

::-webkit-scrollbar-thumb {
    background-color: transparent;
    outline: 1px solid transparent;
}

.slide {
    height: 200px;
    object-fit: cover;
}
</style>

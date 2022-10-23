<template>
<div>
    <div class="w-full    ">
        <v-toolbar color="transparent " flat> 
            <img class="w-28" src="@/assets/images/logoh.png" alt="">
            <v-spacer></v-spacer>
        </v-toolbar>
        <div class="pt-4 pl-6 pr-6">
            <h2 class="text-xl  xd mb-2">Promotions</h2>
            <Lion-Promotions></Lion-Promotions>
        </div>
        <div class="pt-4 pl-6 pr-6 ">
            <h2 class="text-xl  xd">Class Now</h2>
            <Class-Now></Class-Now>
        </div>
        <div class="pt-6 pl-6 pr-6">
            <div class="flex">
                <h2 class="text-xl xd">Category</h2>
                <v-spacer></v-spacer>
                <v-btn @click="$router.push('/class/')" dark rounded small><span class="font-semibold capitalize">View All</span></v-btn>
            </div>
            <div class="pt-6 p-3 space-y-4 z-0">
                <Lion-ClassCategory></Lion-ClassCategory>
            </div>
        </div>

        <div class="pt-2 pl-6 pr-6">
            <div class=" p-3 space-y-4 z-0">
                <Lion-ClassRecommend></Lion-ClassRecommend>
            </div>
        </div>

        <Lion-Coaches></Lion-Coaches>
        <br><br><br>

    </div>
</div>
</template>

<script>
export default {
    name: "IndexPage",
    data() {
        return {
           
        }
    },
    async created(){
        await this.run();
    },
    methods:{
        async run(){
             
        },
    }
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

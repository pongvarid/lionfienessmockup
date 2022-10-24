<template>
<div>
    <div class="w-full    ">
        <v-toolbar color="black " flat> 
            <img class="w-28" src="@/assets/images/logoh.png" alt="">
            <v-spacer></v-spacer>
        </v-toolbar>
        <div class="pt-4 pl-6 pr-6"> 
            <Lion-Promotions></Lion-Promotions>
        </div>
        <!-- <div class="pt-4 pl-6 pr-6 ">
            <h2 class="text-xl  xd">Class Now</h2>
            <Class-Now></Class-Now>
        </div> -->
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

        <div class="pt-6 pl-6 pr-6">
            <div class="flex">
                <h2 class="text-xl xd">Promotions</h2>
                <v-spacer></v-spacer>
                <v-btn @click="$router.push('/alert/')" dark rounded small><span class="font-semibold capitalize">View All</span></v-btn>
            </div>
            <div class="pt-6 p-3 space-y-4 z-0">
                <v-card v-for="list,i in lists" :key="i" class="p-4 m-2 mt-4">
            <div class="flex flex-row " @click="openDialog(list)">
                <div>
                    <v-icon color="#eaab4d">mdi-information</v-icon>
                </div>
                <div class="pl-2">
                    <h2 class="font-semibold">{{list.name}}</h2>
                    <span class="text-xs">{{$core.dateTH(list.created_at)}}</span>
                </div>
            </div>
        </v-card>
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
            </v-card-text>
         </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    name: "IndexPage",
    data() {
        return {
            lists:[],
            dialog:false,
            data:{},
        }
    },
    async created(){
        await this.run();
    },
    methods:{
        async run(){
            let lists = await this.$core.getHttp(`/api/app/promotion/?is_active=true`)
            if(lists.length > 0){
                this.lists = lists
            }
        },
        async openDialog(data){
            this.data = data
            this.dialog = true
        }
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

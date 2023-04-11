<template>
<div class="bg2 h-screen"> 
    <v-toolbar dark v-if="toolbar">
        <v-btn icon @click="$router.go(-1)">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{$l(`Trainer`,`Trainer`)}}</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
    <div   v-if="myClass">
          <MeComponent   :classId="myClass.id"></MeComponent>
    </div>
    <div v-else class="flex flex-col justify-center items-center p-4">
        <img class="h-48 mt-16" src="@/assets/images/v2/017-workout.png" alt="">
        <h2 class="text-2xl font-semibold mt-6">{{$l(`บริการครูฝึก & Trainer`,`Trainer Service`)}}</h2>
        <center> <span>{{$l(`จัดการการออกกำลังกายของคุณอย่างมีประสิทธิภาพ กับ Trainer ของเราที่มีประสบการณ์และ ความเชี่ยวชาญ`,`Manage your workouts efficiently with our Trainer.`)}}</span>
        </center> 
        <div class="mt-6 w-full">
            <center>nter>
                <v-btn @click="$router.push(`/trainer/list/`)" class="m-2" x-large block depressed>{{$l(`ค้นหา Trainer`,`Searching Trainer`)}}</v-btn> 
            </center>

        </div>
    </div>

</div>
</template>

<script>
import {
    Core
} from "@/vuexes/core";
import {
    Web
} from "@/vuexes/web";
import {
    Auth
} from "@/vuexes/auth";
import _ from "lodash";
import moment from "moment";
import MeComponent from '@/pages/trainer/me/MeComponent'
export default {
    components: {
        MeComponent
    },
    props:{
        toolbar:{
            type:Boolean,
            default:true
        }, 
    },
    data: () => {
        return {
            req: v => !!v || "ฟิลด์ด์นี้ต้องระบุข้อมูล",
            items: [],
            form: {},
            core: Core,
            dialog: false,
            myClass: null,
        };
    },
    async created() {
        await this.run();
        await this.getMyClass();
        
    },
    methods: {
        async run() {
            this.items = await Core.getHttp(`/api/trainer/trainers/?is_active=true`);

        },

        async getMyClass() {
            let myClass = await Core.getHttp(`/api/trainer/trainer-class/?is_active=true&user=${this.$auth.user.id}`);
            this.myClass = (myClass.length > 0) ? myClass[0] : null;
        }

    }
}
</script>

Profile
history
Calendar
Menu

<template>
<div class="bg2 h-screen">

    <div class="flex flex-col justify-center items-center p-4">
        <img class="h-48 mt-16" src="@/assets/images/v2/017-workout.png" alt="">
        <h2 class="text-2xl font-semibold mt-6">{{$l(`บริการครูฝึก & Trainer`,`Trainer Service`)}}</h2>
        <center> <span>{{$l(`จัดการการออกกำลังกายของคุณอย่างมีประสิทธิภาพ กับ Trainer ของเราที่มีประสบการณ์และ ความเชี่ยวชาญ`,`Manage your workouts efficiently with our Trainer.`)}}</span>
        </center>
        <center class="mt-6 w-full">
            <div v-if="myClass">
                <v-btn @click="$router.push(`/trainer/me/?id=${myClass.id}`)" class="m-2" x-large block depressed>{{$l(`Trainer ของฉัน`,`My Trainer`)}}</v-btn>
            </div>
            <div v-else>
                <v-btn @click="$router.push(`/trainer/list/`)" class="m-2" x-large block depressed>{{$l(`ค้นหา Trainer`,`Searching Trainer`)}}</v-btn>
            </div>

        </center>
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
export default {
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

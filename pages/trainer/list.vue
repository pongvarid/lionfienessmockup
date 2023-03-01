<template>
<div class="p-6 flex flex-col bg2" v-if="response">
    <div class="text-2xl font-semibold">{{$l(`รายการ Trainer`,`Trainers`)}}</div>
    <div class="text-sm  ">{{$l(`ค้นหา Trainer ที่ตรงกับคุณ`,`Searching Your Trainer`)}}</div>
    <div v-for="item,i in items" :key="i" class="mt-6"> 
 
            <v-card class="mx-auto"   outlined v-if="item.user_detail">
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="text-overline mb-4">
                            Kru.
                        </div>
                        <v-list-item-title class="text-h5 mb-1">
                            {{item.user_detail.nick_name}} 
                        </v-list-item-title>
                        <v-list-item-subtitle>{{item.user_detail.first_name}} {{item.user_detail.last_name}}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar   size="80" color="grey">
                        <img :src="$url+item.user_detail.image" class="contain" alt="">
                    </v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="$router.push(`/trainer/payout/?id=${item.id}`)" outlined rounded text>
                        {{$l(`เลือก Trainer คนนี้`,`Select This Trainer`)}}
                    </v-btn>
                </v-card-actions>
            </v-card> 
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
            response: false
        };
    },
    async created() {
        await this.run();
        this.response = true
    },
    methods: {
        async run() {
            this.items = await Core.getHttp(`/api/trainer/trainers/?is_active=true`);

        },

    }
}
</script>
   
   Profile
   history
   Calendar
   Menu
s

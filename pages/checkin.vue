<template>
<div class="h-screen">
    <div class="p-6 flex flex-col">
        <div class="text-2xl xd">Check In</div>
        <div v-if="response" class="mt-6"> 
            <v-toolbar flat color="transparent">
                <h2 class="text-xl ">{{course.course_name}}</h2>
                <v-spacer></v-spacer>
                <v-switch @change="switchClass()" color="success" v-model="open"></v-switch> 
            </v-toolbar>
            <div  > 
                <div class="flex bg-white m-2 mt-4 p-2 shadow-xl rounded"  v-for="vuser,i in users" :key="i" @click="openShheet(vuser)">
                    <v-avatar size="40">
                        <img :src="$url+vuser.image" alt="alt">
                    </v-avatar>
                    <div class="ml-2 bg-white">
                        <h2 class="font-semibold text-green-500">{{vuser.nick_name}} ({{vuser.fitness_id}}) </h2> 
                        <div class="flex">
                            <span :class="(vuser.checkin)?`text-green-600`:`text-orange-600`">{{(vuser.checkin)?`เช็คชื่อเเล้ว`:`ยังไม่ได้เช็คชื่อ`}} </span>
                        <div v-if="vuser.checkin" class="ml-2">
                            <span class="text-red-500" v-if="vuser.checkin.missing">(ขาด)</span>
                            <span class="text-blue-500" v-if="vuser.checkin.bypass">(ลา / ข้ามการเช็คชื่อ)</span>
                        </div>
                        </div>
                    
                    </div>
                </div> 
            </div>
        </div>
    </div>

    <v-bottom-sheet v-model="sheet">
        <v-list>
            <v-toolbar class="m-2" color="transparent" flat>
                <v-avatar size="40">
                    <img :src="$url+userChoose.image" alt="alt">
                </v-avatar>
                <h2 class="ml-2">{{userChoose.nick_name}} ({{userChoose.username}})</h2>
            </v-toolbar>
            <v-divider></v-divider>
            <!-- <v-subheader>Open in</v-subheader> -->
            <v-list-item @click="checkIn(false)" v-if="!userChoose.checkin">
                <v-list-item-avatar>
                    <v-icon color="success">mdi-check-circle</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>เข้าคลาส</v-list-item-title>
            </v-list-item> 
            <v-list-item @click="checkIn(true)" v-if="!userChoose.checkin">
                <v-list-item-avatar>
                    <v-icon color="error">mdi-close-circle</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>ขาด</v-list-item-title>
            </v-list-item>
            <v-list-item @click="checkIn(false,true)" v-if="!userChoose.checkin">
                <v-list-item-avatar>
                    <v-icon color="primary">mdi-information</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>ลา</v-list-item-title>
            </v-list-item>
            <v-list-item @click="cancle()" v-if="userChoose.checkin">
                <v-list-item-avatar>
                    <v-icon color="error">mdi-close-circle</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>ยกเลิก</v-list-item-title>
            </v-list-item>
        </v-list> <br>  <br><br>  
    </v-bottom-sheet>
</div>
</template>

<script>
import {
    Course
} from '@/vuexes/course'
import {
    Core
} from '@/vuexes/core'
import {
    Auth
} from '@/vuexes/auth'
import {
    Web
} from '@/vuexes/web'
import moment from 'moment'
import _ from 'lodash'
export default {
    data: () => {
        return ({
            open:false,
            sheet: false,
            tab: 0,
            core: Core,
            course: {},
            user: Auth.user,
            users: [],
            userChoose: {},
            userChecked: [],
            id: 0,
            today: moment().format(`YYYY-MM-DD`),
            response: false,
        })
    },
    async mounted() {
        await this.run()
        this.response = true
    },
    methods: {
        async run() {
            this.id = this.$route.query.id
            this.course = await this.$core.getHttp (`/api/course/series-daily/${this.id}/`)
            await this.getUserCheck();
            this.open = this.course.is_open_class
            let data = await this.$core.getHttp(`/api/register/history/?diary=${this.$route.query.id}`)
            this.users = _.map(data, (v, i) => { 
                let obj = v.user_data
                obj.checkin = _.find(this.userChecked,(r)=>{
                    return r.user == v.user
                }) 
                return obj
            })
        },
        async checkIn(missing,bypass=false) {
            let check = confirm(`ยืนยันการเช็คชื่อ`)
            if(check){
                let checkin = await this.$core.postHttp(`/api/register/usercheckin/`, {
                    user: this.userChoose.id,
                    series: this.id,
                    course: this.course.course_class,
                    date: this.today,
                    missing: missing,
                    bypass: bypass
                })
                if (checkin) {
                    this.sheet = false
                    await this.$web.alert(`เช็คชื่อเรียบร้อย`)
                    this.run()
                }
            }
               
        },
        async getUserCheck(){
            this.userChecked = await this.$core.getHttp(`/api/register/usercheckin/?course=${this.course.course_class}&series=${this.id}`)
        },
        async openShheet(user) {
            this.userChoose = user
            this.sheet = true
        },
        async cancle() {
            await this.$core.deleteHttp(`/api/register/usercheckin/${this.userChoose.checkin.id}/`)
            await this.$web.alert(`ยกเลิกเรียบร้อย`)
            this.sheet = false
            this.run()
        },
        async switchClass(){
            await this.$core.putHttp(`/api/course/series-daily/${this.id}/`,{is_open_class:this.open})
           // await this.run();
        }
    }
}
</script>

<style>

</style>

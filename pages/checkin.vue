<template>
<div>
    <div class="p-6 flex flex-col">
        <div class="text-2xl xd">Check In</div>
        <div v-if="response" class="mt-6">
            <v-toolbar flat>
                <h2 class="text-xl ">{{course.name}}</h2>
                <v-spacer></v-spacer>
                <v-switch @change="switchClass()" color="success" v-model="course.is_open"></v-switch> 
            </v-toolbar>
            <div class="mt-2">
                <v-toolbar class="mt-2" color="transparent" flat v-for="vuser,i in users" :key="i" @click="openShheet(vuser)">
                    <v-avatar size="40">
                        <img :src="$url+vuser.user_image" alt="alt">
                    </v-avatar>
                    <div class="ml-2">
                        <h2 class="font-semibold">{{vuser.user_data}} </h2>
                        <span :class="(vuser.checkin)?`text-green-600`:`text-orange-600`">{{(vuser.checkin)?`เช็คชื่อเเล้ว`:`ยังไม่ได้เช็คชื่อ`}} </span>
                        <span class="text-red-500" v-if="vuser.missing">(ขาด)</span>
                    </div>
                </v-toolbar>
            </div>
        </div>
    </div>

    <v-bottom-sheet v-model="sheet">
        <v-list>
            <v-toolbar class="m-2" color="transparent" flat>
                <v-avatar size="40">
                    <img :src="$url+userChoose.user_image" alt="alt">
                </v-avatar>
                <h2 class="ml-2">{{userChoose.user_data}}</h2>
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
                <v-list-item-title>ไม่มาเข้าคลาส</v-list-item-title>
            </v-list-item>
            <v-list-item @click="cancle()" v-if="userChoose.checkin">
                <v-list-item-avatar>
                    <v-icon color="error">mdi-close-circle</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>ยกเลิก</v-list-item-title>
            </v-list-item>
        </v-list>
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
    },
    methods: {
        async run() {
            this.id = this.$route.query.id
            this.user = await Auth.getUser();
            this.course = await Course.getCourseById(this.id)
            this.getCheckInUser = await Course.getCheckInUser(this.id, this.today)
            let users = await Course.getUserinClass(this.id)
            this.users = _.map(users, (v) => {
                let user = _.find(this.getCheckInUser, (o) => {
                    console.log(o.user, v.user)
                    return o.user == v.user
                })
                if (user) {
                    v.missing = user.missing
                    v.checkin = true
                } else {
                    v.missing = false
                    v.checkin = false
                }
                return v
            })
            this.response = true
        },
        async checkIn(missing) {
            let checkin = await Course.checkInClass(this.userChoose.user, this.id, this.today, missing)
            if (checkin) {
                await Web.alert('Check In', 'success', 'Check In Success')
                this.userChoose = {}
                await this.run()
                this.sheet = false
            }
        },
        async openShheet(user) {
            this.userChoose = user
            this.sheet = true
        },
        async cancle() {
            let checkin = _.find(this.getCheckInUser, (o) => {
                return o.user == this.userChoose.user
            })
            if (checkin) {
                let cancle = await Course.unCheckInClass(checkin.id)
                if (cancle) {
                    await Web.alert('Cancle Check In', 'success', 'Cancle Check In Success')
                    this.userChoose = {}
                    await this.run()
                    this.sheet = false
                }
            }
        },
        async switchClass(){
            let check = await Web.confirm(`แน่ใจใช่ไหมที่จะ ${(this.course.is_open)?`เปิด`:`ปิด`} คลาสนี้`, ` ผู้ใช้งานจะเห็นคลาสนี้ในหน้าแรกว่ากำลัง ${(this.course.is_open)?`เปิด`:`ปิด`} อยู่`)
            if(check){
                let switchClass = await Core.putHttp(`/api/course/class/${this.course.id}/`,{ is_open:this.course.is_open })
                if(switchClass){
                    await Web.alert(`${(this.course.is_open)?`เปิด`:`ปิด`} คลาสสำเร็จแล้ว`, 'success')
                    await this.run();
                }
            }else{
                await this.run();
            }
        }
    }
}
</script>

<style>

</style>

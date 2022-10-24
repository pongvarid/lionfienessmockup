<template>
<div class="p-6 flex flex-col" v-if="response">
    <div class="text-2xl font-semibold">{{$l(`ปฏิทิน`,`Calendar`)}}</div>

    <v-tabs icons-and-text class="pt-4">
        <v-tab v-for="day,index in raws" :key="index">
            <div class="pt-8 pb-8 flex flex-col">
                <span class="font-bold capitalize">{{day.day_en}} </span>
                <span class="text-xs ">{{day.date_now}}</span>
            </div>
        </v-tab>
        <v-tab-item v-for="day,index in raws" :key="index" class="bg">
            <div>
                <v-card elevation="0" class="mt-4" v-for="course,j in day.data" :key="j">

                    <v-card-title primary-title>
                        <img :style="`border-color:${course.color_table}; border-width:6px; border-style: solid;`" v-if="course.course_image" class="w-20 h-20 rounded-full contain animate__animated animate__infinite infinite" :class="(course.is_open_class)?`animate__pulse`:``" :src="$url+course.course_image" alt="">
                        <v-avatar v-else size="80" color="blue" class="animate__animated animate__infinite infinite" :class="(course.is_open_class)?`animate__pulse`:``">
                            {{course.course_name}}
                        </v-avatar>
                        <div>
                            <h2 class="font-semibold ml-2">{{course.course_name}}</h2>
                            <div class="text-xs ml-2">
                                <v-icon size="10" class="mr-1">em em-alarm_clock</v-icon>{{course.time_data}}
                            </div>
                            <v-chip class="ml-2" small v-if="checkClass(course)">ลงทะเบียนแล้ว</v-chip>
                            <v-chip v-if="course.is_open_class" class="ml-2" small color="success">{{$l(`คลาสกำลังดำเนินอยู่`,`Class in starting`)}}.. </v-chip>
                        </div>
                    </v-card-title>
                    <v-card-text>
                       
                        <v-expansion-panels flat>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    <span class="font-semibold">{{$l(`รายละเอียด`,`Class Detail`)}}</span>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <div>
                                        <Core-Bar icon="em em-male-teacher" :head="$l(`ผู้สอน`,`Teacher`)" :txt="`Kru.${course.teacher_name}`"></Core-Bar>
                                        <!-- <Core-Bar icon="em em-alarm_clock" :head="$l(`เวลา`,`Start`)" :txt="course.time_data"></Core-Bar> -->
                                        <Core-Bar icon="em em-weight_lifter" :head="$l(`ที่นั่งที่เหลือ`,`Remain`)" :txt="course.remain"></Core-Bar>
                                        <!-- <Core-Bar icon="em em-memo" :head="$l(`ลงทะเบียน`,`Register`)" :txt="course.remain"></Core-Bar> -->
                                        <div v-if="course.remain > 0">
                                            <v-btn v-if="!checkClass(course)" @click="openClass(course)" depressed class="mt-3" block color="primary"><span class="capitalize">{{$l(`ลงทะเบียน`,`Register this Class`)}}</span></v-btn>
                                            <v-btn v-else @click="removeClass(course)" class="mt-3" block color="error">{{$l(`ยกเลิกการลงทะเบียน`,`Cancel Registration`)}}</v-btn>
                                        </div> 
                                    </div>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        <v-alert dense class="mt-3" type="error" v-if="!(course.remain > 0)">
                            {{$l(`คลาสนี้เต็มแล้ว`,`Class is full`)}}
                        </v-alert>
                    </v-card-text>
                </v-card>
            </div>
        </v-tab-item>
    </v-tabs>
    <v-bottom-sheet class="rounded" v-model="sheet" inset>
        <v-sheet class="text-center" style="z-index:9999;">
            <div class="my-3 pb-8" v-if="chooseClass">
                <div v-if="user && mytier">
                    <div class="p-2 flex flex-col items-center" v-if="chooseClass.status">
                        <h2 class="text-2xl font-semibold mt-4">{{chooseClass.course_name}}</h2>
                        <img v-if="chooseClass.course_image" class="mt-4 w-40 h-40 rounded-full contain animate__animated animate__infinite infinite animate__pulse" :src="$url+chooseClass.course_image" alt="">
                        <v-avatar v-else size="120" color="blue" class="mt-4 animate__animated animate__infinite infinite animate__pulse">
                            {{chooseClass.course_name}}
                        </v-avatar> <br>
                        <!-- <img class="w-60" src="@/assets/images/v2/002-workout.png" alt=""> -->
                        <v-btn @click="storeClass()" depressed class="m-4 " large block color="primary"><span class="capitalize text-base">{{$l(`ลงทะเบียนเข้าคลาสนี้`,`Register this class`)}}</span></v-btn>
                    </div>
                    <div class="p-2 flex flex-col items-center" v-else>
                        <img class="w-60 mt-2" src="@/assets/images/v3/016-rejected.png" alt="">
                        <h2 class="text-2xl font-semibold mt-4">{{$l(`จำนวนครั้งในการจองของคุณเต็มแล้ว`,`Your repetitions are full`)}}</h2>
                        <span>{{$l(`เพื่อให้ใช้งานระบบการจองต่อได้ กรุณาต่ออายุสมาชิก หรือ ติดต่อผู้ดูแลระบบ`,`In order to continue using the booking system Please renew your membership or contact the administrator.`)}}</span>
                        <v-btn @click="$router.push(`/account/`)" depressed class="m-6 " large block color="primary"><span class="capitalize text-base">{{$l(`ไปที่หน้าโปรไฟล์`,`Go to profile page`)}}</span></v-btn>

                    </div>
                </div>
                <div v-else>
                    <div class="p-2 flex flex-col items-center">
                        <img class="w-60 mt-2" src="@/assets/images/v3/012-vacancy.png" alt="">
                        <h2 class="text-2xl font-semibold mt-4">{{$l(`กรุณาเข้าสู่ระบบก่อน`,`Please login first`)}}</h2>
                        <span>{{$l(`เพื่อให้ใช้งานแอพพลิเคชันได้อย่างครอบคลุม กรุณาเข้าสู่ระบบ หรือ ลงทะเบียนเข้าใช้งานก่อน`,`In order to use the application comprehensively Please login or register first.`)}}</span>
                        <v-btn @click="$router.push(`/auth/login/`)" depressed class="m-6 " large block color="primary"><span class="capitalize text-base">{{$l(`เข้าสู่ระบบ หรือ ลงทะเบียน`,`Login or Register`)}}</span></v-btn>

                    </div>
                </div>

            </div> <br><br><br>
        </v-sheet>
    </v-bottom-sheet>
    <br><br><br><br> <br><br>
</div>
</template>

<script>
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
    data: () => ({
        day: 1,
        sheet: false,
        chooseClass: null,
        raws: [],
        user: null,
        mytier: null,
        response: false,

    }),
    async created() {
        try {
            await Auth.setUser();
        } catch (error) {
            
        }
        await this.run()
    },
    methods: {
        async run() {
            try {

                let res = await Core.getHttp(`/api/course/series/?is_active=true`)
                if (res.length > 0) {
                    let data = res[res.length - 1].data
                    this.raws = _.map(_.groupBy(data, 'days'), (value, key) => {
                        return {

                            days: key,
                            date_now: moment(value[value.length - 1].date_now).format('DD/MM/YYYY'),
                            day_en: value[value.length - 1].day_en,
                            day_th: value[value.length - 1].day_en,
                            data: _.orderBy(value, ['times'], ['asc'])
                        }
                    })
                }
                await this.getUser()
                this.response = true
            } catch (error) {
                console.log(error)
            }
        },
        async getUser(){
            try {
                this.user = await this.$auth.user
                this.mytier = await this.$auth.mytier
            } catch (error) {
                
            }
        },
        async openClass(data) {
            this.chooseClass = data
            if(this.user){
          
                this.chooseClass.status = (this.user.number_class > this.$auth.myhistoriesCount)
            }
      
            this.sheet = true

        },
        checkClass(data) {
            let check = _.find(this.$auth.myhistories, (r) => {
                return (r.user == this.user.id && r.course == data.course_class && r.diary == data.id)
            })
            if (check) {
                return true
            } else {
                return false
            }
        },
        async storeClass() {
            if (confirm(this.$l(`คุณแน่ใจใช่ไหม`, `Are you sure?`))) {
                let dateCount = this.$2date(moment(), this.chooseClass.date_now)
                console.log(dateCount)
                if (dateCount >= 3) {
                    let form = {
                        "detail": "",
                        "user": this.user.id,
                        "course": this.chooseClass.course_class,
                        "diary": this.chooseClass.id,
                        "bill": this.mytier.id
                    }
                    let store = await Core.postHttp(`/api/register/history/`, form)
                    if (store.id) {
                        alert(this.$l(`จองคลาสเรียบร้อยแล้ว`, `Booked successfully`))
                        let update = await Core.putHttp(`/api/course/series-daily/${this.chooseClass.id}/`, {
                            remain: this.chooseClass.remain - 1
                        })

                    } else {
                        alert(this.$l(`ไม่สามารถจองคลาสได้`, `Can't book class`))
                    }
                    await Auth.setUser();
                    await this.run()
                    this.sheet = false
                    this.chooseClass = null
                } else {
                    alert(this.$l(`ไม่สามารถจองได้ กรุณาจองล่วงหน้า 3 วัน`, `Can not book. Please book in advance 3 days`))
                }

            }
        },

        async removeClass(data) {
            let dateNow = moment()
            let dateCount = this.$2date(dateNow, moment(`${data.date_now} ${data.time_data}:00`), 'hours')
            if (dateCount >= 3) {
                if (confirm(this.$l(`คุณแน่ใจใช่ไหม`, `Are you sure?`))) {
                    let course = _.find(this.$auth.myhistories, (r) => {
                        return (r.user == this.user.id && r.course == data.course_class && r.diary == data.id)
                    })
                    let res = await Core.deleteHttp(`/api/register/history/${course.id}/`)
                    if(res){
                        let update = await Core.putHttp(`/api/course/series-daily/${data.id}/`, {
                            remain: data.remain + 1
                        })

                    }
                    alert(this.$l(`ยกเลิกคลาสเรียบร้อยแล้ว`, `Cancel class successfully`))
                    await Auth.setUser();
                    await this.run()
                }
            } else {
                alert(this.$l(`ไม่สามารถยกเลิกได้ กรุณายกเลิกล่วงหน้า 3 ชั่วโมง`, `Can not cancel. Please cancel in advance 3 hours`))
            }
        },

    }
}
</script>

<style>

</style>

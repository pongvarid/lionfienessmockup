<template>
<div>
    <v-toolbar dark>
        <v-btn icon @click="$router.go(-1)">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{$l(`ปฏิทิน`,`Calendar`)}}</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
    <div class="p-6 flex flex-col " v-if="response">

        <v-select @change="changeWeek()" :items="allweek" item-text="start_week_label" return-object v-model="nowWeek" :label="$l(`ประจำสัปดาห์`,`Choose Week`)"></v-select>
        <v-tabs icons-and-text class="pt-4">
            <v-tab v-for="day,index in raws" :key="index">
                <div class="pt-8 pb-8 flex flex-col">
                    <span class="font-bold capitalize">{{day.day_en}} </span>
                    <span class="text-xs ">{{day.date_now}}</span>
                </div>
            </v-tab>
            <v-tab-item v-for="day,index in raws" :key="index">
                <div>
                    <v-card outlined elevation="0" class="mt-4" v-for="course,j in day.data" :key="j">

                        <v-card-title primary-title @click="$router.push('/class/'+`${course.id}`)">
                            <img :style="`border-color:${course.color_table}; border-width:3px; border-style: solid;`" v-if="course.course_image" class="w-20 h-20 rounded-full contain animate__animated animate__infinite infinite" :class="(course.is_open_class)?`animate__pulse`:``" :src="$url+course.course_image" alt="">
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
                            <div>
                                <Core-Bar icon="em em-male-teacher" :head="$l(`ผู้สอน`,`Teacher`)" :txt="`Kru.${course.teacher_name}`"></Core-Bar>
                                <!-- <Core-Bar icon="em em-alarm_clock" :head="$l(`เวลา`,`Start`)" :txt="course.time_data"></Core-Bar> -->
                                <Core-Bar icon="em em-weight_lifter" :head="$l(`ที่นั่งที่เหลือ`,`Remain`)" :txt="course.remain"></Core-Bar>
                                <!-- <Core-Bar icon="em em-memo" :head="$l(`ลงทะเบียน`,`Register`)" :txt="course.remain"></Core-Bar> -->
                            </div>
                            <v-alert dense class="mt-3" type="error" v-if="!(course.remain > 0)">
                                {{$l(`คลาสนี้เต็มแล้ว`,`Class is full`)}}
                            </v-alert>
                            <div v-if="user">
                                <div v-if="mytier">

                                    <div v-if="checkDate(course)">
                                        <div v-if="course.remain > 0">
                                            <div  >
                                                <v-btn v-if="!checkClass(course) && (inMonth < maxMonth)" @click="register(course)" depressed class="mt-3" block color="primary"><span class="capitalize">{{$l(`ลงทะเบียน`,`Register this Class`)}}</span></v-btn>
                                                <v-btn depressed v-if="checkClass(course)" @click="unregister(course)" class="mt-3" block color="error">{{$l(`ยกเลิกการลงทะเบียน`,`Cancel Registration`)}}</v-btn>

                                            </div>
                                            <div v-if="!checkClass(course) && !(inMonth < maxMonth)">
                                                <center class="mt-2">
                                                    <span class="text-orange-600 font-semibold">
                                                        <v-icon class="mr-2" color="orange">mdi-information</v-icon>{{ $l("จำนวนการจองคลาสเกินกำหนดแล้ว","The number of class reservations has been exceeded.") }}
                                                    </span>
                                                </center>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <center class="mt-2"> <span class="text-orange-600 font-semibold">
                                                <v-icon class="mr-2" color="orange">mdi-information</v-icon>{{ $l("คลาสนี้ผ่านมาแล้ว","This class has passed") }}
                                            </span></center>
                                    </div>

                                </div>
                                <div v-else>
                                    <center class="mt-2">
                                        <span class="text-orange-600 font-semibold">
                                            <v-icon class="mr-2" color="orange">mdi-information</v-icon>{{ $l("ยังไม่ได้สมัคร Package ใช้งาน Fitness","Haven't signed up for a fitness package yet.") }}
                                        </span>
                                    </center>
                                </div>
                            </div>

                        </v-card-text>
                    </v-card>
                </div>
            </v-tab-item>
        </v-tabs>

        <br><br><br><br> <br><br>
    </div>
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
import {
    User
} from '@/vuexes/user'
import {
    Course
} from '@/vuexes/course'
export default {
    data: () => ({
        day: 1,
        sheet: false,
        chooseClass: null,
        raws: [],
        user: null,
        mytier: null,
        response: false,
        nowWeek: {},
        allweek: [],
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
                await this.getUser()
                await User.getRegister(this.user.id)
                await this.getNowWeek()
            } catch (error) {

            }

            await this.getAllWeek()
            this.response = true
        },
        async getNowWeek() {
            try {
                await User.getRegister(this.user.id)
                await User.getRegisterMonth(this.user.id);
                let res = await Core.getHttp(`/api/course/series/?is_active=true`)
                if (res.length > 0) {
                    let dataWeek = res[res.length - 1]
                    dataWeek.start_week_label = moment(dataWeek.start_week).format('DD/MM/YYYY')
                    this.nowWeek = dataWeek
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
                this.response = true
            }
        },
        async getAllWeek() {
            try {

                let res = await Core.getHttp(`/api/course/series/`)
                this.allweek = res
                this.allweek = _.orderBy(this.allweek, ['start_week'], ['desc'])
                this.allweek = _.map(this.allweek, (r) => {
                    return {
                        ...r,
                        start_week_label: moment(r.start_week).format('DD/MM/YYYY'),
                    }
                })
                this.nowWeek = this.allweek[0]
                await this.changeWeek()

            } catch (error) {
                console.log(error)
            }
        },
        async changeWeek() {
            try {
                let dataWeek = this.nowWeek
                console.log(dataWeek)
                dataWeek.start_week_label = moment(dataWeek.start_week).format('DD/MM/YYYY')
                let data = dataWeek.data
                this.raws = _.map(_.groupBy(data, 'days'), (value, key) => {
                    return {
                        days: key,
                        date_now: moment(value[value.length - 1].date_now).format('DD/MM/YYYY'),
                        day_en: value[value.length - 1].day_en,
                        day_th: value[value.length - 1].day_en,
                        data: _.orderBy(value, ['times'], ['asc'])
                    }
                })
                await this.getUser()
            } catch (error) {

            }
        },
        async getUser() {
            try {
                this.user = await this.$auth.user
                this.mytier = await this.$auth.mytier
            } catch (error) {

            }
        },

        async register(series) {
            let nowWeek = this.nowWeek
            let dateCount = this.$2date(moment().format('YYYY-MM-DD'), series.date_now)
            if (dateCount <= 3) {
                let registerClass = await User.registerClass(this.user.id, series.course_class, series.id)
                if (registerClass.id) {
                    await Course.cutSeriesClass(series.id)
                    await Web.alert(this.$l(`จองคลาสเรียบร้อยแล้ว`, `Booked successfully`))
                    await this.getNowWeek();
                } else if (registerClass.type == 'MEINCLASS') {
                    await Web.alert(this.$l(`ลงทะเบียนไปแล้ว`, `You are in class now.`), 'info')
                } else if (registerClass.type == 'HASCLASS') {
                    await Web.alert(this.$l(`คลาสนี้เต็มแล้ว`, `Class is full`), 'info')
                } else {
                    await Web.alert(this.$l(`เกิดข้อผิดพลาด`, `Error`), 'error', JSON.stringify(registerClass.error))
                }
            } else {
                await Web.alert(this.$l(`ไม่สามารถจองได้ กรุณาจองล่วงหน้า 3 วัน`, `Can not book. Please book in advance 3 days`), 'error')
            }
            this.nowWeek = nowWeek
            await this.changeWeek()
        },
        async unregister(series) {
            let nowWeek = this.nowWeek
            let check = await Web.confirm(this.$l(`ยืนยันการยกเลิกคลาส`, `Confirm to cancel class`))
            if (check) {
                let dateCount = this.$2date(moment(), moment(`${series.date_now} ${series.time_data}:00`), 'hours')
                if (dateCount >= 3) {
                    await User.getRegister(this.user.id)
                    let courseRegister = _.find(User.listRegister, (r) => {
                        return (r.user == this.user.id && r.series == series.id)
                    })
                    await User.unRegisterClass(this.user.id, courseRegister.id)
                    await Course.restoreSeriesClass(series.id)
                    await User.logUnRegisterClass(this.user.id, series.course_class)
                    await this.getNowWeek();
                    await Web.alert(this.$l(`ยกเลิกคลาสเรียบร้อยแล้ว`, `Cancel class successfully`))
                } else {
                    await Web.alert(this.$l(`ไม่สามารถยกเลิกได้ กรุณายกเลิกล่วงหน้า 3 ชั่วโมง`, `Can not cancel. Please cancel in advance 3 hours`, 'error'))
                }
            }
            this.nowWeek = nowWeek
            await this.changeWeek()
        },
        checkClass(series) {
            let check = _.find(User.listRegister, (r) => {
                return (r.user == this.user.id && r.course == series.course_class && r.series == series.id)
            })
            if (check) {
                return true
            } else {
                return false
            }
        },
        checkDate(series) {
            let dateCount = this.$2date(moment(), moment(`${series.date_now}`), 'days')
            console.log(dateCount)
            if (dateCount >= 0) {
                return true
            } else {
                return false
            }
        },

    },
    computed: {
        maxMonth() {
            try {
                return Number(Auth.setting.max_month)
            } catch (error) {
                return 0
            }
        },
        inMonth() {
            try {
                return Number(User.countRegisterMonth)
            } catch (error) {
                return 0
            }
        },
    }
}
</script>

<style>

</style>

<template>
<div>
    <v-toolbar dark>
        <v-btn icon @click="$router.go(-1)">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{$l(`ปฏิทิน`,`Calendar`)}}</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
    <div class="p-6 flex flex-col bgtab" v-if="response"> 
        <v-select @change="changeWeek()" :items="allweek" item-text="start_week_label" return-object v-model="nowWeek" :label="$l(`ประจำสัปดาห์`,`Choose Week`)"></v-select>
        <v-tabs icons-and-text  >
            <v-tab v-for="day,index in raws" :key="index">
                <div class="pt-8 pb-8 flex flex-col">
                    <span class="font-bold capitalize">{{day.day_en}} </span>
                    <span class="text-xs ">{{day.date_now}}</span>
                </div>
            </v-tab>
            <v-tab-item v-for="day,index in raws" :key="index">
                <div class="bgtab">
                    <v-card outlined elevation="0" class="mt-4" v-for="course,j in day.data" :key="j">

                        <v-card-title class="bgcard" primary-title @click="$router.push('/class/'+`${course.id}`)">
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
                                    <div v-if="!course.is_open_class">
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
                                                </span>
                                            </center>
                                        </div>
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
.bgtab{
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='568' height='1080' preserveAspectRatio='none' viewBox='0 0 568 1080'%3e%3cg mask='url(%26quot%3b%23SvgjsMask13382%26quot%3b)' fill='none'%3e%3cpath d='M471.52 111.65L466.83 123.57 454.18 121.61 449.49 133.52 436.83 131.57 432.14 143.48 419.49 141.52' stroke='rgba(3%2c 123%2c 11%2c 0.4)' stroke-width='1.36' stroke-dasharray='4%2c 4'%3e%3c/path%3e%3cpath d='M259.53 854.64a5.6 5.6 0 1 0-11.17 0.71 5.6 5.6 0 1 0 11.17-0.71zM243.56 855.66a5.6 5.6 0 1 0-11.17 0.71 5.6 5.6 0 1 0 11.17-0.71zM227.6 856.67a5.6 5.6 0 1 0-11.18 0.71 5.6 5.6 0 1 0 11.18-0.71zM211.63 857.69a5.6 5.6 0 1 0-11.18 0.71 5.6 5.6 0 1 0 11.18-0.71zM290.45 836.64a5.6 5.6 0 1 0-11.18 0.71 5.6 5.6 0 1 0 11.18-0.71zM274.48 837.66a5.6 5.6 0 1 0-11.17 0.71 5.6 5.6 0 1 0 11.17-0.71zM258.52 838.67a5.6 5.6 0 1 0-11.18 0.71 5.6 5.6 0 1 0 11.18-0.71zM242.55 839.69a5.6 5.6 0 1 0-11.18 0.71 5.6 5.6 0 1 0 11.18-0.71zM321.37 818.64a5.6 5.6 0 1 0-11.18 0.71 5.6 5.6 0 1 0 11.18-0.71zM305.4 819.66a5.6 5.6 0 1 0-11.17 0.71 5.6 5.6 0 1 0 11.17-0.71zM289.44 820.67a5.6 5.6 0 1 0-11.18 0.72 5.6 5.6 0 1 0 11.18-0.72zM273.47 821.69a5.6 5.6 0 1 0-11.18 0.71 5.6 5.6 0 1 0 11.18-0.71z' stroke='rgba(3%2c 123%2c 11%2c 0.4)' stroke-width='1' stroke-dasharray='2%2c 2'%3e%3c/path%3e%3cpath d='M520.69 564.75 L505.15 550.7099999999999L498.83752088808257 571.8124791119175z' stroke='rgba(211%2c 183%2c 20%2c 0.36)' stroke-width='2.88' stroke-dasharray='4%2c 4'%3e%3c/path%3e%3cpath d='M100.51 89.05a5.6 5.6 0 1 0-8.21-7.61 5.6 5.6 0 1 0 8.21 7.61zM88.78 78.17a5.6 5.6 0 1 0-8.21-7.61 5.6 5.6 0 1 0 8.21 7.61zM77.04 67.3a5.6 5.6 0 1 0-8.21-7.62 5.6 5.6 0 1 0 8.21 7.62zM65.31 56.42a5.6 5.6 0 1 0-8.21-7.61 5.6 5.6 0 1 0 8.21 7.61zM134.86 99.07a5.6 5.6 0 1 0-8.22-7.61 5.6 5.6 0 1 0 8.22 7.61zM123.12 88.19a5.6 5.6 0 1 0-8.21-7.61 5.6 5.6 0 1 0 8.21 7.61zM111.39 77.32a5.6 5.6 0 1 0-8.21-7.62 5.6 5.6 0 1 0 8.21 7.62zM99.66 66.44a5.6 5.6 0 1 0-8.22-7.61 5.6 5.6 0 1 0 8.22 7.61z' stroke='rgba(3%2c 123%2c 11%2c 0.4)' stroke-width='2.84' stroke-dasharray='3%2c 2'%3e%3c/path%3e%3cpath d='M155.32 534.74 L153.97 481.42L178.26412244190362 484.4608775580964z' stroke='rgba(231%2c 54%2c 53%2c 0.42)' stroke-width='2.52' stroke-dasharray='2%2c 2'%3e%3c/path%3e%3crect width='383.03999999999996' height='383.03999999999996' clip-path='url(%26quot%3b%23SvgjsClipPath13383%26quot%3b)' x='219.04' y='-160.48' fill='url(%23SvgjsPattern13384)' transform='rotate(325.37%2c 410.56%2c 31.04)'%3e%3c/rect%3e%3crect width='66.8' height='66.8' clip-path='url(%26quot%3b%23SvgjsClipPath13385%26quot%3b)' x='453.1' y='473.51' fill='url(%23SvgjsPattern13386)' transform='rotate(190.58%2c 486.5%2c 506.91)'%3e%3c/rect%3e%3crect width='60' height='60' clip-path='url(%26quot%3b%23SvgjsClipPath13387%26quot%3b)' x='301.35' y='615.32' fill='url(%23SvgjsPattern13388)' transform='rotate(250.73%2c 331.35%2c 645.32)'%3e%3c/rect%3e%3crect width='347.76' height='347.76' clip-path='url(%26quot%3b%23SvgjsClipPath13389%26quot%3b)' x='326.38' y='79.48' fill='url(%23SvgjsPattern13390)' transform='rotate(113.95%2c 500.26%2c 253.36)'%3e%3c/rect%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask13382'%3e%3crect width='568' height='1080' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cpattern x='0' y='0' width='13.68' height='13.68' patternUnits='userSpaceOnUse' id='SvgjsPattern13384'%3e%3cpath d='M0 13.68L6.84 0L13.68 13.68' stroke='rgba(231%2c 54%2c 53%2c 0.42)' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath13383'%3e%3ccircle r='95.75999999999999' cx='410.56' cy='31.04'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6.68' height='6.68' patternUnits='userSpaceOnUse' id='SvgjsPattern13386'%3e%3cpath d='M0 6.68L3.34 0L6.68 6.68' stroke='rgba(126%2c 135%2c 231%2c 0.43)' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath13385'%3e%3ccircle r='16.7' cx='486.5' cy='506.91'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='60' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern13388'%3e%3crect width='60' height='3' x='0' y='0' fill='rgba(211%2c 183%2c 20%2c 0.36)'%3e%3c/rect%3e%3crect width='60' height='3' x='0' y='3' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath13387'%3e%3ccircle r='15' cx='331.35' cy='645.32'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='7.56' height='7.56' patternUnits='userSpaceOnUse' id='SvgjsPattern13390'%3e%3cpath d='M3.78 1L3.78 6.56M1 3.78L6.56 3.78' stroke='rgba(3%2c 123%2c 11%2c 0.4)' fill='none' stroke-width='2.35'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath13389'%3e%3ccircle r='86.94' cx='500.26' cy='253.36'%3e%3c/circle%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
    background-size: cover;
}
.bgcard{
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1002%26quot%3b)' fill='none'%3e%3cpath d='M20.24 196.74L85.19 234.24L85.19 309.24L20.24 346.74L-44.71 309.24L-44.71 234.24zM215.1 84.24L280.06 121.74L280.06 196.74L215.1 234.24L150.15 196.74L150.15 121.74zM215.1 309.24L280.06 346.74L280.06 421.74L215.1 459.24L150.15 421.74L150.15 346.74zM345.01 534.24L409.96 571.74L409.96 646.74L345.01 684.24L280.06 646.74L280.06 571.74zM409.96 -28.26L474.92 9.24L474.92 84.24L409.96 121.74L345.01 84.24L345.01 9.24zM474.92 309.24L539.87 346.74L539.87 421.74L474.92 459.24L409.96 421.74L409.96 346.74zM409.96 421.74L474.92 459.24L474.92 534.24L409.96 571.74L345.01 534.24L345.01 459.24zM539.87 421.74L604.82 459.24L604.82 534.24L539.87 571.74L474.92 534.24L474.92 459.24zM604.82 534.24L669.78 571.74L669.78 646.74L604.82 684.24L539.87 646.74L539.87 571.74zM669.78 196.74L734.73 234.24L734.73 309.24L669.78 346.74L604.82 309.24L604.82 234.24zM799.68 -28.26L864.64 9.24L864.64 84.24L799.68 121.74L734.73 84.24L734.73 9.24zM864.64 309.24L929.59 346.74L929.59 421.74L864.64 459.24L799.68 421.74L799.68 346.74zM799.68 421.74L864.64 459.24L864.64 534.24L799.68 571.74L734.73 534.24L734.73 459.24zM864.64 534.24L929.59 571.74L929.59 646.74L864.64 684.24L799.68 646.74L799.68 571.74zM929.59 421.74L994.55 459.24L994.55 534.24L929.59 571.74L864.64 534.24L864.64 459.24zM1124.45 84.24L1189.41 121.74L1189.41 196.74L1124.45 234.24L1059.5 196.74L1059.5 121.74zM1059.5 421.74L1124.45 459.24L1124.45 534.24L1059.5 571.74L994.55 534.24L994.55 459.24zM1124.45 534.24L1189.41 571.74L1189.41 646.74L1124.45 684.24L1059.5 646.74L1059.5 571.74zM1254.36 534.24L1319.31 571.74L1319.31 646.74L1254.36 684.24L1189.41 646.74L1189.41 571.74zM1384.27 309.24L1449.22 346.74L1449.22 421.74L1384.27 459.24L1319.32 421.74L1319.32 346.74zM1384.27 534.24L1449.22 571.74L1449.22 646.74L1384.27 684.24L1319.32 646.74L1319.32 571.74zM1514.18 84.24L1579.13 121.74L1579.13 196.74L1514.18 234.24L1449.22 196.74L1449.22 121.74z' stroke='rgba(186%2c 180%2c 142%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M12.74 196.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM77.69 234.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM77.69 309.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM12.74 346.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM-52.21 309.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM-52.21 234.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM207.6 84.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM272.56 121.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM272.56 196.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM207.6 234.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM142.65 196.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM142.65 121.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM207.6 309.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM272.56 346.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM272.56 421.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM207.6 459.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM142.65 421.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM142.65 346.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM337.51 534.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM402.46 571.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM402.46 646.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM337.51 684.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM272.56 646.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM272.56 571.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM402.46 -28.26 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM467.42 9.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM467.42 84.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM402.46 121.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM337.51 84.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM337.51 9.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM467.42 309.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM532.37 346.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM532.37 421.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM467.42 459.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM402.46 421.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM402.46 346.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM467.42 534.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM337.51 459.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM597.32 459.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM597.32 534.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM532.37 571.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM662.28 571.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM662.28 646.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM597.32 684.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM532.37 646.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM662.28 196.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM727.23 234.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM727.23 309.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM662.28 346.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM597.32 309.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM597.32 234.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM792.18 -28.26 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM857.14 9.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM857.14 84.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM792.18 121.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM727.23 84.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM727.23 9.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM857.14 309.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM922.09 346.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM922.09 421.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM857.14 459.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM792.18 421.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM792.18 346.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM857.14 534.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM792.18 571.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM727.23 534.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM727.23 459.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM922.09 571.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM922.09 646.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM857.14 684.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM792.18 646.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM987.05 459.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM987.05 534.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1116.95 84.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1181.91 121.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1181.91 196.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1116.95 234.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1052 196.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1052 121.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1052 421.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1116.95 459.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1116.95 534.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1052 571.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1181.91 571.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1181.91 646.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1116.95 684.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1052 646.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1246.86 534.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1311.81 571.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1311.81 646.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1246.86 684.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1376.77 309.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1441.72 346.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1441.72 421.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1376.77 459.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1311.82 421.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1311.82 346.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1376.77 534.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1441.72 571.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1441.72 646.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1376.77 684.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1311.82 646.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1311.82 571.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1506.68 84.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1571.63 121.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1571.63 196.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1506.68 234.24 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1441.72 196.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1441.72 121.74 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0z' fill='rgba(186%2c 180%2c 142%2c 1)'%3e%3c/path%3e%3cpath d='M3.39 -11.98L46.69 13.02L46.69 63.02L3.39 88.02L-39.91 63.02L-39.91 13.02zM46.69 63.02L90 88.02L90 138.02L46.69 163.02L3.39 138.02L3.39 88.02zM46.69 513.02L90 538.02L90 588.02L46.69 613.02L3.39 588.02L3.39 538.02zM133.3 513.02L176.6 538.02L176.6 588.02L133.3 613.02L90 588.02L90 538.02zM219.9 513.02L263.2 538.02L263.2 588.02L219.9 613.02L176.6 588.02L176.6 538.02zM306.51 513.02L349.81 538.02L349.81 588.02L306.51 613.02L263.2 588.02L263.2 538.02zM349.81 438.02L393.11 463.02L393.11 513.02L349.81 538.02L306.51 513.02L306.51 463.02zM393.11 513.02L436.42 538.02L436.42 588.02L393.11 613.02L349.81 588.02L349.81 538.02zM436.42 138.02L479.72 163.02L479.72 213.02L436.42 238.02L393.11 213.02L393.11 163.02zM479.72 363.02L523.02 388.02L523.02 438.02L479.72 463.02L436.42 438.02L436.42 388.02zM566.32 63.02L609.63 88.02L609.63 138.02L566.32 163.02L523.02 138.02L523.02 88.02zM523.02 138.02L566.32 163.02L566.32 213.02L523.02 238.02L479.72 213.02L479.72 163.02zM523.02 288.02L566.32 313.02L566.32 363.02L523.02 388.02L479.72 363.02L479.72 313.02zM696.23 -11.98L739.53 13.02L739.53 63.02L696.23 88.02L652.93 63.02L652.93 13.02zM696.23 138.02L739.53 163.02L739.53 213.02L696.23 238.02L652.93 213.02L652.93 163.02zM739.53 213.02L782.84 238.02L782.84 288.02L739.53 313.02L696.23 288.02L696.23 238.02zM739.53 363.02L782.84 388.02L782.84 438.02L739.53 463.02L696.23 438.02L696.23 388.02zM696.23 438.02L739.53 463.02L739.53 513.02L696.23 538.02L652.93 513.02L652.93 463.02zM869.44 438.02L912.74 463.02L912.74 513.02L869.44 538.02L826.14 513.02L826.14 463.02zM912.74 513.02L956.05 538.02L956.05 588.02L912.74 613.02L869.44 588.02L869.44 538.02zM999.35 213.02L1042.65 238.02L1042.65 288.02L999.35 313.02L956.05 288.02L956.05 238.02zM1042.65 -11.98L1085.95 13.02L1085.95 63.02L1042.65 88.02L999.35 63.02L999.35 13.02zM1042.65 138.02L1085.95 163.02L1085.95 213.02L1042.65 238.02L999.35 213.02L999.35 163.02zM1085.95 213.02L1129.26 238.02L1129.26 288.02L1085.95 313.02L1042.65 288.02L1042.65 238.02zM1129.26 -11.98L1172.56 13.02L1172.56 63.02L1129.26 88.02L1085.95 63.02L1085.95 13.02zM1129.26 288.02L1172.56 313.02L1172.56 363.02L1129.26 388.02L1085.95 363.02L1085.95 313.02zM1215.86 138.02L1259.16 163.02L1259.16 213.02L1215.86 238.02L1172.56 213.02L1172.56 163.02zM1302.47 -11.98L1345.77 13.02L1345.77 63.02L1302.47 88.02L1259.16 63.02L1259.16 13.02zM1345.77 63.02L1389.07 88.02L1389.07 138.02L1345.77 163.02L1302.47 138.02L1302.47 88.02zM1389.07 -11.98L1432.37 13.02L1432.37 63.02L1389.07 88.02L1345.77 63.02L1345.77 13.02zM1432.37 63.02L1475.68 88.02L1475.68 138.02L1432.37 163.02L1389.07 138.02L1389.07 88.02zM1389.07 138.02L1432.37 163.02L1432.37 213.02L1389.07 238.02L1345.77 213.02L1345.77 163.02z' stroke='url(%23SvgjsLinearGradient1003)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1002'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='0' y1='280' x2='1440' y2='280' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1003'%3e%3cstop stop-color='rgba(98%2c 77%2c 22%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(204%2c 129%2c 21%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
    background-size: cover;
}
</style>

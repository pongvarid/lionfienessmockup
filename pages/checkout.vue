<template>
    <div class="p-6 flex flex-col" v-if="response">
        <div class="text-2xl font-semibold">{{$l(`เช็คชื่อ`,`Checkin`)}}</div>
    
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
                                         
                                            <v-btn @click="$router.push(`/checkin/?id=${course.id}`)" block class="mt-4" color="success">เช็คชื่อ</v-btn>
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
            await Auth.setUser();
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
                    this.user = await this.$auth.user
                    this.mytier = await this.$auth.mytier
                    this.response = true
                } catch (error) {
                    console.log(error)
                }
            },
         
    
        }
    }
    </script>
    
    <style>
    
    </style>
    
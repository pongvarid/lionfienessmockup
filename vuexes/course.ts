import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import axios from '@/plugins/axios'
import _ from "lodash"
import moment from 'moment'
import Vue from 'vue';
import { Core } from '@/vuexes/core'
import { Web } from '@/vuexes/web'

@Module({ generateMutationSetters: true })
class CourseModule extends VuexModule {
    public classes: any = []
    public openClasses: any = []
    public myClass: any = []
    public myCheckIn: any = []

    public async getUserinClass(classId: number) { 
        let res = await Core.getHttp(`/api/register/registerclass/?course=${classId}&user__in_class=true`)
        return res
    } 
    public async getCourseById(id: number) {
        let classes = await Core.getHttp(`/api/course/class/${id}/`) 
        return classes
    }
    public async getClass() {
        let classes = await Core.getHttp(`/api/course/class/?is_active=true`)
        this.classes = classes
        return classes
    }
    public async getOpenClass() {
        let classes = await Core.getHttp(`/api/course/class/?is_active=true&is_open=true`)
        this.openClasses = classes
        return classes
    }  
    public async getMyClass(userId: number) {
        let classes = await Core.getHttp(`/api/register/history/?user=${userId}&is_active=true`)
        this.myClass = classes
    } 
    public async registerClass(userId: number, classId: number) {
        let data = {
            user: Number(userId),
            course: Number(classId),
            is_active: true
        }
        let res = await Core.postHttp(`/api/register/registerclass/`, data)
        await this.getMyClass(userId)
        await this.getMyCheckIn(userId)
        return res
    } 
    public async unRegisterClass(userId: number, id: number) {
        let data = {
            is_active: false
        }
        let res = await Core.putHttp(`/api/register/registerclass/${id}/`, data)
        await this.getMyClass(userId)
        return res
    } 
    public async fundingClass(userId: number, classId: number) {
        try {
            let res = await Core.getHttp(`/api/register/registerclass/?user=${userId}&course=${classId}&is_active=true`)
            return res.length == 0 ? true : false
        } catch (error) {
            return false
        }
    } 
    public async checkInClass(userId: number, classId: number,date:String ,missing: boolean = false, bypass: boolean = false)  { 
        let data = {
            user: Number(userId),
            course: Number(classId),
            missing: missing,
            bypass: bypass,
            date:date
        }
        let res = await Core.postHttp(`/api/register/usercheckin/`, data) 
        return res
    } 
    public async unCheckInClass(id: number) { 
        let res = await Core.deleteHttp(`/api/register/usercheckin/${id}/`) 
        return res
    } 
    public async getMyCheckIn(userId: number) {
        let classes = await Core.getHttp(`/api/register/usercheckin/?user=${userId}`)
        this.myCheckIn = classes
        return classes
    } 
    public async getCheckInUser(classId: number,date_checkin: string) {
        let classes = await Core.getHttp(`/api/register/usercheckin/?user=&course=${classId}&date=${date_checkin}`)
        return classes
    } 
    public async checkBand(userId: number,) {
        let bands = await Core.getHttp(`/api/register/usercheckin/?user=${userId}&missing=true&bypass=false`)
        return (bands.length > 3) ? true : false
    }

    /***ตัดจำนวนที่นั่งใน Series ****/
    public async cutSeriesClass(id: number) {
        let series = await Core.getHttp(`/api/course/series-daily/${id}/`)
        let update = await Core.putHttp(`/api/course/series-daily/${id}/`, {
            remain: series.remain - 1
        })
    }
    /***คืนจำนวนที่นั่งใน Series ****/
    public async restoreSeriesClass(id: number) {
        let series = await Core.getHttp(`/api/course/series-daily/${id}/`)
        let update = await Core.putHttp(`/api/course/series-daily/${id}/`, {
            remain: series.remain + 1
        })
    }






}

import store from "@/vuexes"
export const Course = new CourseModule({ store, name: "Course" })


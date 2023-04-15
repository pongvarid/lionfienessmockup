import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import axios from '@/plugins/axios'
import _ from "lodash"
import moment from 'moment'
import Vue from 'vue';
import { Core } from '@/vuexes/core'
import { Web } from '@/vuexes/web'

@Module({ generateMutationSetters: true })
class UserModule extends VuexModule {
   
    public listRegister:any = [] // รายการลงทะเบียนเข้าคลาส
    public countRegister:number = 0 // จำนวนรายการลงทะเบียนเข้าคลาส
    public countRegisterMonth:number = 0 // จำนวนรายการลงทะเบียนเข้าคลาสเดือนนี้
    
    /*** [GET] Start All */
    public async init(userId: number) {
         await this.getRegister(userId)
         await this.getRegisterMonth(userId)
    } 
    /*** [GET] ดูข้อมูลการลงทะเบียนเข้าคลาส */
    public async getRegister(userId: number) {
        let res = await Core.getHttp(`/api/register/registerclass/?user=${userId}&is_active=true`)
        this.listRegister = res
        this.countRegister = res.length
        return { list: res, count: res.length}
    } 
    /*** [GET] ดูข้อมูลการลงทะเบียนเข้าคลาสเดือนนี้ */
    public async getRegisterMonth(userId: number) {
        let res = await Core.getHttp(`/api/register/registerclass/?user=${userId}&is_active=true&date__month=${moment().month() + 1}&date__year=${moment().year()}`)
        this.countRegisterMonth = res.length
        return { list: res, count: res.length}
    }
    /*** [GET] ดูข้อมูลการลงทะเบียนเข้าคลาสเดือนนี้ */
    public async checkMeInClass(userId: number, classId: number) {
        let res = await Core.getHttp(`/api/register/registerclass/?user=${userId}&course=${classId}&is_active=true`)
        return res.length == 0 ? true : false
    }
    /*** [GET] ตรวจสอบข้อมูลคลาส */
    public async getHasClass(seriesId: number) {
        let series = await Core.getHttp(`/api/course/series-daily/${seriesId}/`) 
        return series.remain > 0 && Vue.prototype.$2date(moment().format('YYYY-MM-DD'), series.date_now)<= 3 ? true : false
    }
    /*** ลงทะเบียนเข้าคลาส
     * MEINCLASS = คุณได้ลงทะเบียนเข้าคลาสนี้แล้ว
     * HASCLASS = คลาสนี้เต็มแล้ว
     * SUCCESS = ลงทะเบียนเข้าคลาสสำเร็จ
     */
    public async registerClass(userId: number, classId: number, seriesId: number) {
        try {
            let hasClass = await this.getHasClass(seriesId)
            let checkMeInClass = await this.checkMeInClass(userId, classId) 
            if(hasClass && checkMeInClass) {
                let data = {
                    user: Number(userId),
                    course: Number(classId),
                    series: Number(seriesId),
                    is_active: true
                }
                let res = await Core.postHttp(`/api/register/registerclass/`, data)
                await this.init(userId)
                return {...res, status: true, type: 'SUCCESS'}
            }else if(!hasClass) {
                return {status: false, type: 'HASCLASS'}
            }else if(!checkMeInClass) {
                return {status: false, type: 'MEINCLASS'}
            } 
        } catch (error) {
            console.log("ERROR",error)
            return {status: false, type: 'ERROR', error: error}
        }
    }
    /*** ยกเลิกลงทะเบียนเข้าคลาส */
    public async unRegisterClass(userId: number, id: number) {
        let del = await Core.deleteHttp(`/api/register/registerclass/${id}/`) 
        return await this.getRegister(userId)
    } 
    /*** Log ยกเลิกลงทะเบียนเข้าคลาส */
    public async logUnRegisterClass(userId: number, id: number) {
        let log = await Core.postHttp(`/api/register/cancelclass/`, {user: userId, course: id, date: moment().format('YYYY-MM-DD')})
        return log
    }
 
}

import store from "@/vuexes"
export const User = new UserModule({ store, name: "User" })


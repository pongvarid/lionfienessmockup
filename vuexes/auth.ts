import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";

import _ from "lodash"
import { Core } from '@/vuexes/core'
import { Web } from '@/vuexes/web'
import axios from '@/plugins/axios'  
import {Course} from '@/vuexes/course'
@Module({ generateMutationSetters: true })
class AuthModule extends VuexModule {
    private token: any = localStorage.getItem('token')
    public user:any = null  
    public choices:any = []
    public mytier:any = null
    public datePer:any = 0
    public dateCount:any = 0
    public async setUser() {
        let user = await this.getUser(); 
        this.user = user 
        await this.loadMyTier()
        return user
    }
 

    public async getUser() {
        let baseUser = await Core.getHttp(`/api/auth/v1/user/`)
        if(baseUser.pk){
            let user = await Core.getHttp(`/api/account/userprofile/${baseUser.pk}/`)
            await Course.getMyClass(baseUser.pk)
            return user;
        } 
    }
 

    public async login(form: any) {
        await this.reToken();
        let user = await Core.postHttp(`/api/auth/v1/login/`, form)
        return user
    }

    public async register(form: any) {
        await this.reToken();
        let user = await Core.postHttp(`/api/auth/v2/register/`, form)
        return user
    }
    public async reToken() {
        axios.defaults.headers.common['Authorization'] = '';
    }

    public async storeToken(token: any) {
        console.log(token);
        axios.defaults.headers.common['Authorization'] = (token != null) ? `Token ${token}` : '';
    }

    public async storeTokenToStorage(token: any) {
        localStorage.setItem('token', token)
    }

    public async checkToken() {
        if (this.token != null) {
            await this.storeToken(this.token);
        }
    }
    public async checkUser() {
        try {
            await this.checkToken();
            let user = await this.getUser();
            if (this.token) {
                if (!user.id) {
                    alert('Session หมดอายุ')
                    await this.reToken();
                    await this.logout();
                    location.reload();
                }else{
                    await this.setUser()
                    return this.user
                }
            } else{ 
                return null
            }
        } catch (error) { 
            return null
        }
    }

    public async logout() {
        localStorage.removeItem('token');
        return await Core.postHttp('/api/auth/v1/logout/', {})
    }


    public async storeLog(title:string='',data:any="",type:any = 0,reason_user:any = ""){
        let form = {
            "type": type,
            "title": title,
            "data": data,
            "reason_user":reason_user,
            "user": this.user.id
        }
        let store = await Core.postHttp(`/api/account/log/`,form)
        return store
    }


    public async loadMyTier(){
        let myTiers = await Core.getHttp(`/api/payout/userpayout/?user=${this.user.id}`)
        if (myTiers.length > 0 ) {
            this.mytier = myTiers[myTiers.length - 1]
            var start = moment().format('YYYY-MM-DD');
            var end = moment(this.mytier.end_date);
            let count = end.diff(start, 'days')
            this.datePer = Number(((count / 100) * this.mytier.days).toFixed(0))
            this.dateCount = count 
            if(count < 3 && count > 0){
                await Web.alert(`สมาชิกใกล้หมดอายุแล้ว`,'info',`คุณมีเวลาเหลืออีก ${count} วัน กรุณาต่ออายุหลังจากหมดอายุแล้ว เพื่อให้สามารถใช้งานได้ต่อไป`)
            }else if(count ==0 && this.user.in_class==true){
                await Web.alert(`หมดอายุแล้ว`,'info',`กรุณาต่ออายุหลังจากหมดอายุแล้ว เพื่อให้สามารถใช้งานได้ต่อไป`)
                await this.switchUser(false)
            }
        }else{
            await Web.alert(`ยังไม่ได้เป็นสมาชิก`,'info',`สมัครเป็นสมาชิกกับ Fitness เพื่อให้สามารถใช้งานได้ต่อไป`)
        }
    }

    public async switchUser(data:boolean){
        let user = await Core.putHttp(`/api/account/userprofile/${this.user.id}/`,{
            in_class:data
        })
        await this.setUser()
        return user
    }


}

import store from "@/vuexes"
import moment from "moment";
import { AsyncComponent } from "vue";
export const Auth = new AuthModule({ store, name: "Auth" })

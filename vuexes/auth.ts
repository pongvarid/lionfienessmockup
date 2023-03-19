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
    public myhistories:any = []
    public myhistoriesCount = 0

    public myTierActiveList:any = [];
    public myTierList:any = [];
    public myTiers:any = [];
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
      try {
        let myTiers = await Core.getHttp(`/api/payout/userpayout/?user=${this.user.id}`)
        if (myTiers.length > 0 ) {
            this.myTiers = myTiers
            let nowTier = _.filter(myTiers,   (o)=> { return o.status == 1 });
            this.myTierActiveList = nowTier;  
            this.mytier = (nowTier.length > 0)?nowTier[0]:myTiers[myTiers.length - 1]
            console.log('mytier loading',this.mytier);
            this.myTierList = _.filter(myTiers,(r)=>{
                return r.id > this.mytier.id
            })
            console.log('mytier',this.mytier);
            var start = moment()
            var end = moment(this.mytier.end_date);
            let count = (end.diff(start, 'days'))+1 
            this.datePer = Number(((count / this.mytier.days) * 100).toFixed(0))
            this.dateCount = count 
            if(count == 0 && this.mytier.status == 1){
                await this.closeTier()
            }
            await this.loadMyHistory() 
            console.log(this.mytier);
            return myTiers;
        }else{
            return null
        }
      } catch (error) {
        console.log('loadMyTier',error);
      }
        return null
    }

    async closeTier(){
        await Core.putHttp(`/api/payout/userpayout/${this.mytier.id}/`, {
                status: 2
            })
            await this.loadMyTier()
    }

    public async switchUser(data:boolean){
        let user = await Core.putHttp(`/api/account/userprofile/${this.user.id}/`,{
            in_class:data
        })
        await this.setUser()
        return user
    }

    public async loadMyHistory(){
        try {
            let histories= await Core.getHttp(`/api/register/history/?user=${this.user.id}&bill=${this.mytier.id}`)
            this.myhistories = histories
            this.myhistoriesCount = histories.length
        } catch (error) {
            this.myhistories = null
            this.myhistoriesCount = 0
        } 
    }

    async loadMyTierDiff() {
        try {
         let user = await this.getUser();
         let myTiers = await Core.getHttp(`/api/payout/userpayout/?user=${user.id}`)
         if (myTiers.length > 0) {
            let in_tier = myTiers[myTiers.length - 1] 
             var start = moment().format('YYYY-MM-DD');
             var end = moment(in_tier.end_date);
             let count = end.diff(start, 'days')  
             await this.loadMyHistory()
            return {
                count: count,
                per: Number(((count / 100) * in_tier.days).toFixed(0)),
                stert: start,
                end: end,
                data: in_tier,
                status: true
            } 
         } else {
            return {
                count: 0,
                per: 0,
                stert: 0,
                end: 0,
                data: null,
                status: false
            }
         }
        } catch (error) {
            return  {
                count: 0,
                per: 0,
                stert: 0,
                end: 0,
                data: null,
                status: false
            }
        }
     }


}

import store from "@/vuexes"
import moment from "moment";
import { AsyncComponent } from "vue";
export const Auth = new AuthModule({ store, name: "Auth" })

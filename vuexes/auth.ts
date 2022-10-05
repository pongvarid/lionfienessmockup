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
    public async setUser() {
        let user = await this.getUser(); 
        this.user = user 
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


}

import store from "@/vuexes"
import moment from "moment";
import { AsyncComponent } from "vue";
export const Auth = new AuthModule({ store, name: "Auth" })

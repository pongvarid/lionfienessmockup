import Vue from 'vue'
import env from './env'
import {Core} from '@/vuexes/core'
import {Auth} from '@/vuexes/auth'
import {Web} from '@/vuexes/web'
import moment from 'moment'
Vue.prototype.$ccc = "text-4xl bg-green-600 p-6" 
Vue.prototype.$home = {
    'card':"text-4xl bg-green-600 p-6"
}

Vue.prototype.$url  = env.host+'/' // "http://adminorganize.itef.fun/" //"https://admin.opulentz.ga/" //'https://admin.opulentz.ga/'  //"https://de5a-184-82-30-66.ap.ngrok.io/" //   //`https://admin-canabit.tk/`
Vue.prototype.$furl =  env.web  
Vue.prototype.$core = Core
Vue.prototype.$auth = Auth
Vue.prototype.$web  = Web

Vue.prototype.$l = (th:string, en:string)=> {
    let lang = localStorage.getItem('lang')
    return (lang == 'th') ? th : en
}
 
Vue.prototype.$2date =  (date1:any, date2:any,output:any='days')=> {
    let d1 = moment(date1)
    let d2 = moment(date2)
    let diff = d2.diff(d1, output)
    return diff
}
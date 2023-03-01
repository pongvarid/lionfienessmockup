import Vue from 'vue'
import env from './env'
import {Core} from '@/vuexes/core'
import {Auth} from '@/vuexes/auth'
import {Web} from '@/vuexes/web'
import {Trainer} from '@/vuexes/trainer'
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
Vue.prototype.$trainer  = Trainer

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

Vue.prototype.$v = {
    "req": (v:any)=> !!v || 'Field is required',
}

Vue.prototype.$moment = moment

Vue.prototype.$isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    }, 
};
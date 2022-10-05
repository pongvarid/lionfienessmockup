import Vue from 'vue'
import env from './env'
Vue.prototype.$ccc = "text-4xl bg-green-600 p-6" 
Vue.prototype.$home = {
    'card':"text-4xl bg-green-600 p-6"
}

Vue.prototype.$url  = env.host+'/' // "http://adminorganize.itef.fun/" //"https://admin.opulentz.ga/" //'https://admin.opulentz.ga/'  //"https://de5a-184-82-30-66.ap.ngrok.io/" //   //`https://admin-canabit.tk/`
Vue.prototype.$furl =  env.web  

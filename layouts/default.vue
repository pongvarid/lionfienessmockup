<template>
 <v-app>
  <nuxt/>
  <Core-Menu ></Core-Menu>
 </v-app>
</template>

<script>
  import {
    Auth
} from '@/vuexes/auth'
import {
    Web
} from "~/vuexes/web";
import {
    Core
} from "~/vuexes/core"
import {Course} from '@/vuexes/course'
export default {
  name: 'DefaultLayout',
  data () {
    return {
   
    }
  },
  async created() { 
        let user = await Auth.checkUser(); 
        if(!user && this.$route.name != 'auth-login') {
            let check=  await Web.confirm(`ยังไม่ได้เข้าสู่ระบบ`,`คุณต้องการเข้าสู่ระบบหรือไม่ เพื่อเข้าถึงฟังก์ชันการใช้งานอย่างเต็มรูปแบบ`,'https://cdn-icons-png.flaticon.com/512/2920/2920369.png')
            if(check){
              await Course.getClass()
              await Course.getOpenClass()
              await this.$router.push('/auth/login')
            }
          } 
    }

}
</script>

<template>
<v-app>
    <v-overlay :value="bands" opacity="0.9">
        <div class="p-4 flex flex-col items-center justify-center">
          <v-icon color="error" size="60">mdi-information</v-icon>
          <br>
          <h2 class="font-semibold text-xl">คุณถูกระงับการใช้งานชั่วคราว</h2>
          <p>เนื่องจากคุณขาดการเข้าคลาสเกินกว่าที่กำหนด กรุณาติดต่อ Fitness ปลดล็อกการใช้งานเพื่อเข้าถึงฟังก์ชันการใช้งานอย่างเต็มรูปแบบ</p>
          <br>
          <v-btn @click="logout()" color="orange">ออกจากระบบ</v-btn>
        </div>
    </v-overlay>
    <nuxt />
    <Core-Menu></Core-Menu>

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
import {
    Course
} from "~/vuexes/course"
export default {
    name: 'DefaultLayout',
    data() {
        return {
            bands: false,
        }
    },
    async mounted() {
        let user = await Auth.checkUser();
        if (!user && this.$route.name != 'auth-login') {
            let check = await Web.confirm(`ยังไม่ได้เข้าสู่ระบบ`, `คุณต้องการเข้าสู่ระบบหรือไม่ เพื่อเข้าถึงฟังก์ชันการใช้งานอย่างเต็มรูปแบบ`, 'https://cdn-icons-png.flaticon.com/512/2920/2920369.png')
            if (check) {
                await Course.getClass()
                await Course.getOpenClass()
                await this.$router.push('/auth/login')
            }
        } else {
            this.bands = await Course.checkBand(user.id)
        }
    },
    methods:{
      async logout() {
            await Auth.logout()
            await this.$router.push(`/auth/login/`)
            await location.reload()
        },
    }

}
</script>

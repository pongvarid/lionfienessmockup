<template>
<div v-if='response'>
    <div class="w-full py-2 px-4 bg ">
        <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ --->

        <div class="flex flex-col items-center justify-center">
            <div class="mt-16 flex flex-col items-center text-center">
                <img class="h-36 rounded-full " src="@/assets/images/logox.jpg" alt="">
            </div>
            <v-card   class="w-full mt-2">
                <v-card-text>
                    <p tabindex="0" class="t focus:outline-none text-2xl font-extrabold leading-6  ">{{$l(`ลงชื่อเข้าใช้งาน`,`Login`)}}</p>
                    <p tabindex="0" class="font-semibold focus:outline-none text-sm mt-4 font-medium leading-none  ">{{$l(`หากสนใจเป็นสมัครสมาชิก?`,`If you want becoming a member?`)}}
                         <a @click="$router.push(`/auth/register/`)" href="javascript:void(0)" class="font-semibold ">{{$l(`สมัครสมาชิก`,`Register`)}}</a></p>
                    <v-form ref="login" class="mt-10">
                        <v-text-field v-model="form.username" :rules="rules" color="#4ade80" :label="$l(`เบอร์โทร`,`Phone Number`)" outlined dense></v-text-field>
                        <v-text-field type="password" v-model="form.password" :rules="rules" color="#4ade80" :label="$l(`รหัสผ่าน`,`Password`)" outlined dense></v-text-field>
                        <div class="flex mt-2">
                            <v-btn @click="$router.push('/auth/forgot')" text dense color="info"><span class="text-xs font-semibold text-capitalize">{{$l(`ลืมรหัสผ่าน`,`Forgot Password`)}}</span></v-btn>
                            <v-spacer></v-spacer>
                            <v-btn @click="handleForm()" color="success">{{$l(`เข้าสู่ระบบ`,`Login`)}}</v-btn>
                        </div>
                    </v-form>
                </v-card-text>
            </v-card>
        </div>
    </div>

</div>
</template>

<script>
import {
    Core
} from '@/vuexes/core'
import {
    Auth
} from '@/vuexes/auth'
import {
    Web
} from '@/vuexes/web'
export default {
    layout: 'auth',
    data() {
        return ({
            response: false,
            form: {},
            rules: [v => !!v || 'ต้องจำเป็นต้องกรอกฟิลด์นี้'],
            lists: []
        })
    },
    async created() {
        await this.startup();
        this.response = true;
    },
    methods: {
        async startup() {

        },
        async handleForm() {
            let check = this.$refs.login.validate()
            if (check) {
                await this.login();
            }
        },
        async login() {
            let signin = await Auth.login(this.form)
            if (signin.key) {
                await Auth.storeToken(signin.key)
                await Auth.storeTokenToStorage(signin.key)
                await Auth.getUser()
                await this.$router.replace(`/home/`) 
                await location.reload()
                return true
            } else {
                this.error = signin
                await Web.switchLoad(false)
                await Web.alert(`${this.$l("เกิดข้อผิดพลาด","Cannot Login")}`,'info', `${this.$l("ไม่สามารถเข้าสู่ระบบได้ กรุณาตรวจสอบชื่อผู้ใช้หรือรหัสผ่านอีกครั้ง หรือติดต่อผู้ดูแลระบบ ในกรณีที่ท่านสมัครสมาชิกใหม่ กรุณารอการยืนยันจากผู้ดูแลระบบ","can't log in Please check your username or password again. or contact the administrator In the event that you apply for a new member Please wait for confirmation from the administrator.")}`)
 
                return false
            }
        }
    },
    computed: {

    }
}
</script>

<style>
    
    </style>

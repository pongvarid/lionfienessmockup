<template>
<div v-if='response'>
    <div class="h-screen    w-full py-16 px-4 bg">
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
                        <v-text-field v-model="form.username" :rules="rules" color="#4ade80" :label="$l(`ชื่อผู้ใชห้ หรือ รหัสมาชิก`,`Code or Username`)" outlined dense></v-text-field>
                        <v-text-field type="password" v-model="form.password" :rules="rules" color="#4ade80" :label="$l(`รหัสผ่าน`,`Password`)" outlined dense></v-text-field>
                        <div class="flex mt-2">
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
            rules: [v => !!v || 'ฟิลนี้ต้องจำเป็นต้องกรอก'],
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
                await Web.alert(`Please check your email for activate to login.`, 'info')
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

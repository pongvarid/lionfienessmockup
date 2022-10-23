<template>
    <div v-if='response'>
        <div class="bg     w-full py-16 px-4 bg mb-12">
            <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ --->
    
            <div class="flex flex-col items-center justify-center">
                <div class="  flex flex-col items-center text-center">
                    <img class="rounded-full h-36" src="@/assets/images/logox.jpg" alt="">
                </div>
                <v-card   class="w-full mt-4">
                    <v-card-text>
                        <p tabindex="0" class="t focus:outline-none text-2xl font-semibold leading-6  ">{{$l(`สมัครสมาชิก`,`Register`)}} </p>
                        <p tabindex="0" class="font-semibold focus:outline-none text-sm mt-4 font-medium leading-none  ">{{$l(`หากเป็นสมาชิกอยู่แล้ว? `,`Already a member?`)}}
                            <a @click="$router.push(`/auth/login/`)" href="javascript:void(0)" class="font-semibold"> {{$l(`เข้าสู่ระบบ`,`Login`)}} </a></p>
                            <v-alert type="info" v-if="form.under18"  >
                                <span>
                                    {{$l(`คุณอายุตำกว่า 18 ปี หลังจากที่คุณกดสมัครสมาชิก ทางผู้ดูแลระบบจะตรวจสอบข้อมูลของคุณ และจะเปิดให้ใช้งานภายใน 24 ชั่วโมง หลังจากได้รับอนุญาติจากผู้ปกครองแล้ว`,`You are under 18 years old after you subscribe. The administrator will verify your information. And will be activated within 24 hours after receiving parental permission.`)}}
                                </span>
                            </v-alert>
                        <v-form ref="login" class="mt-10">
                            <v-text-field disabled v-model="form.username" :rules="rules" color="#4ade80" label="รหัสสมาชิก" outlined dense></v-text-field>
                            <v-text-field type="password" v-model="form.password" :rules="rules" color="#4ade80" label="รหัสผ่าน" outlined dense></v-text-field>
                            <v-text-field type="password" v-model="form.password_confirm" :rules="rules" color="#4ade80" label="ยืนยันรหัสผ่าน" outlined dense></v-text-field>
                            <v-text-field v-model="form.first_name" :rules="rules" color="#4ade80" label="ชื่อ" outlined dense></v-text-field>
                            <v-text-field v-model="form.last_name" :rules="rules" color="#4ade80" label="นามสกุล" outlined dense></v-text-field>
                            <v-text-field v-model="form.nick_name" :rules="rules" color="#4ade80" label="ชื่อเล่น" outlined dense></v-text-field>
                            <v-text-field @change="sumAge()" type="date" v-model="form.birth_date" :rules="rules" color="#4ade80" label="วันเกิด" outlined dense></v-text-field>
                            <v-text-field disabled v-model="form.age" :rules="rules" color="#4ade80" label="อายุ" outlined dense></v-text-field>
                            <v-text-field v-model="form.email" :rules="rules" color="#4ade80" label="อีเมล" outlined dense></v-text-field>
                            <v-text-field v-model="form.tel" :rules="rules" color="#4ade80" label="เบอร์" outlined dense></v-text-field>
                            <div class="flex mt-2">
                                <v-spacer></v-spacer>
                                <v-btn @click="handleForm()" color="success">   {{$l(`สมัครสมาชิก`,`Let's Register`)}} </v-btn>
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
    import moment from 'moment'
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
                this.form.username = await this.$core.generateCodeId();
            },
            async handleForm() {
                let check = this.$refs.login.validate()
                if (check) {
                    await this.login();
                }
            },
            async login() {
                let signin = await Core.postHttp(`/api/auth/v2/register/`,this.form)
                if (signin.id) {
                     await Web.alert('สมัครสมาชิกสำเร็จ')
                    await this.$router.replace(`/auth/login/`)  
                } else {
                    this.error = signin 
                    await Web.alert(`สมัครสมาชิกไม่สำเร็จ`, 'error',`กรุณาตรวจสอบข้อมูลให้ถูกต้อง`) 
                }
            },
            async sumAge(){
                this.form.age = this.$2date(this.form.birth_date,moment(),'years')
                this.form.under18 = (this.form.age < 18)
                
            }
        },
        computed: {
    
        }
    }
    </script>
    
    <style>
        
        </style>
    
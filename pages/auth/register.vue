<template>
    <div v-if='response'>
        <div class="     w-full py-16 px-4 bg-black mb-12">
            <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ --->
    
            <div class="flex flex-col items-center justify-center">
                <div class="  flex flex-col items-center text-center">
                    <img class="h-36" src="@/assets/images/logox.jpg" alt="">
                </div>
                <v-card dark class="w-full">
                    <v-card-text>
                        <p tabindex="0" class="t focus:outline-none text-2xl font-extrabold leading-6  ">สมัครสมาชิก</p>
                        <p tabindex="0" class="font-semibold focus:outline-none text-sm mt-4 font-medium leading-none  ">หากเป็นสมาชิกอยู่แล้ว? 
                            <a @click="$router.push(`/auth/login/`)" href="javascript:void(0)" class="font-semibold"> เข้าสู่ระบบ</a></p>
                        <v-form ref="login" class="mt-10">
                            <v-text-field v-model="form.username" :rules="rules" color="#4ade80" label="ชื่อผู้ใช้/รหัสสมาชิก" outlined dense></v-text-field>
                            <v-text-field type="password" v-model="form.password" :rules="rules" color="#4ade80" label="รหัสผ่าน" outlined dense></v-text-field>
                            <v-text-field type="password" v-model="form.password_confirm" :rules="rules" color="#4ade80" label="ยืนยันรหัสผ่าน" outlined dense></v-text-field>
                            <v-text-field v-model="form.first_name" :rules="rules" color="#4ade80" label="ชื่อ" outlined dense></v-text-field>
                            <v-text-field v-model="form.last_name" :rules="rules" color="#4ade80" label="นามสกุล" outlined dense></v-text-field>
                            <v-text-field v-model="form.nick_name" :rules="rules" color="#4ade80" label="ชื่อเล่น" outlined dense></v-text-field>
                            <v-text-field v-model="form.email" :rules="rules" color="#4ade80" label="อีเมล" outlined dense></v-text-field>
                            <v-text-field v-model="form.tel" :rules="rules" color="#4ade80" label="เบอร์" outlined dense></v-text-field>
                            <div class="flex mt-2">
                                <v-spacer></v-spacer>
                                <v-btn @click="handleForm()" color="success">สมัครสมาชิก</v-btn>
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
                let signin = await Core.postHttp(`/api/auth/v2/register/`,this.form)
                if (signin.id) {
                     await Web.alert('สมัครสมาชิกสำเร็จ')
                    await this.$router.replace(`/auth/login/`)  
                } else {
                    this.error = signin 
                    await Web.alert(`สมัครสมาชิกไม่สำเร็จ`, 'error',`กรุณาตรวจสอบข้อมูลให้ถูกต้อง`) 
                }
            }
        },
        computed: {
    
        }
    }
    </script>
    
    <style>
        
        </style>
    
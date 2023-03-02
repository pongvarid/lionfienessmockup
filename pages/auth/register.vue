<template>
<div v-if='response'>
    <div class="bg     w-full py-5 px-4 bg mb-12">
        <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ --->

        <div class="flex flex-col items-center justify-center">
            <div class="  flex flex-col items-center text-center">
                <img class="rounded-full h-36" src="@/assets/images/logox.jpg" alt="">
            </div>

            <v-stepper vertical v-model="e1" class="w-full mt-2">
                <div class="p-5 text-center">
                    <p tabindex="0" class="t focus:outline-none text-2xl font-semibold leading-6  ">{{$l(`สมัครสมาชิก`,`Register`)}} </p>
                    <p tabindex="0" class="font-semibold focus:outline-none text-sm mt-4 font-medium leading-none  ">{{$l(`หากเป็นสมาชิกอยู่แล้ว? `,`Already a member?`)}}
                        <a @click="$router.push(`/auth/login/`)" href="javascript:void(0)" class="font-semibold"> {{$l(`เข้าสู่ระบบ`,`Login`)}} </a></p>
                </div>
                <v-stepper-step step="1">
                    {{$l(`ข้อมูลการเข้าสู่ระบบ`,`Login Information`)}}
                </v-stepper-step>
                <v-stepper-content step="1">
                    <v-form ref="login">
                        <div class="pt-2">
                            <v-text-field @change="form.tel = form.username"   v-model="form.username" :rules="rules" color="#4ade80" :label="$l(`เบอร์โทร`,`Phone Number`)" outlined dense></v-text-field>
                            <v-text-field type="password" v-model="form.password" :rules="rules" color="#4ade80" :label="$l(`รหัสผ่าน`,`Password`)" outlined dense></v-text-field>
                            <v-text-field type="password" v-model="form.password_confirm" :rules="rules" color="#4ade80" :label="$l(`ยืนยันรหัสผ่าน`,`Confirm Password`)" outlined dense></v-text-field>
                        </div>
                    </v-form>
                    <v-btn color="success" depressed @click="e1 = 2">
                        {{ $l(`ถัดไป`,`Next`) }}
                    </v-btn>

                </v-stepper-content>

                <v-stepper-step step="2">
                    {{$l(`ข้อมูลส่วนตัว`,`Personal Information`)}}
                </v-stepper-step>
                <v-stepper-content step="2">
                    <v-form ref="login">
                        <div class="pt-2">
                            <v-text-field v-model="form.first_name" :rules="rules" color="#4ade80" :label="$l(`ชื่อ`,`Name`)" outlined dense></v-text-field>
                            <v-text-field v-model="form.last_name" :rules="rules" color="#4ade80" :label="$l(`นามสกุล`,`Surname`)" outlined dense></v-text-field>
                            <v-text-field v-model="form.nick_name" :rules="rules" color="#4ade80" :label="$l(`ชื่อเล่น`,`Nickname`)" outlined dense></v-text-field>
                            <v-text-field @input="sumAge()" type="date" v-model="form.birth_date" :rules="rules" color="#4ade80" :label="$l(`วันเกิด`,`Birthday`)" outlined dense></v-text-field>
                            <v-text-field disabled v-model="form.age" :rules="rules" color="#4ade80" :label="$l(`อายุ`,`Age`)" outlined dense></v-text-field>
                            <v-textarea outlined dense :label="$l(`ข้อมูลผู้ปกครอง`,`Parent information`)" :placeholder="$l(`ระบุข้อมูลการติดต่อผู้ปกครองของคุณ`,`Provide your parent's contact information.`)" :rules="[rules]" v-model="form.under18_detail" v-if="form.under18"></v-textarea>
                            <v-text-field v-model="form.email" :rules="rules" color="#4ade80" :label="$l(`อีเมล`,`Email`)" outlined dense></v-text-field>
                            <v-text-field v-model="form.tel" type="number"  maxlength="8"  :rules="rules" color="#4ade80" :label="$l(`เบอร์โทรสำหรับติดต่อ`,`Phone Number (For Contact)`)" outlined dense></v-text-field>
                            <v-select item-text="name" item-value="id" :items="knows" v-model="form.how_to_know" outlined dense :label="$l(`คุณรู้จักเราจากที่ไหน`,`How did you know us?`)"></v-select>

                        </div>
                    </v-form>
                    <v-btn text depressed @click="e1 = 1">
                        {{ $l(`ย้อนกลับ`,`Back`) }}
                    </v-btn>
                    <v-btn color="success" depressed @click="e1 = 3">
                        {{ $l(`ถัดไป`,`Next`) }}
                    </v-btn>
                </v-stepper-content>
                <v-stepper-step step="3">
                    {{$l(`ข้อมูลบัตรประชาชน`,`Indentity Information`)}}
                </v-stepper-step>
                <v-stepper-content step="3">
                    <div class="pt-2">
                        <v-form ref="login">
                        <v-textarea outlined dense
                            :label="$l(`ที่อยู่`,`Adderss`)"  
                            v-model="form.address"
                            :rules="rules"
                            rows="2"
                        ></v-textarea>
                            <v-text-field v-model="form.card_number" :rules="rules" :counter="13" maxlength="13"  color="#4ade80" :label="$l(`เลขบัตรประจำตัวประชาชน`,`Indentity Code`)" outlined dense></v-text-field>
                        <v-file-input class="mt-2" :label="$l('อัปโหลดรูปภาพบัตรประชาชน','Upload a photo of your ID card')" outlined dense  v-model="form.card_images"></v-file-input>

                    </v-form>
                    <div class="text-base font-semibold mt-6">{{$l("ข้อตกลงและเงื่อนไขการใช้งาน","Terms of Use")}}</div> 
                    <v-expansion-panels v-model="tab" dense  >
                        <v-expansion-panel v-for="(item,i) in data" :key="i">
                            <v-expansion-panel-header>
                                <h2 class="font-semibold">{{ item.name }}</h2>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <div style="font-size:14px;" v-html="item.detail"> 
                                </div>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    </div>
                    <br>
                    <v-btn text @click="e1 = 2">
                        {{ $l(`ย้อนกลับ`,`Back`) }}
                    </v-btn>
                    <v-btn depressed @click="handleForm()" color="success"> {{$l(`สมัครสมาชิก`,`Let's Register`)}} </v-btn>

                </v-stepper-content>
            </v-stepper>
             

        </div><br><br><br><br><br>
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
import _ from 'lodash'
export default {
    layout: 'auth',
    data() {
        return ({
            response: false,
            form: {},
            rules: [v => !!v || 'ต้องจำเป็นต้องกรอกฟิลด์นี้'],
            lists: [],
            knows: [],
            card_images:[],
             e1: 1,
             data: {},
            tab:[1,]
        })
    },
    async created() {
        await this.startup();
        await this.loadPdpa();
        this.response = true;
    },
    methods: {
        async startup() { 
            let knows = await this.$core.getHttp(`/api/fitness/howknow/`)
            this.knows = _.filter(knows, function (o) {
                return o.is_active == true
            })
        },
        async handleForm() {
            let check = this.$refs.login.validate()
            if (check) {
                await this.login();
            }
        },
        async login() {
            delete this.form.card_image
            let signin = await Core.postHttp(`/api/auth/v2/register/`, this.form)
            if (signin.id) {
                let form = new FormData()
                form.append('card_image', this.form.card_images)
                await Core.putImageHttp(`/api/account/userprofile/${signin.id}/`, form)
                await Web.alert(this.$l(`สมัครสมาชิกสำเร็จ`, `Register Success`), 'success', this.$l(`ทาง Fitness จะตรวจข้อมูลของคุณและทำการยืนยันข้อมูลเพื่อเข้าสู่ระบบให้ ภายใน 24 ชั่วโมง`, `Fitness will check your information and confirm your login information within 24 hours.`))
                // await this.$core.postHttp(`/api/line/`, {
                //     "message": `มีผู้สมัครสมาชิกใหม่ ${this.form.username} ชื่อ ${this.form.first_name} ${this.form.last_name} กรุณาตรวจสอบข้อมูล`,
                // })
                await this.$core.putHttp(`/api/account/userprofile/${signin.id}/`, {
                    is_active: false
                })
                await this.$router.replace(`/auth/login/`)
            } else {
                this.error = signin
                let error = ''
                if(signin.username){
                    error = error + (signin.username).toString() + '\n'
                }
                if (signin.email) {
                    error = error + (signin.email).toString() + '\n'
                }
                if (signin.card_number) {
                    error = error + (signin.card_number).toString() + '\n'
                }
                if (signin.tel) {
                    error = error + (signin.tel).toString() + '\n'
                }
                if (signin.password) {
                    error = error + (signin.password).toString() + '\n'
                }
                if(signin.password_confirm){
                    error = error + (signin.password_confirm).toString() + '\n'
                }

                await Web.alert(`สมัครสมาชิกไม่สำเร็จ`, 'error', `กรุณาตรวจสอบข้อมูลให้ถูกต้อง ${error}`)
            }
        },
        async sumAge() {
            this.form.age = this.$2date(this.form.birth_date, moment(), 'years')
            this.form.under18 = (this.form.age < 18)

        },
        async loadPdpa(){
            let data = await this.$core.getHttp(`/api/fitness/pdpa/`)
            this.data = data
        }
    },
    computed: {

    }
}
</script>

<style>
        
        </style>

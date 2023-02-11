<template>
<div v-if='response'>
    <div class="bg     w-full py-5 px-4 bg mb-12">
        <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ --->

        <div class="flex flex-col items-center justify-center">
            <div class="  flex flex-col items-center text-center">
                <img class="rounded-full h-36" src="@/assets/images/logox.jpg" alt="">
            </div>

            <!-- <v-stepper vertical v-model="e1" class="w-full mt-2">
                <div class="p-5 text-center">
                    <p tabindex="0" class="t focus:outline-none text-2xl font-semibold leading-6  ">{{$l(`สมัครสมาชิก`,`Register`)}} </p>
                    <p tabindex="0" class="font-semibold focus:outline-none text-sm mt-4 font-medium leading-none  ">{{$l(`หากเป็นสมาชิกอยู่แล้ว? `,`Already a member?`)}}
                        <a @click="$router.push(`/auth/login/`)" href="javascript:void(0)" class="font-semibold"> {{$l(`เข้าสู่ระบบ`,`Login`)}} </a></p>
                </div>
                <v-stepper-step step="1">
                    กรุณาตั้งรหัสผ่าน
                </v-stepper-step>
                <v-stepper-content step="1">
                    <v-form ref="login">
                        <div class="pt-2">
                            <v-text-field disabled v-model="form.username" :rules="rules" color="#4ade80" :label="$l(`รหัสสมาชิก`,`User Code`)" outlined dense></v-text-field>
                            <v-text-field type="password" v-model="form.password" :rules="rules" color="#4ade80" :label="$l(`รหัสผ่าน`,`Password`)" outlined dense></v-text-field>
                            <v-text-field type="password" v-model="form.password_confirm" :rules="rules" color="#4ade80" :label="$l(`ยืนยันรหัสผ่าน`,`Confirm Password`)" outlined dense></v-text-field>
                        </div>
                    </v-form>
                    <v-btn color="success" depressed @click="e1 = 2">
                        Continue
                    </v-btn>

                </v-stepper-content>

                <v-stepper-step step="2">
                    กรุณากรอกข้อมูลส่วนตัว
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
                            <v-text-field v-model="form.tel" type="number"  maxlength="8"  :rules="rules" color="#4ade80" :label="$l(`เบอร์`,`Phone Number`)" outlined dense></v-text-field>
                            <v-select item-text="name" item-value="id" :items="knows" v-model="form.how_to_know" outlined dense :label="$l(`คุณรู้จักเราจากที่ไหน`,`How did you know us?`)"></v-select>

                        </div>
                    </v-form>
                    <v-btn text depressed @click="e1 = 1">
                        Back
                    </v-btn>
                    <v-btn color="success" depressed @click="e1 = 3">
                        Continue
                    </v-btn>
                </v-stepper-content>
                <v-stepper-step step="3">
                    กรุณากรอกเลขบัตรประจำตัวประชาชน
                </v-stepper-step>
                <v-stepper-content step="3">
                    <div class="pt-2">
                        <v-form ref="login">
                        <v-text-field v-model="form.card_number" :rules="rules" :counter="13" maxlength="13"  color="#4ade80" :label="$l(`เลขบัตรประจำตัวประชาชน`,`Indentity Code`)" outlined dense></v-text-field>
                        <v-file-input class="mt-2" label="อัพโหลดรูปภาพบัตรประชาชน" outlined dense  v-model="form.card_images"></v-file-input>
                    </v-form>
                    </div>
                 
                    <v-btn text @click="e1 = 2">
                        Back
                    </v-btn>
                    <v-btn depressed @click="handleForm()" color="success"> {{$l(`สมัครสมาชิก`,`Let's Register`)}} </v-btn>

                </v-stepper-content>
            </v-stepper> -->
            <v-card class="w-full mt-4">
                <v-card-text>
                    <p tabindex="0" class="t focus:outline-none text-2xl font-semibold leading-6  ">{{$l(`สมัครสมาชิก`,`Register`)}} </p>
                    <p tabindex="0" class="font-semibold focus:outline-none text-sm mt-4 font-medium leading-none  ">{{$l(`หากเป็นสมาชิกอยู่แล้ว? `,`Already a member?`)}}
                        <a @click="$router.push(`/auth/login/`)" href="javascript:void(0)" class="font-semibold"> {{$l(`เข้าสู่ระบบ`,`Login`)}} </a></p>
                    <v-alert type="info" v-if="form.under18">
                        <span>
                            {{$l(`คุณอายุตำกว่า 18 ปี หลังจากที่คุณกดสมัครสมาชิก ทางผู้ดูแลระบบจะตรวจสอบข้อมูลของคุณ และจะเปิดให้ใช้งานภายใน 24 ชั่วโมง หลังจากได้รับอนุญาติจากผู้ปกครองแล้ว`,`You are under 18 years old after you subscribe. The administrator will verify your information. And will be activated within 24 hours after receiving parental permission.`)}}
                        </span>
                    </v-alert>
                    <v-form ref="login" class="mt-10">
                        <v-text-field disabled v-model="form.username" :rules="rules" color="#4ade80" :label="$l(`รหัสสมาชิก`,`User Code`)" outlined dense></v-text-field>
                        <v-text-field type="password" v-model="form.password" :rules="rules" color="#4ade80" :label="$l(`รหัสผ่าน`,`Password`)" outlined dense></v-text-field>
                        <v-text-field type="password" v-model="form.password_confirm" :rules="rules" color="#4ade80" :label="$l(`ยืนยันรหัสผ่าน`,`Confirm Password`)" outlined dense></v-text-field>
                        <v-text-field v-model="form.first_name" :rules="rules" color="#4ade80" :label="$l(`ชื่อ`,`Name`)" outlined dense></v-text-field>
                        <v-text-field v-model="form.last_name" :rules="rules" color="#4ade80" :label="$l(`นามสกุล`,`Surname`)" outlined dense></v-text-field>
                        <v-text-field v-model="form.nick_name" :rules="rules" color="#4ade80" :label="$l(`ชื่อเล่น`,`Nickname`)" outlined dense></v-text-field>
                        <!-- <v-text-field v-model="form.card_number" :rules="rules" color="#4ade80" :label="$l(`เลขบัตรประจำตัวประชาชน`,`Indentity Code`)" outlined dense></v-text-field> -->
                        <v-text-field @input="sumAge()" type="date" v-model="form.birth_date" :rules="rules" color="#4ade80" :label="$l(`วันเกิด`,`Birthday`)" outlined dense></v-text-field>
                        <v-text-field disabled v-model="form.age" :rules="rules" color="#4ade80" :label="$l(`อายุ`,`Age`)" outlined dense></v-text-field>
                        <v-textarea outlined dense :label="$l(`ข้อมูลผู้ปกครอง`,`Parent information`)" :placeholder="$l(`ระบุข้อมูลการติดต่อผู้ปกครองของคุณ`,`Provide your parent's contact information.`)" :rules="[rules]" v-model="form.under18_detail" v-if="form.under18"></v-textarea>
                        <v-text-field v-model="form.email" :rules="rules" color="#4ade80" :label="$l(`อีเมล`,`Email`)" outlined dense></v-text-field>
                        <v-text-field v-model="form.tel" :rules="rules" color="#4ade80" :label="$l(`เบอร์`,`Phone Number`)" outlined dense></v-text-field>
                        <v-select item-text="name" item-value="id" :items="knows" v-model="form.how_to_know" outlined dense :label="$l(`คุณรู้จักเราจากที่ไหน`,`How did you know us?`)"></v-select>
                        <div class="flex mt-2">
                            <v-spacer></v-spacer>
                            <v-btn @click="handleForm()" color="success"> {{$l(`สมัครสมาชิก`,`Let's Register`)}} </v-btn>
                        </div>
                    </v-form>
                </v-card-text>
            </v-card>

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
            rules: [v => !!v || 'ฟิลนี้ต้องจำเป็นต้องกรอก'],
            lists: [],
            knows: [],
            card_images:[],
             e1: 1,
        })
    },
    async created() {
        await this.startup();
        this.response = true;
    },
    methods: {
        async startup() {
            this.form.username = await this.$core.generateCodeId();
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
                await Web.alert(`สมัครสมาชิกไม่สำเร็จ`, 'error', `กรุณาตรวจสอบข้อมูลให้ถูกต้อง`)
            }
        },
        async sumAge() {
            this.form.age = this.$2date(this.form.birth_date, moment(), 'years')
            this.form.under18 = (this.form.age < 18)

        }
    },
    computed: {

    }
}
</script>

<style>
        
        </style>

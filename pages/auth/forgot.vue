<template>
<div>
    <div class="h-screen    w-full py-16 px-4 bg">
        <v-card class="w-full mt-2">
            <v-card-title primary-title>
                {{ (step==0)?$l(`ลืมรหัสผ่าน`,`Forgot Password`):$l(`สร้างรหัสผ่านใหม่`,`New Password`) }}
            </v-card-title>
            <v-card-text>
                <div v-if="step==0">
                    <v-form ref="find">
                        <v-text-field v-model="form.username" :rules="rules"   :label="$l(`เบอร์โทรสำหรับเข้าสู่ระบบ`,`Phone Number for login`)" outlined dense></v-text-field>
                        <v-text-field v-model="form.fitness_id" :label="$l(`รหัสลูกค้า`,`Fitness No`)" outlined dense></v-text-field>
                        <v-btn block @click="handleForm()" color="success">{{$l(`ส่งรหัสผ่านใหม่`,`Send New Password`)}}</v-btn>
                    </v-form>
                </div>
                <div  v-else-if="step==1">
                    <v-form ref="forgot">
                        <v-text-field type="password" v-model="formForgot.password" :rules="rules" :label="$l(`รหัสผ่านใหม่`,`New password`)" outlined dense></v-text-field>
                        <v-text-field type="password"  v-model="formForgot.confirm_password" :label="$l(`ยืนยันรหัสผ่านใหม่`,`Confirm Password`)" outlined dense></v-text-field>
                        <v-btn v-if="(formForgot.password != '' && formForgot.password != '') && (formForgot.password == formForgot.confirm_password)" block @click="changePassword()" color="success">{{$l(`สร้างรหัสผ่านใหม่`,`Update New Password`)}}</v-btn>
                    </v-form>
                </div>
            </v-card-text>
        </v-card>
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
    data: () => ({
        response: false,
        form: {},
        rules: [v => !!v || 'ต้องจำเป็นต้องกรอกฟิลด์นี้'],
        lists: [],
        step: 0,
        formForgot: {
            password: '',
            confirm_password: ''
        }
    }),
    async created() {

    },
    methods: {
        async handleForm() {
            let check = this.$refs.find.validate()
            if (check) {
                let find = await Core.getHttp(`/api/auth/v2/changepassword/?fitness_id=${this.form.fitness_id}&username=${this.form.username}`)
                if (find.user_id) {
                    await Web.alert('พบข้อมูลผู้ใช้','success','กรุณากรอกรหัสผ่านใหม่ และยืนยันรหัสผ่าน')
                    this.step = 1
                    this.formForgot.user_id = find.user_id
                }else{
                await Web.alert('ไม่พบข้อมูลผู้ใช้','info','กรุณาตรวจสอบข้อมูลอีกครั้ง')
            }
            }
        },
        async changePassword() {
            let check = this.$refs.forgot.validate()
            if (check) {
                let change = await Core.postHttp(`/api/auth/v2/changepassword/`, this.formForgot)
                if (change.id) {
                   await Web.alert('เปลี่ยนรหัสผ่านสำเร็จ') 
                   await this.$router.push('/auth/login')
                }else{
                await Web.alert('กรุณาตรวจสอบข้อมูลอีกครั้ง','info','รหัสผ่านไม่ตรงกัน')
            }
            }
        }
    }
}
</script>

<style>

</style>

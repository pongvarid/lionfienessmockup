<template>
<div   >
    <v-toolbar dark>
        <v-btn icon @click="$router.go(-1)">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{$l(`โปรไฟล์`,`Profile`)}}</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
    <div class="mb-24">
        <div class=" flex flex-col " v-if="response">  
            <v-tabs v-model="tab">
                <v-tab>
                    <span class="capitalize">{{$l("ข้อมูลส่วนตัว","Profile")}}</span>
                </v-tab>
                <v-tab-item>
                    <div class="account-bg">
                        <div class="w-full p-6">
                            <center>
                                <v-img v-if="user.image" class="rounded-full h-40 w-40 mt-6" :src="`${$url}/${user.image}`" alt=""></v-img>
                                <img v-else class="rounded-full h-40 w-40 mt-6" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyHnAAxZw7h-1IEUa5LF2MmLteCLb46LkypKTf1xI&s" alt="">
                            </center>
                            <v-file-input accept="image/*;capture=camera" class="mt-2" label="อัปโหลดรูปโปรไฟล์" @change="uploadProfile()" v-model="form.file"></v-file-input>

                            <v-form class="w-full mt-6">
                                <h3 class="font-semibold mb-2">รหัสสมาชิก: {{user.fitness_id}}</h3>
                                <v-text-field readonly v-model="user.username" label="เบอร์โทร (สำหรับเข้าสู่ระบบ)"></v-text-field>
                                <v-text-field v-model="form.first_name" label="ชื่อ"></v-text-field>
                                <v-text-field v-model="form.last_name" label="นาสกุล"></v-text-field>
                                <v-text-field v-model="form.nick_name" label="ชื่อเล่น"></v-text-field>
                                <v-text-field v-model="form.card_number" label="เลขบัตรประชาชน"></v-text-field>
                                <v-text-field v-model="form.email" label="อีเมล"></v-text-field>
                                <v-textarea rows="2" v-model="form.address" label="ที่อยู่"></v-textarea>
                                <v-text-field @input="sumAge()" v-model="form.birth_date" type="date" label="วัน/เดือน/ปี เกิด"></v-text-field>
                                <v-text-field v-model="form.age" type="number" label="อายุ"></v-text-field>
                                <v-text-field v-model="form.tel" type="number" label="เบอร์โทร (สำหรับติดต่อ)"></v-text-field>
                                <v-btn @click="updateProfile()" block color="success">บันทึกข้อมูล</v-btn>
                            </v-form>
                            <br>
                            <v-divider>
                            </v-divider>
                            <v-btn @click="logout()" block color="error">ออกจากระบบ</v-btn>
                            <br><br>

                            <v-btn block outlined @click="removeAccount()" color="error">{{$l("ลบบัญชีผู้ใช้","Remove Account")}}</v-btn>

                        </div>
                    </div>
                </v-tab-item>
                <v-tab>
                    <span  class="capitalize">{{$l("ข้อมูลสมาชิก","Member")}}</span>
                </v-tab>
                <v-tab-item>
                    <div  class="w-full p-6 account-bg">
                        <Payout-Package></Payout-Package>
                    </div>
                </v-tab-item>
                <v-tab>
                    <span  class="capitalize">{{$l("เทรนเนอร์","Trainer")}}</span>
                </v-tab>
                <v-tab-item>
                    <div  class="w-full p-6 account-bg">
                        <Trainer :toolbar="false" />
                    </div>
                </v-tab-item>
                <v-tab>
                    <span  class="capitalize">{{$l("คลาส","Class")}}</span>
                </v-tab>
                <v-tab-item>
                    <div  class="w-full p-6 account-bg">
                        <Class-Register></Class-Register>
                    </div>
                </v-tab-item>
                <v-tab>
                    <span  class="capitalize">{{$l("รหัสผ่าน","Password")}}</span>
                </v-tab>
                <v-tab-item>
                    <div  class="w-full p-6 account-bg">
                        <v-form ref="formPassword">
                            <v-text-field v-model="formPassword.old_password" :rules="[$v.req]" type="password" label="รหัสผ่านเดิม"></v-text-field>
                            <v-text-field v-model="formPassword.password" :rules="[$v.req]" type="password" label="รหัสผ่านใหม่"></v-text-field>
                            <v-text-field v-model="formPassword.password_confirm" :rules="[$v.req]" type="password" label="ยืนยันรหัสผ่านใหม่"></v-text-field>
                            <v-btn @click="changePassword()" depressed block color="info">{{$l("เปลี่ยนรหัสผ่าน","Change Password")}}</v-btn>
                        </v-form>
                    </div>
                </v-tab-item>

            </v-tabs>
        </div>
        <v-overlay v-else opacity="0.9">
            <v-progress-circular indeterminate size="64" color="primary">Loading..</v-progress-circular>
        </v-overlay>
    </div>
</div>
</template>

<script>
import Trainer from '@/pages/trainer/index.vue'
import moment from 'moment'
import {
    Auth
} from '@/vuexes/auth'
import {
    Web
} from '@/vuexes/web'
import {
    Core
} from '@/vuexes/core'
export default {
    components: {
        Trainer
    },
    data: () => {
        return ({
            tab: 0,
            user: Auth.user,
            response: false,
            form: {},
            formPassword: {},

        })
    },
    async created() {
        try {
            await Auth.setUser();
            this.user = Auth.user
            await this.run()
        } catch (error) {
            await this.$router.push(`/auth/register/`)
        }
    },
    methods: {
        async run() {
            this.response = false
            let user = await Auth.checkUser();
            if (!user) {
                await this.$router.push(`/auth/register/`)
            } else {
                if (this.$route.query.tab) {
                    this.tab = Number(this.$route.query.tab)
                }
                this.form = {
                    first_name: this.user.first_name,
                    last_name: this.user.last_name,
                    nick_name: this.user.nick_name,
                    card_number: this.user.card_number,
                    email: this.user.email,
                    address: this.user.address,
                    birth_date: this.user.birth_date,
                    age: this.user.age,
                    tel: this.user.tel,
                }
                this.response = true;
                console.log(this.form)
            }
        },
        async logout() {
            await Auth.logout()
            await this.$router.push(`/auth/login/`)
            await location.reload()
        },
        async updateProfile() {
            let check = await Web.confirm(`ยืนยันการแก้ไขข้อมูล`)
            if (check) {
                this.response = false

                let user = await Core.putHttp(`/api/account/userprofile/${this.user.id}/`, this.form)
                if (user.id) {
                    await Auth.setUser()
                    await Web.alert(`แก้ไขข้อมูลสำเร็จ`)
                    await location.reload();
                }
                await this.run()

            }
        },
        async uploadProfile() {
            let check = await Web.confirm(`ยืนยันการแก้ไขข้อมูล`)
            if (check) {
                this.response = false
                let form = new FormData()
                form.append('image', this.form.file)
                let user = await Core.putImageHttp(`/api/account/userprofile/${this.user.id}/`, form)
                if (user.id) {
                    await Auth.setUser()
                    this.user = await Auth.getUser()
                    await Web.alert(`แก้ไขข้อมูลสำเร็จ`)
                }
                await this.run()
            }
        },
        async changePassword() {
            let validate = await this.$refs.formPassword.validate()
            if (validate) {
                let check = await Web.confirm(this.$l('ยืนยันการแก้ไขรหัสผ่าน', "Are you sure to change password?"))
                if (check) {
                    this.response = false
                    let change = await Core.postHttp(`/api/auth/v2/change-password/`, this.formPassword)
                    if (change.old_password) {
                        await Web.alert(this.$l("รหัสผ่านเดิมไม่ถูกต้อง", "Old Password is incorrect."), `error`)
                    } else if (this.formPassword.password != this.formPassword.password_confirm) {
                        await Web.alert(this.$l('รหัสผ่านใหม่ไม่ตรงกัน', "Password is not match."), 'error')
                    } else if (change.detail) {
                        await Web.alert(this.$l('แก้ไขข้อมูลสำเร็จ', "Change Password Success"), 'success')
                    }
                    this.formPassword = {}
                    await this.run()
                    this.tab = 4
                }
            }

        },
        async removeAccount() {
            let check = await this.$web.confirm(this.$l('ยืนยันการลบบัญชีผู้ใช้', "Are you sure to delete account?"), this.$l("เมื่อลบบัญชีผู้ใช้แล้วจะไม่สามารถกู้คืนได้ และข้อมูลทั้งหมดจะถูกลบออกจากระบบ", "When you delete account, you can't restore it. All data will be deleted from the system."))
            if (check) {
                this.response = false
                let user = await Core.putHttp(`/api/account/userprofile/${this.user.id}/`, {
                    is_active: false
                })
                if (user) {
                    await Auth.logout()
                    await this.$router.push(`/auth/login/`)
                    await location.reload()
                }
                await this.run()
            }
        },
        async sumAge() {
            this.response = false
            this.form.age = Number(this.$2date(this.form.birth_date, moment(), 'years'))
            console.log(this.form.age)
            this.form.under18 = (this.form.age < 18)
            this.response = true
        }
    }
}
</script>

<style>
    .account-bg{
        background-size: cover;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='600' height='1440' preserveAspectRatio='none' viewBox='0 0 600 1440'%3e%3cg mask='url(%26quot%3b%23SvgjsMask2231%26quot%3b)' fill='none'%3e%3cpath d='M590.73 1452.38 L581.56 1462.8L579.5956512302694 1451.0406512302695z' fill='rgba(231%2c 54%2c 53%2c 0.36)'%3e%3c/path%3e%3crect width='122.2' height='122.2' clip-path='url(%26quot%3b%23SvgjsClipPath2232%26quot%3b)' x='437.5' y='998.53' fill='url(%23SvgjsPattern2233)' transform='rotate(254.71%2c 498.6%2c 1059.63)'%3e%3c/rect%3e%3ccircle r='50' cx='451.69' cy='158.45' fill='rgba(211%2c 183%2c 20%2c 0.26)'%3e%3c/circle%3e%3ccircle r='50' cx='416.19' cy='328.87' stroke='rgba(247%2c 95%2c 226%2c 0.28)' stroke-width='2.46'%3e%3c/circle%3e%3ccircle r='50' cx='586' cy='957.69' fill='rgba(231%2c 54%2c 53%2c 0.36)'%3e%3c/circle%3e%3cpath d='M500.02 25.79L504.43 37.82 493.67 44.76 498.09 56.78 487.33 63.73 491.74 75.75 480.98 82.69M492.43 23.25L496.85 35.28 486.09 42.22 490.5 54.24 479.74 61.19 484.15 73.21 473.39 80.15' stroke='rgba(247%2c 95%2c 226%2c 0.28)' stroke-width='1.53' stroke-dasharray='4%2c 4'%3e%3c/path%3e%3crect width='180' height='180' clip-path='url(%26quot%3b%23SvgjsClipPath2234%26quot%3b)' x='-75.73' y='1102.57' fill='url(%23SvgjsPattern2235)' transform='rotate(275.1%2c 14.27%2c 1192.57)'%3e%3c/rect%3e%3crect width='86.6' height='86.6' clip-path='url(%26quot%3b%23SvgjsClipPath2236%26quot%3b)' x='326.84' y='539.2' fill='url(%23SvgjsPattern2237)' transform='rotate(246.05%2c 370.14%2c 582.5)'%3e%3c/rect%3e%3cpath d='M415.37 671.71 L369.53000000000003 642.56L357.3976848559166 692.1873151440834z' fill='rgba(3%2c 123%2c 11%2c 0.27)'%3e%3c/path%3e%3crect width='204' height='204' clip-path='url(%26quot%3b%23SvgjsClipPath2238%26quot%3b)' x='276.44' y='1304.2' fill='url(%23SvgjsPattern2239)' transform='rotate(136.22%2c 378.44%2c 1406.2)'%3e%3c/rect%3e%3crect width='123.8' height='123.8' clip-path='url(%26quot%3b%23SvgjsClipPath2240%26quot%3b)' x='460.12' y='251.81' fill='url(%23SvgjsPattern2241)' transform='rotate(105.34%2c 522.02%2c 313.71)'%3e%3c/rect%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask2231'%3e%3crect width='600' height='1440' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cpattern x='0' y='0' width='12.22' height='12.22' patternUnits='userSpaceOnUse' id='SvgjsPattern2233'%3e%3cpath d='M0 12.22L6.11 0L12.22 12.22' stroke='rgba(247%2c 95%2c 226%2c 0.28)' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2232'%3e%3ccircle r='30.55' cx='498.6' cy='1059.63'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern2235'%3e%3cpath d='M3 1L3 5M1 3L5 3' stroke='rgba(231%2c 54%2c 53%2c 0.36)' fill='none' stroke-width='1'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2234'%3e%3ccircle r='45' cx='14.27' cy='1192.57'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='8.66' height='8.66' patternUnits='userSpaceOnUse' id='SvgjsPattern2237'%3e%3cpath d='M0 8.66L4.33 0L8.66 8.66' stroke='rgba(3%2c 123%2c 11%2c 0.27)' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2236'%3e%3ccircle r='21.65' cx='370.14' cy='582.5'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='204' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern2239'%3e%3crect width='204' height='3' x='0' y='0' fill='rgba(247%2c 95%2c 226%2c 0.28)'%3e%3c/rect%3e%3crect width='204' height='3' x='0' y='3' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2238'%3e%3ccircle r='51' cx='378.44' cy='1406.2'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='12.38' height='12.38' patternUnits='userSpaceOnUse' id='SvgjsPattern2241'%3e%3cpath d='M6.19 1L6.19 11.38M1 6.19L11.38 6.19' stroke='rgba(211%2c 183%2c 20%2c 0.26)' fill='none' stroke-width='2.08'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2240'%3e%3ccircle r='30.95' cx='522.02' cy='313.71'%3e%3c/circle%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
    }
</style>

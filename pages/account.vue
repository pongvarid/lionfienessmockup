<template>
<div class="mb-24">
    <div class="p-6 flex flex-col" v-if="response">

        <div class="text-2xl xd">Profile</div>
        <center>
            <img v-if="user.image" class="rounded-full h-40 w-40 mt-6" :src="`${$url}/${user.image}`" alt="">
            <img v-else class="rounded-full h-40 w-40 mt-6" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyHnAAxZw7h-1IEUa5LF2MmLteCLb46LkypKTf1xI&s" alt="">

        </center>
        <v-file-input accept="image/*;capture=camera" class="mt-2" label="อัพโหลดรูปโปรไฟล์" @change="uploadProfile()" v-model="form.file"></v-file-input>

        <v-toolbar class="w-full mt-4" flat>
            <v-slide-group
            multiple
            show-arrows
          >
          <v-slide-item>
            <v-btn @click="tab=1" text :color="(tab==1)?'#eaab4d':''">ข้อมูลส่วนตัว</v-btn>
          </v-slide-item>
            <v-slide-item>
            <v-btn @click="tab=2" text :color="(tab==2)?'#eaab4d':''">ข้อมูลสมาชิก</v-btn>
            </v-slide-item>
            <v-slide-item>
            <v-btn @click="tab=3" text :color="(tab==3)?'#eaab4d':''">คลาส</v-btn>
            </v-slide-item>
            <v-slide-item>
            <v-btn @click="tab=4" text :color="(tab==4)?'#eaab4d':''">รหัสผ่าน</v-btn>
            </v-slide-item>

            <!-- <v-btn @click="tab=1" text :color="(tab==1)?'#eaab4d':''">ข้อมูลส่วนตัว</v-btn>
            <v-btn @click="tab=2" text :color="(tab==2)?'#eaab4d':''">ข้อมูลสมาชิก</v-btn>
            <v-btn @click="tab=3" text :color="(tab==3)?'#eaab4d':''">คลาส</v-btn>
            <v-btn @click="tab=4" text :color="(tab==4)?'#eaab4d':''">รหัสผ่าน</v-btn> -->
            </v-slide-group>
        </v-toolbar>
        
        <div class="w-full p-3" v-if="tab==1">
            <v-form class="w-full mt-6" v-if="tab==1">
                <h3 class="font-semibold mb-2">รหัสสมาชิก: {{user.fitness_id}}</h3>
                <v-text-field readonly v-model="user.username" label="เบอร์โทร (สำหรับเข้าสู่ระบบ)" ></v-text-field>
                <v-text-field v-model="form.first_name" label="ชื่อ" ></v-text-field>
                <v-text-field v-model="form.last_name" label="นาสกุล" ></v-text-field>
                <v-text-field v-model="form.nick_name" label="ชื่อเล่น" ></v-text-field>
                <v-text-field v-model="form.card_number" label="เลขบัตรประชาชน" ></v-text-field>
                <v-text-field v-model="form.email" label="อีเมล" ></v-text-field>
                <v-textarea rows="2" v-model="form.address" label="ที่อยู่" ></v-textarea>
                <v-text-field @input="sumAge()"   v-model="form.birth_date" type="date" label="วัน/เดือน/ปี เกิด" ></v-text-field> 
                <v-text-field   v-model="form.age" type="number" label="อายุ" ></v-text-field>
                <v-text-field v-model="form.tel" type="number"   label="เบอร์โทร (สำหรับติดต่อ)" ></v-text-field>
                <v-btn @click="updateProfile()" block color="success">บันทึกข้อมูล</v-btn> 
            </v-form>
            <br>
            <v-divider>
            </v-divider>
            <v-btn @click="logout()" block color="error">ออกจากระบบ</v-btn>
            <br><br>

            <v-btn block outlined @click="removeAccount()" color="error">{{$l("ลบบัญชีผู้ใช้","Remove Account")}}</v-btn>

        </div>

        <div class="w-full pt-4" v-if="tab==2">
            <v-card outlined>
                <v-card-text>
                    <Payout-Package></Payout-Package>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                </v-card-actions>
            </v-card>

        </div>
        <div class="w-full pt-4"  v-if="tab==3">
            <v-card outlined>
                <v-card-text>
                    <Class-Register></Class-Register>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer> 
                </v-card-actions>
            </v-card>
        </div>
        <div class="w-full pt-4"  v-if="tab==4">
            <v-card outlined>
                <v-card-text>
                    <v-form ref="formPassword">
                        <v-text-field v-model="formPassword.old_password" :rules="[$v.req]" type="password" label="รหัสผ่านเดิม" ></v-text-field>
                        <v-text-field v-model="formPassword.password" :rules="[$v.req]" type="password" label="รหัสผ่านใหม่" ></v-text-field>
                        <v-text-field v-model="formPassword.password_confirm" :rules="[$v.req]" type="password" label="ยืนยันรหัสผ่านใหม่" ></v-text-field>
                        <v-btn @click="changePassword()" depressed block color="info">{{$l("เปลี่ยนรหัสผ่าน","Change Password")}}</v-btn>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer> 
                </v-card-actions>
            </v-card>
        </div>

    </div>
    <v-overlay v-else opacity="0.9">
        <v-progress-circular indeterminate size="64" color="primary">Loading..</v-progress-circular>
    </v-overlay>
</div>
</template>

<script>
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
    data: () => {
        return ({
            tab: 1,
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
                    this.tab = this.$route.query.tab

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
            if(validate){
                let check = await Web.confirm(this.$l('ยืนยันการแก้ไขรหัสผ่าน',"Are you sure to change password?"))
            if (check) {
                this.response = false
                let change = await Core.postHttp(`/api/auth/v2/change-password/`, this.formPassword)
                if(change.old_password){
                    await Web.alert(this.$l("รหัสผ่านเดิมไม่ถูกต้อง","Old Password is incorrect."),`error`)
                }
                else if(this.formPassword.password != this.formPassword.password_confirm){
                    await Web.alert( this.$l('รหัสผ่านใหม่ไม่ตรงกัน',"Password is not match."),'error')
                }

                else if(change.detail){
                    await Web.alert( this.$l('แก้ไขข้อมูลสำเร็จ',"Change Password Success"),'success')
                }  
                this.formPassword = {}
                await this.run()
                this.tab = 4
            }
            }
          
        },
        async removeAccount(){
            let check = await this.$web.confirm(this.$l('ยืนยันการลบบัญชีผู้ใช้',"Are you sure to delete account?"),this.$l("เมื่อลบบัญชีผู้ใช้แล้วจะไม่สามารถกู้คืนได้ และข้อมูลทั้งหมดจะถูกลบออกจากระบบ","When you delete account, you can't restore it. All data will be deleted from the system."))
            if (check) {
                this.response = false
                let user = await Core.putHttp(`/api/account/userprofile/${this.user.id}/`,{
                    is_active:false
                })
                if (user) {
                    await Auth.logout()
                    await this.$router.push(`/auth/login/`)
                    await location.reload()
                }
                await this.run()
            }
        },
         async  sumAge() {
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

</style>

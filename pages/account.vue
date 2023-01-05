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
            <v-btn @click="tab=1" text :color="(tab==1)?'#eaab4d':''">ข้อมูลส่วนตัว</v-btn>
            <v-btn @click="tab=2" text :color="(tab==2)?'#eaab4d':''">ข้อมูลสมาชิก</v-btn>
            <v-btn @click="tab=3" text :color="(tab==3)?'#eaab4d':''">คลาส</v-btn>
        </v-toolbar>
        
        <div class="w-full p-3" v-if="tab==1">
            <v-form class="w-full mt-6" v-if="tab==1">
                <v-text-field readonly v-model="user.username" label="รหัสสมาชิก" id="id"></v-text-field>
                <v-text-field :value="form.first_name" label="ชื่อ" id="id"></v-text-field>
                <v-text-field :value="form.last_name" label="นาสกุล" id="id"></v-text-field>
                <v-text-field readonly v-model="form.birth_date" type="date" label="วัน/เดือน/ปี เกิด" id="id"></v-text-field>
                <v-text-field v-model="form.tel" type="number" maxlength="8"  label="เบอร์โทร" id="id"></v-text-field>
                <v-btn @click="updateProfile()" block color="success">บันทึกข้อมูล</v-btn>
            </v-form>
            <br>
            <v-divider>
            </v-divider>
            <v-btn @click="logout()" block color="error">ออกจากระบบ</v-btn>
        </div>

        <div class="w-full " v-if="tab==2">
            <v-card>
                <v-card-text>
                    <Payout-Package></Payout-Package>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                </v-card-actions>
            </v-card>

        </div>
        <div v-if="tab==3">
            <v-card>
                <v-card-text>
                    <Class-Register></Class-Register>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                </v-card-actions>
            </v-card>
        </div>

    </div>
</div>
</template>

<script>
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
        })
    },
    async created() {
        await this.run()
    },
    methods: {
        async run() {
            if (!this.user) {
                await this.$router.push(`/auth/login/`)
            } else {
                if (this.$route.query.tab) {
                    this.tab = this.$route.query.tab

                }
                this.form.first_name = this.user.first_name
                this.form.last_name = this.user.last_name
                this.form.tel = this.user.tel
                this.form.birth_date = this.user.birth_date

                this.response = true;
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
                let user = await Core.putHttp(`/api/account/userprofile/${this.user.id}/`, this.form)
                if (user.id) {
                    await Auth.setUser()
                    await Web.alert(`แก้ไขข้อมูลสำเร็จ`)
                }
                await this.run()
            }
        },
        async uploadProfile() {
            let check = await Web.confirm(`ยืนยันการแก้ไขข้อมูล`)
            if (check) {
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
        }
    }
}
</script>

<style>

</style>

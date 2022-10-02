<template>
<div class="pb-20">
    <div class="p-6 flex flex-col" v-if="response">

        <div class="text-2xl xd">Profile</div>
        <center> 
            <img v-if="user.image" class="rounded-full h-40 w-40 mt-6" :src="`${$url}/${user.image}`" alt=""> 
            <img v-else class="rounded-full h-40 w-40 mt-6" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyHnAAxZw7h-1IEUa5LF2MmLteCLb46LkypKTf1xI&s" alt=""> 

        </center>
        <v-btn class="mt-2" text color="primary">
            <v-icon size="20">mdi-pencil</v-icon>&nbsp;เปลี่ยนรูปโประไฟล์
        </v-btn>

        <v-toolbar class="w-full mt-4" flat>
            <v-btn @click="tab=1" text :color="(tab==1)?'#eaab4d':''">ข้อมูลส่วนตัว</v-btn>
            <v-btn @click="tab=2" text :color="(tab==2)?'#eaab4d':''">ข้อมูลสมาชิก</v-btn>
        </v-toolbar>

        <div class="w-full p-3" v-if="tab==1">
            <v-form class="w-full mt-6" v-if="tab==1">
                <v-text-field :value="user.username" label="รหัสสมาชิก" id="id"></v-text-field>
                <v-text-field :value="user.first_name" label="ชื่อ" id="id"></v-text-field>
                <v-text-field :value="user.last_name" label="นาสกุล" id="id"></v-text-field>
                <v-text-field :value="user.username" label="วัน/เดือน/ปี เกิด" id="id"></v-text-field>
                <v-text-field :value="user.tel" label="เบอร์โทร" id="id"></v-text-field>
            </v-form>
            <v-btn @click="logout()" block color="error">ออกจากระบบ</v-btn>
        </div>

        <div class="w-full " v-if="tab==2">
            <v-card>
                <v-card-text>
                    <Payout-Package ></Payout-Package>
                    <!-- <Core-Dev></Core-Dev> -->
                    <!-- <v-text-field class="mt-6" dense value="เป็นสมาชิก" label="สถานะสมาชิก" id="id"></v-text-field>
                    <v-progress-linear value="60" height="10" striped color="deep-orange"></v-progress-linear>
                    <v-text-field class="mt-6" dense value="12-10-2022" label="วันหมดอายุสมาชิก" id="id"></v-text-field> -->
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="$router.push(`/payout/`)" color="success">ต่ออายุสมาชิก</v-btn>
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
export default {
    data: () => {
        return ({
            tab: 1,
            user: Auth.user,
            response: false,
        })
    },
    async created() {
        if (!this.user) {
            await this.$router.push(`/auth/login/`)
        } else {
            if(this.$route.query.tab){
                this.tab = this.$route.query.tab
            }
            this.response = true;
        }
    },
    methods: {
        async logout() {
            await Auth.logout()
            await this.$router.push(`/auth/login/`)
            await location.reload()
        }
    }
}
</script>

<style>

</style>

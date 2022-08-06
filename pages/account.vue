<template>
<div class="pb-20">
    <div class="p-6 flex flex-col items-center">

        <div class="text-2xl xd">Profile</div>

        <img class="rounded-full h-40 w-40 mt-9" src="https://scontent.fcnx3-1.fna.fbcdn.net/v/t1.6435-9/64619473_2295272697221657_5133800990461394944_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=dbeb18&_nc_ohc=AMmSD-t7a1AAX9zDxrR&_nc_ht=scontent.fcnx3-1.fna&oh=00_AT9a2WEt3eVymeIKxQik7TEX1gu2cxTdTcgz1QyTbjft5Q&oe=63131D6F" alt="">
        <v-btn text color="primary">
            <v-icon size="20">mdi-pencil</v-icon>&nbsp;เปลี่ยนรูปโประไฟล์
        </v-btn>

        <v-toolbar class="w-full mt-4">
            <v-btn @click="tab=1" text :color="(tab==1)?'success':''">ข้อมูลส่วนตัว</v-btn>
            <v-btn @click="tab=2" text :color="(tab==2)?'success':''">ข้อมูลสมาชิก</v-btn>
        </v-toolbar>

        <div class="w-full p-3" v-if="tab==1">
            <v-form class="w-full mt-6" v-if="tab==1">
                <v-text-field value="LF20221452" label="รหัสสมาชิก" id="id"></v-text-field>
                <v-text-field value="พงษ์วริษฐ์" label="ชื่อ" id="id"></v-text-field>
                <v-text-field value="มณีวรรณ์" label="นาสกุล" id="id"></v-text-field>
                <v-text-field value="16-05-1996" label="วัน/เดือน/ปี เกิด" id="id"></v-text-field>
                <v-text-field value="0988203979" label="เบอร์โทร" id="id"></v-text-field>
            </v-form>
            <v-btn block color="error">ออกจากระบบ</v-btn>
        </div>

        <div class="w-full p-3" v-if="tab==2">

            <v-text-field class="mt-6" dense value="เป็นสมาชิก" label="สถานะสมาชิก" id="id"></v-text-field>
            <v-progress-linear value="60" height="10" striped color="deep-orange"></v-progress-linear>
            <v-text-field class="mt-6" dense value="12-10-2022" label="วันหมดอายุสมาชิก" id="id"></v-text-field>

        </div>

    </div>
</div>
</template>

<script>
export default {
    data: () => {
        return ({
            tab: 1
        })
    }
}
</script>

<style>

</style>

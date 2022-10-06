<template>
<div>  
    <div v-if="mytier.id || user.in_class">
        <div v-if="mytier.status == 0">
            <v-btn @click="$router.push(`/payout/checkout/?id=${mytier.id}`)" color="success">ชำระเงิน</v-btn>
            <p> หากคุณชำระเงินแล้วรอแอดมินตรวจสอบข้อมูลการชำระเงิน 1-2 วันทำการ</p>
        </div>
        <div v-else-if="mytier.status == 1">
            <v-text-field class="mt-6" dense :value="`เป็นสมาชิก ${mytier.tier_name}`" label="สถานะสมาชิก" id="id"></v-text-field>
            <v-progress-linear :value="datePer" height="10" striped color="deep-orange"></v-progress-linear>
            <v-text-field class="mt-6" dense v-model="mytier.end_date" label="วันหมดอายุสมาชิก" id="id"></v-text-field>

        </div>
        <div v-else>
            <h2>ไม่ได้เป็นสมาชิก เนื่องจาก</h2>
            <p>{{mytier.ect}}</p>
        </div>

        <div v-if="mytier.status == 1">
            <v-divider> </v-divider> <br>
            <v-btn block @click="$router.push(`/payout/`)" color="success">ต่ออายุสมาชิก</v-btn>
        </div>
    </div>
    <div v-else>
        <h2>เพื่อใช้งานส่วนต่างๆ ของระบบ คุณค้องเป็นสมาชิกกับ Fitness ก่อน</h2>
        <v-btn block @click="$router.push(`/payout/`)" color="success">สมัครเป็นสมาชิกกับ Fitness</v-btn>
    </div>

</div>
</template>

<script>
import {
    Web
} from '@/vuexes/web'
import {
    Auth
} from '@/vuexes/auth'
import {
    Core
} from '@/vuexes/core'
import moment from 'moment'
export default {
    data: () => {
        return ({
            user: Auth.user,
            mytier: {},
            datePer: 0,
            response: false,
        })
    },
    async mounted() {
        await this.run()
    },
    methods: {
        async run() {
            try {
                await this.loadMyTier()
            } catch (error) {

            }
        },
        async loadMyTier() {
            let myTiers = await Core.getHttp(`/api/payout/userpayout/?user=${this.user.id}`)
            if (myTiers.length > 0) {
                this.mytier = myTiers[myTiers.length - 1]
                var start = moment().format('YYYY-MM-DD');
                var end = moment(this.mytier.end_date);
                let count = end.diff(start, 'days')
                this.datePer = Number(((count / this.mytier.days) * 100).toFixed(0))
                if (count < 3 && count > 0) {
                    await Web.alert(`สมาชิกใกล้หมดอายุแล้ว`, 'info', `คุณมีเวลาเหลืออีก ${count} วัน กรุณาต่ออายุหลังจากหมดอายุแล้ว เพื่อให้สามารถใช้งานได้ต่อไป`)
                } else if (count == 0  && this.user.in_class==true) {
                    await Web.alert(`หมดอายุแล้ว`, 'info', `กรุณาต่ออายุหลังจากหมดอายุแล้ว เพื่อให้สามารถใช้งานได้ต่อไป`)
                    await Auth.switchUser(false)
                }
            }
        },
    }

}
</script>

<style>

</style>

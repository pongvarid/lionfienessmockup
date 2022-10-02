<template>
<div>

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
            datePer:0,
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
                var start = moment();
                var end = moment(this.mytier.end_date);
                let count = end.diff(start, 'days')
                this.datePer =  Number(((count / 100) * this.mytier.days).toFixed(0))
            }
        },
    }

}
</script>

<style>

</style>

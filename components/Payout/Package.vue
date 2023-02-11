<template>
<div>  
   
    <div v-if="mytier.id || user.in_class">
        <div v-if="mytier.status == 0">
            <div v-if="mytier.image_slip">
                
                <center>
                    <v-icon size="60" color="green"  >mdi-check-circle</v-icon>
                    <br>
                    <h2 class="text-green-500 font-semibold text-xl">อัพโหลดหลักฐานการชำระเงิน เรียบร้อยแล้ว</h2>
                    <span> <p>ขอบคุณที่ใช้บริการ กรุณารอการตรวจสอบข้อมูลการชำระเงิน 1-2 วันทำการ จากนั้นจะสามารถใช้งานได้ต่อไป</p></span>
                    <v-btn depressed @click="$router.push(`/payout/checkout/?id=${mytier.id}`)" color="warning" class="mt-4">แก้ไขหลักฐานการชำระเงิน</v-btn>
                </center>
            </div> 
            <div v-else>
                <center>
                    <v-icon size="60" color="orange"  >mdi-information</v-icon>
                    <br>
                    <v-btn depressed @click="$router.push(`/payout/checkout/?id=${mytier.id}`)" color="success">อัพโหลดหลักฐานการชำระเงิน</v-btn>
                </center>
                <p> หากคุณชำระเงินแล้วรอแอดมินตรวจสอบข้อมูลการชำระเงิน 1-2 วันทำการ</p>
            </div>
        </div>
        <div v-else-if="mytier.status == 1">
            <v-alert type="error" v-if="count < 1">
                หมดอายุแล้ว กรุณาต่ออายุหลังจากหมดอายุแล้ว เพื่อให้สามารถใช้งานได้ต่อไป
            </v-alert>
            <v-textarea rows="3" readonly class="mt-6" dense :value="`เป็นสมาชิก ${mytier.tier_name}`" label="สถานะสมาชิก" id="id"></v-textarea> 
            <v-text-field disabled class="mt-6" dense :value="user.number_class" label="จำนวน Class ที่จองได้" id="id"></v-text-field>
            <v-progress-linear :value="datePer" height="15" striped :color="(datePer >=50)?'green':(datePer>=40)?'orange':'red'"></v-progress-linear> (เหลือ {{ count }} วัน)
            <v-text-field disabled class="mt-6" dense :value="endDate" label="วันหมดอายุสมาชิก" id="id"></v-text-field>
            
            

        </div>
        <div v-else>
            <h2 class="font-semibold">ไม่ได้เป็นสมาชิก หรือ สถานะสมาชิกของคุณอาจหมดอายุแล้ว</h2>
            <p>{{mytier.ect}}</p>
            <v-btn block @click="$router.push(`/payout/`)" color="success">สมัครเป็นสมาชิก/ต่ออายุสมาชิก</v-btn>
        </div>

        <div v-if="mytier.status == 1">
            <v-divider> </v-divider> <br>
            <v-btn v-if="count < 1" block @click="$router.push(`/payout/`)" color="success">ต่ออายุสมาชิก</v-btn>
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
            count: 0,
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
                console.log(error);
            }
        },
        async loadMyTier() {
            let myTiers = await Core.getHttp(`/api/payout/userpayout/?user=${this.user.id}`)
            if (myTiers.length > 0) {
                this.mytier = myTiers[myTiers.length - 1]
                var start = moment();
                var end = moment(this.mytier.end_date);
                let count = end.diff(start, 'days')
                this.datePer = Number(((count / this.mytier.days) * 100).toFixed(0))
                console.log(count,this.datePer,this.mytier.days);
                this.count = count
                if (count < 3 && count > 0) {
                    await Web.alert(`สมาชิกใกล้หมดอายุแล้ว`, 'info', `คุณมีเวลาเหลืออีก ${count} วัน กรุณาต่ออายุหลังจากหมดอายุแล้ว เพื่อให้สามารถใช้งานได้ต่อไป`)
                } else if (count == 0  && this.user.in_class==true) {
                    await Web.alert(`หมดอายุแล้ว`, 'info', `กรุณาต่ออายุหลังจากหมดอายุแล้ว เพื่อให้สามารถใช้งานได้ต่อไป`)
                    await Auth.switchUser(false)
                }
            } 
        },
    },
    computed: {
        endDate(){
            try {
                return moment(this.mytier.end_date).format('DD/MM/YYYY')
            } catch (error) {
                return "-"
            }
        }
    }

}
</script>

<style>

</style>

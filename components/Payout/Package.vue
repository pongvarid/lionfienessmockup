<template>
<div v-if="response">
    <h2 class="font-semibold ">Package ปัจจุบัน</h2>
    <hr><br>
    <div v-if="mytier.id || user.in_class">
        <div v-if="mytier.status == 0">
            <div v-if="mytier.image_slip">
                <center>
                    <v-icon size="60" color="green">mdi-check-circle</v-icon>
                    <br>
                    <h2 class="text-green-500 font-semibold text-xl">อัปโหลดหลักฐานการชำระเงิน เรียบร้อยแล้ว</h2>
                    <span class="mt-3">
                        <p>ขอบคุณที่ใช้บริการ กรุณารอการตรวจสอบข้อมูลการชำระเงิน 1-2 วันทำการ จากนั้นจะสามารถใช้งานได้ต่อไป</p>
                    </span>

                    <v-btn depressed @click="$router.push(`/payout/checkout/?id=${mytier.id}`)" color="warning" class="mt-4">แก้ไขหลักฐานการชำระเงิน</v-btn>
                </center>
            </div>
            <div v-else>
                <center>
                    <v-icon size="60" color="orange" class="mb-2x">mdi-information</v-icon>
                    <br>
                    <v-btn block depressed @click="$router.push(`/payout/checkout/?id=${mytier.id}`)" color="success">อัปโหลดหลักฐานการชำระเงิน</v-btn>
                    <p class="mt-3"> หากคุณชำระเงินแล้วรอแอดมินตรวจสอบข้อมูลการชำระเงิน 1-2 วันทำการ</p>
                    <v-btn class="mt-4" block depressed @click="removeMyTier()" color="error">ยกเลิกการสมัคร</v-btn>
                </center>

            </div>
        </div>
        <div v-else-if="mytier.status == 1">
            <v-alert type="error" v-if="count <= 1">
                หมดอายุแล้ว กรุณาต่ออายุหลังจากหมดอายุแล้ว เพื่อให้สามารถใช้งานได้ต่อไป 
            </v-alert>
            <h2 class="font-semibold text-xl">Package {{`${mytier.tier_name}`}}</h2>
            <v-text-field readonly class="mt-6" dense :value="user.number_class" label="จำนวน Class ที่จองได้" id="id"></v-text-field>
            <v-progress-linear :value="datePer" height="15" striped :color="(datePer >=50)?'green':(datePer>=40)?'orange':'red'"></v-progress-linear> (เหลือ {{ count }} วัน)
            <v-text-field readonly class="mt-6" dense :value="endDate" label="วันหมดอายุสมาชิก" id="id"></v-text-field>
            <p>{{mytier.continue_course_data}}</p>
            <v-btn v-if="count > 0" :disabled="(newTier != null)" block @click="$router.push(`/payout?old_id=${mytier.id}`)" color="success">สมัคร Package ใหม่/ต่ออายุสมาชิก</v-btn>
            <p v-if="(newTier != null)" class="text-gray-500 text-xs  mt-1">* ไม่สามารถสมัคร Package ใหม่/ต่ออายุสมาชิก เนื่องจากคุณมีข้อมูลการซื้อล่วงหน้าแล้ว</p>

        </div>
        <div v-else>
            <h2 class="font-semibold">ไม่ได้เป็นสมาชิก หรือ สถานะสมาชิกของคุณอาจหมดอายุแล้ว</h2>
            <p>{{mytier.ect}}</p>
            <v-btn  block @click="$router.push(`/payout/`)" color="success">สมัครเป็นสมาชิก/ต่ออายุสมาชิก</v-btn>
        </div>

        <div v-if="mytier.status == 1">
            <v-divider> </v-divider> <br>
            <v-btn v-if="count < 1" block @click="$router.push(`/payout`)" color="success">ต่ออายุสมาชิก</v-btn>
        </div>
    </div>
    <div v-else>
        <h2>เพื่อใช้งานส่วนต่างๆ ของระบบ คุณต้องเป็นสมาชิกกับ Fitness ก่อน</h2>
        <v-btn class="mt-5" block @click="$router.push(`/payout/`)" color="success">สมัครเป็นสมาชิกกับ Fitness</v-btn>
    </div>
    <br>
    <h2 class="font-semibold ">Package หรือ การต่ออายุล่วงหน้า</h2>
    <hr><br>
    <div v-if="newTier">
        <div v-if="newTier.status == 0">
            <div v-if="newTier.image_slip">
                <center>
                    <v-icon size="60" color="green">mdi-check-circle</v-icon>
                    <br>
                    <h2 class="text-green-500 font-semibold text-xl">อัปโหลดหลักฐานการชำระเงิน เรียบร้อยแล้ว</h2>
                    <span class="mt-3">
                        <p>ขอบคุณที่ใช้บริการ กรุณารอการตรวจสอบข้อมูลการชำระเงิน 1-2 วันทำการ จากนั้นจะสามารถใช้งานได้ต่อไป</p>
                    </span>

                    <v-btn depressed @click="$router.push(`/payout/checkout/?id=${newTier.id}`)" color="warning" class="mt-4">แก้ไขหลักฐานการชำระเงิน</v-btn>
                </center>
            </div>
            <div v-else>
                <center>
                    <v-icon size="60" color="orange" class="mb-2x">mdi-information</v-icon>
                    <br>
                    <v-btn block depressed @click="$router.push(`/payout/checkout/?id=${newTier.id}`)" color="success">อัปโหลดหลักฐานการชำระเงิน</v-btn>
                    <p class="mt-3"> หากคุณชำระเงินแล้วรอแอดมินตรวจสอบข้อมูลการชำระเงิน 1-2 วันทำการ</p>
                    <v-btn class="mt-4" block depressed @click="removeNewTier()" color="error">ยกเลิกการสมัคร</v-btn>
                </center>
            </div>
        </div>
        <div v-else-if="newTier.status == 1">
            <h2 class="font-semibold text-xl">Package {{`${newTier.tier_name}`}}</h2>
            <p>{{newTier.continue_course_data}}</p>
        </div>
        <div v-else>
            <h2 class="font-semibold">ไม่ได้เป็นสมาชิก หรือ สถานะสมาชิกของคุณอาจหมดอายุแล้ว</h2>
            <p>{{newTier.ect}}</p>
        </div>
    </div>
    <div v-else>
        <center>
            <h2>ไม่มี Package หรือ การต่ออายุล่วงหน้า</h2>
        </center>
    </div>
    <br>
    <hr>
    <v-btn @click="dialog=true" class="mt-4" text depressed block color="primary">ประวัติการสมัครสมาชิก</v-btn>
    <v-dialog v-model="dialog" scrollable fullscreen persistent :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
                ประวัติการสมัครสมาชิก <v-spacer></v-spacer>
                <v-btn text @click="dialog= false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <div class="p-2" v-for="tier,i in listTiers" :key="i">
                    <v-card outlined>
                        <v-card-title primary-title>
                            <span class="font-semibold text-base">{{ tier.tier_name }}</span>
                            <v-spacer></v-spacer>
                            <v-chip v-if="tier.status == 0" dark color="orange" small>รอพิจรณา</v-chip>
                            <v-chip v-if="tier.status == 1" dark color="green" small>อนุมัติ</v-chip>
                            <v-chip v-if="tier.status == 2" dark color="red" small>ปิดการใช้งาน</v-chip>
                        </v-card-title>
                        <v-card-text>
                            <h2 v-if="tier.start_date && tier.end_date">{{moment(tier.start_date).format('DD/MM/YYYY')}} - {{moment(tier.end_date).format('DD/MM/YYYY')}}</h2>
                            <p>{{tier.ect}}</p>
                        </v-card-text>
                    </v-card>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>

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
            dialog: false,
            listTiers: [],
            moment: moment,
            newTier: null,
        })
    },
    async mounted() {
        await this.run()
    },
    methods: {
        async run() {
            try {

                await this.loadMyTier()
                this.response = true;
            } catch (error) {
                console.log(error);
            }
        },
        async loadMyTier() {
            await Auth.loadMyTier()
            if (Auth.myTiers.length > 0) {
                try {
                    this.listTiers = Auth.myTiers
                    this.mytier = Auth.mytier
                    this.datePer = Auth.datePer
                    this.count = Auth.dateCount
                    this.newTier = (Auth.myTierList.length > 0) ? Auth.myTierList[Auth.myTierList.length - 1] : null
                    let count = Auth.dateCount 
                    if (count < 3 && count > 0) {
                        await Web.alert(`สมาชิกใกล้หมดอายุแล้ว`, 'info', `คุณมีเวลาเหลืออีก ${count} วัน กรุณาต่ออายุหลังจากหมดอายุแล้ว เพื่อให้สามารถใช้งานได้ต่อไป`)
                    } else if (count == 0 && this.user.in_class == true) { 
                        await Web.alert(`หมดอายุแล้ว`, 'info', `กรุณาต่ออายุหลังจากหมดอายุแล้ว เพื่อให้สามารถใช้งานได้ต่อไป`) 
                        await Auth.switchUser(false)
                    }
                    
                    console.log(Auth.myTierActiveList, Auth.mytier, Auth.dateCount, Auth.datePer, Auth.myTierList)
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async closeTier(){
            await Core.putHttp(`/api/payout/userpayout/${this.mytier.id}/`, {
                    status: 2
                })
                await this.loadMyTier()
        },
        async removeMyTier() {
            let check = confirm('ต้องการยกเลิกสมาชิกหรือไม่')
            if (check) {
                await Core.deleteHttp(`/api/payout/userpayout/${this.mytier.id}/`)
                await this.loadMyTier()
            }
        },

        async removeNewTier(){
            let check = confirm('ต้องการยกเลิกสมาชิกหรือไม่')
            if (check) {
                await Core.deleteHttp(`/api/payout/userpayout/${this.newTier.id}/`)
                await this.loadMyTier()
            }
        },
    },
    computed: {
        endDate() {
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

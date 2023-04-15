<template>
<div class="bg">
    <section data-section-id="1" data-share="" data-category="pricing" class="pt-6 pb-32 bg overflow-hidden" v-if="response">
        <div class="container mx-auto ">
            <div class="max-w-xl">
                <h2 class=" font-heading font-bold text-4xl sm:text-7xl " data-config-id="auto-txt-2-1">Packages</h2>
                <span class="inline-block  text-base" data-config-id="auto-txt-1-1">เลือกรายการที่คุณต้องการ</span>
            </div>
            <div class="flex flex-wrap">

                <div class="w-full md:w-1/3 mt-4" v-for="tier,index in tires" :key="index" @click="chooseTier(tier)">
                    <div class="relative pt-8 px-11 pb-10 bg-white rounded shadow-8xl shadow-lg">
                        <p v-if="tier.recommended" class="absolute right-2 top-2 font-heading px-2.5 py-1 text-base max-w-max bg-orange-100 uppercase tracking-px rounded-full text-gray-900" data-config-id="auto-txt-22-1">แนะนำ</p>
                        <p v-if="tier.by_promotion" class="  right-2 top-2 font-heading px-2.5 py-1 text-base max-w-max bg-orange-500 uppercase tracking-px rounded-full text-white" data-config-id="auto-txt-22-1">โปรโมชัน</p>
                        <h3 class="mb-0.5 font-heading font-semibold text-lg text-gray-900" data-config-id="auto-txt-23-1">{{tier.name}}</h3>
                        <p class="mb-5 text-gray-600 text-sm" data-config-id="auto-txt-24-1">{{tier.description}}</p>
                        <div class="mb-9 flex">
                            <span class="mr-1 mt-0.5 font-heading font-semibold text-lg text-gray-900" data-config-id="auto-txt-25-1">฿</span>
                            <span class="font-heading font-semibold text-6xl sm:text-7xl text-gray-900" data-config-id="auto-txt-26-1">{{tier.price}}</span>
                            <span class="font-heading font-semibold self-end" data-config-id="auto-txt-27-1"> ({{tier.days}} วัน) </span>
                        </div>
                        <div class="group relative mb-9">
                            <div class="absolute top-0 left-0 w-full h-full bg-gradient-green opacity-0 group-hover:opacity-50 p-1 rounded-lg transition ease-out duration-300"></div>
                            <v-btn block color="success">เลือก Package นี้</v-btn>
                        </div>
                        <h4 class="mb-0.5 font-heading font-semibold text-lg text-gray-900" data-config-id="auto-txt-23-1">รายละเอียด:</h4>
                        <p>
                            {{tier.detail}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

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
            tier: Auth.mytier,
            user: Auth.user,
            tires: [],
            response: false,
            oldTier: null
        })
    },
    async created() {

        try {
            await this.$auth.setUser()
            this.user = Auth.user 
            if (!this.user) {
                await this.$router.push(`/auth/register/`)
            } else {
                await this.run();
                this.response = true;
            }
        } catch (error) {
            await this.$router.push(`/auth/register/`)
        }
    },
    methods: {
        async run() {
            try {
                await this.loadTires()
                await this.getOldTierUser()
            } catch (error) {

            }
        },
        async loadTires() {
            let proId = this.$route.query.pro_id
            if (proId) {
                this.tires = await Core.getHttp(`/api/payout/tier/?is_active=true&by_promotion=true&id=${proId}`)
            } else {
                this.tires = await Core.getHttp(`/api/payout/tier/?is_active=true&by_promotion=false`)
            }
        },
        async getOldTierUser() {
            try {
                let oldTier = this.$route.query.old_id
                if (oldTier) {
                    this.oldTier = await Core.getHttp(`/api/payout/userpayout/${oldTier}/`)
                }
            } catch (error) {

            }
        },
        async chooseTier(tier) {
            if (this.oldTier) {
                await this.chooseTierContinue(tier)
            } else {
                let check = await Web.confirm(`ต้องการซื้อ ${tier.name} ?`, `คุณแน่ใจใช่ไหมที่จะยืนยันการสั่งซื้อ Package นี้`)
                if (check) {
                    let checkout = await Core.postHttp(`/api/payout/userpayout/`, {
                        "amount": tier.price,
                        "days": tier.days,
                        "status": 0,
                        "user": this.user.id,
                        "tier": tier.id
                    })
                    if (checkout.id) {
                        await Web.alert(`ยืนยันการซื้อ Package สำเร็จ`)
                        await this.$router.replace(`/payout/checkout/?id=${checkout.id}`)
                    }
                }
            }
        },

        async chooseTierContinue(tier) {
            let check = await Web.confirm(`ต้องการซื้อ ${tier.name} ?`, `คุณแน่ใจใช่ไหมที่จะยืนยันการสั่งซื้อ Package นี้ ต่อจาก ${this.oldTier.tier_name} จำนวนวันที่เหลือจะถูกรวมใน Package ใหม่`)
            if (check) {
                let endDateOldTier = moment(this.oldTier.end_date);
                let startDateNewTier = moment(); 
                let checkout = await Core.postHttp(`/api/payout/userpayout/`, {
                    "amount": tier.price,
                    "days": tier.days, 
                    'start_date': endDateOldTier.format('YYYY-MM-DD'),
                    'end_date': endDateOldTier.add(tier.days, 'days').format('YYYY-MM-DD'),
                    "status": 0,
                    "user": this.user.id,
                    "tier": tier.id,
                    "ect": ` ต่ออายุจาก Package ${this.oldTier.tier_name}  สมัครวันที่ ${startDateNewTier.format("DD/MM/YYYY")} `,
                    "continue_course": true,
                    "continue_course_date": moment().format('YYYY-MM-DD'),
                    "continue_course_data": `ต่ออายุจาก Package ${this.oldTier.tier_name} (โดย Package เดิมสิ้นสุดวันที่ ${endDateOldTier.format("DD/MM/YYYY")} )`
                })
                if (checkout.id) { 
                    await Web.alert(`ยืนยันการซื้อ Package สำเร็จ`)
                    await this.$router.replace(`/account?tab=2`)
                }
            }
        },
 

    }
}
</script>

<style>

</style>

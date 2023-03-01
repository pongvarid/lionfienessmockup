<template>
<div class="p-6 flex flex-col">
    <div class="text-2xl xd">Payments</div>
    <div>
        <v-tabs class="mt-6">
            <v-tab v-for="payment,i in payments" :key="i">
                <v-icon>mdi-credit-card</v-icon>
                <span class="pl-2">{{payment.name}}</span>
            </v-tab>
            <v-tab-item v-for="payment,i in payments" :key="i">
                <div class="p-4">
                    <center>
                        <img style="width:50%; height:50%;" :src="$url+payment.image" alt="">
                    </center>
                    <br>
                    <span>
                        {{payment.detail}}
                    </span>
                </div>
            </v-tab-item>
        </v-tabs>
        <div class="mt-2 p-2">
            <v-file-input label="อัพโหลดหลักฐานการจ่ายเงิน" @change="uploadSlip()" v-model="form.file"></v-file-input>

        </div>
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
export default {
    data: () => {
        return ({
            user: Auth.user,
            myTier: {},
            form: {
                file: {},
            },
            payments: [],
            response: false,
        })
    },
    async mounted() {
        await this.run()
    },
    methods: {
        async run() {
            this.payments = await Core.getHttp(`/api/app/payment/?is_active=true`)
            this.myTier = await Core.getHttp(`/api/payout/userpayout/${this.$route.query.id}/`)
        },
        async uploadSlip() {
            let formData = new FormData();
            formData.append('image_slip', this.form.file);
            let upload = await Core.putHttp(`/api/payout/userpayout/${this.myTier.id}/`, formData)
            if (upload.id) {
                await Web.alert(`อัพโหลดสลิปเรียบร้อย`)
                await this.$router.push(`/account/?tab=2`)
            }
        }
    }
}
</script>

<style>

</style>

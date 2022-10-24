<template>
<div class="p-6 flex flex-col">
    <div class="text-base font-semibold">กรุณาจ่ายเงินเพื่อใช้บริการ </div>
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
        },
        async uploadSlip() {
            let formData = new FormData();
            formData.append('slip', this.form.file);
            let upload = await Core.putHttp(`/api/trainer/trainer-class/${this.$route.query.id}/`, formData)
            if (upload.id) {
                await Web.alert(`อัพโหลดสลิปเรียบร้อย`)
                await this.$emit(`reload`,true)
            }
        }
    }
}
</script>
    
    
<style>
    
    </style>

<template>
<div>
    <div> 
        <v-file-input @change="uploadSlip()" v-model="form.file"></v-file-input>
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
                file:{},
            },
            response: false,
        })
    },
    async mounted(){ 
        await this.run()
    },
    methods:{
        async run(){
            this.myTier = await Core.getHttp(`/api/payout/userpayout/${this.$route.query.id}/`)
        },
        async uploadSlip(){
            let formData = new FormData();
            formData.append('image_slip', this.form.file);
            let upload = await Core.putHttp(`/api/payout/userpayout/${this.myTier.id}/`, formData)
            if(upload.id){
                await Web.alert(`อัพโหลดสลิปเรียบร้อย`)
                await this.$router.push(`/account/?tab=2`)
            }
        }
    }
}
</script>

<style>

</style>

<template>
<div class="p-6 flex flex-col bg2" v-if="response">
    <div class="text-2xl font-semibold">{{$l(`Trainer`,`Trainer`)}}</div>
    <v-tabs v-model="tab">
        <v-tab>
            {{$l(`ข้อมูล Trainer`,`Trainer Info`)}}
        </v-tab>
        <v-tab>
            {{$l(`รายการคอร์ส`,`Course List`)}}
        </v-tab>
        <v-tab>
            {{$l(`ประวัติการเข้าฝึก`,`Training history`)}}
        </v-tab>
        <v-tab-item>
            <div class="p-4" v-if="tab==0">
                <Trainer-Profile :item="item"></Trainer-Profile>
            </div>
        </v-tab-item>
        <v-tab-item>
            <div class="p-4" v-if="tab==1">
                <Trainer-Payout @reload="run()" :item="item"></Trainer-Payout>
            </div>
        </v-tab-item>
        <v-tab-item>
            <div class="p-4" v-if="tab==2">
                <Trainer-CheckinHistory :item="histories"></Trainer-CheckinHistory>
            </div>
        </v-tab-item>
    </v-tabs>  
</div>
</template>

<script>
import moment from 'moment'
export default {
    data: () => {
        return {
            tab:0,
            item: {},
            histories:[],
            response: false,
        };
    },
    async created() {
        this.response = false
        await this.run();
        this.response = true
    },
    methods: {
        async run() {
            this.item = await this.$core.getHttp(`/api/trainer/trainer-class/${this.$route.query.id}/`);
            this.histories = await this.$core.getHttp(`/api/trainer/checkin/?coruse=${this.$route.query.id}`);
            this.item.history_count = this.histories.length
            this.item.history = this.histories
            await this.checkDate();
        },

        async checkDate(){
            let dayCount = this.$2date(moment(),this.item.end_date)
            if(dayCount <= -1){
                await this.$web.alert(this.$l(`คุณไม่สามารถเข้าฝึกได้เนื่องจากคอร์สของคุณหมดอายุแล้ว`,`You cannot enter because your course has expired.`),'error')
                await this.$core.putHttp(`/api/trainer/trainer-class/${this.$route.query.id}/`,{is_active:false})
                await this.$router.go(-1)
            } else {
                
            }
        }
    },
};
</script>

<style>

</style>

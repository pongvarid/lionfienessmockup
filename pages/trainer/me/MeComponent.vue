<template>
<div v-if="response"> 
    <div>
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
                    <Trainer-Profile :classId="classId" :item="item"></Trainer-Profile>
                </div>
            </v-tab-item>
            <v-tab-item>
                <div class="p-4" v-if="tab==1">
                    <Trainer-Payout :classId="classId" @reload="run()" :item="item"></Trainer-Payout>
                </div>
            </v-tab-item>
            <v-tab-item>
                <div class="p-4" v-if="tab==2">
                    <Trainer-CheckinHistory :classId="classId" :item="histories"></Trainer-CheckinHistory>
                </div>
            </v-tab-item>
        </v-tabs>
    </div>

</div>
</template>

    
    
<script>
import moment from 'moment'
export default {
    props: {
        classId: {
            required: true
        },
        toolbar:{
            default: true
        }
    },
    data: () => {
        return {
            tab: 0,
            item: {},
            histories: [],
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
            this.item = await this.$core.getHttp(`/api/trainer/trainer-class/${this.classId}/`);
            this.histories = await this.$core.getHttp(`/api/trainer/checkin/?coruse=${this.classId}`);
            this.item.history_count = this.histories.length
            this.item.history = this.histories
            await this.checkDate();
        },

        async checkDate() {
            let dayCount = this.$2date(moment(), this.item.end_date)
            if (dayCount <= -1) {
                await this.$web.alert(this.$l(`คุณไม่สามารถเข้าฝึกได้เนื่องจากคอร์สของคุณหมดอายุแล้ว`, `You cannot enter because your course has expired.`), 'error')
                await this.$core.putHttp(`/api/trainer/trainer-class/${this.classId}/`, {
                    is_active: false
                })
                await this.$router.go(-1)
            } else {

            }
        }
    },
};
</script>
    
    
<style>
    
    </style>

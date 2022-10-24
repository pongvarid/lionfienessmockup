<template>
<div class="h-screen" v-if="response">
    <div class="p-6 flex flex-col">
        <div class="text-2xl xd">Check In</div>
        <div v-if="response" class="mt-8">
            <v-toolbar color="transparent" flat>
                <v-autocomplete label="เลือกลูกค้า" dense outlined @change="loadData()" v-model="userChoose" :items="users" item-text="full_name" item-value="id"></v-autocomplete>
                <v-spacer></v-spacer>
                <v-btn v-if="userChoose" @click="checkIn()" class="-mt-6" color="success">เช็คชื่อ</v-btn> 
            </v-toolbar> 
            <div v-for="list,i in lists" :key="i">
                <Core-Bar :head="`(${i+1}) วันที่เช็คชื่อ `" :txt="$core.dateX(list.date)">
                    <v-btn @click="removeCheckIn(list.id)" color="error" depressed class="ml-2" x-small fab ><v-icon>mdi-close</v-icon></v-btn>
                </Core-Bar>
                <v-spacer></v-spacer>
            </div> 
        </div>
    </div>
</div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
export default {
    data: () => ({
        users: [],
        userChoose:null,
        trainer:null,
        lists:[],
        classData:null,
        response: false,
    }),
    async created() {
        await this.run();
        this.response = true;
    },
    methods: {
        async run() {
            let trainer = await this.$core.getHttp(`/api/trainer/trainers/?user=${this.$auth.user.id}`);
            if (trainer.length > 0) {
                this.trainer = trainer[0];
                let users = await this.$core.getHttp(`/api/trainer/trainer-class/?is_active=true&status=1&trainer=${trainer[0].id}`)
                this.users = _.map(users, (o) => {
                    let obj = o.user_data
                    obj.full_name = `${obj.nick_name} (${obj.username})`
                    return obj
                })
            }

        },
        async loadData(){
            let users = await this.$core.getHttp(`/api/trainer/trainer-class/?is_active=true&status=1&trainer=${this.trainer.id}&user=${this.userChoose}`)
            if(users.length > 0){
                this.classData = users[0]
                this.lists = await this.$core.getHttp(`/api/trainer/checkin/?user=${this.userChoose}&coruse=${users[0].id}`)
            } 
        },
        async checkIn(){
            let check = confirm("ยืนยันการเช็คชื่อ")
            if(check){
                let data = {
                    user:this.userChoose,
                    coruse:this.classData.id,
                    date:moment().format("YYYY-MM-DD")
                }
                let res = await this.$core.postHttp(`/api/trainer/checkin/`,data)
                if(res){
                    this.$web.alert("เช็คชื่อสำเร็จ")
                    this.loadData()
                }
            }
        },
        async removeCheckIn(id){
            let check = confirm("ยืนยันการลบ")
            if(check){
                let res = await this.$core.deleteHttp(`/api/trainer/checkin/${id}/`)
                if(res){
                    this.$web.alert("ลบสำเร็จ")
                    this.loadData()
                }
            }
        }

    }
}
</script>

<style>

</style>

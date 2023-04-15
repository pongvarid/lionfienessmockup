<template>
<div>
    <h2 class="font-semibold ">Trainer ปัจจุบัน</h2>
    <div v-for="list,i in activeLists" :key="i">
        <v-card outlined class="mt-2">
            <v-card-text  @click="$router.push(`/trainer/me/?id=${list.id}`)">
                <div class="w-full">
                    <div class="flex" v-if="list.trainer_detail">
                        <v-avatar size="100">
                            <v-img :src="$url+list.trainer_detail.image"></v-img>
                        </v-avatar>
                        <div class="ml-2">
                            <h3 v-if="list.course_detail" class="text-black text-base font-semibold mb-0">{{ list.course_detail.name }}</h3>
                            <div>
                                <div v-if="list.trainer_detail" class="text-xl text-black  font-semibold mb-0">KRU. {{ list.trainer_detail.nick_name }}</div>
                                <p style="font-size:14px;">วันที่สิ้นสุด {{$core.convertDate(list.end_date)}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </div>
    <h2 class="font-semibold mt-4">รายการที่รออนุมัติ</h2>
    <div v-if="lists.length > 0   ">
        <div v-for="list,i in lists" :key="i">
            <v-card outlined class="mt-2">
                <v-card-text @click="$router.push(`/trainer/me/?id=${list.id}`)">
                    <div class="w-full">
                        <div class="flex" v-if="list.trainer_detail">
                            <v-avatar size="100">
                                <v-img :src="$url+list.trainer_detail.image"></v-img>
                            </v-avatar>
                            <div class="ml-2">
                                <h3 v-if="list.course_detail" class="text-black text-base font-semibold mb-0">{{ list.course_detail.name }}</h3>
                                <div>
                                    <div v-if="list.trainer_detail" class="text-xl text-black  font-semibold mb-0">KRU. {{ list.trainer_detail.nick_name }}</div>
                                    <p style="font-size:14px;"> รออนุมัติ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn  @click="remove(list)" color="error" depressed block>ยกเลิก</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
    <div v-else>
        <v-btn v-if="activeLists.length < 2" @click="$router.push(`/trainer/list/`)" class="m-2" x-large block depressed>{{$l(`ค้นหา Trainer`,`Searching Trainer`)}}</v-btn>
        <center v-else class="mt-4 p-2">
            <span><v-icon class="mr-2">mdi-information</v-icon>มีการซื้อล่วงหน้าแล้ว</span>
        </center>
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
import _ from 'lodash'
import moment from 'moment'
export default {
    data: () => {
        return {
            activeLists: [],
            lists: [],
            user: Auth.user
        };
    },
    async created() {
        await this.run();
    },
    methods: {
        async run() {
            this.user = await Auth.getUser();
            await this.getList();
            await this.checkExpire();
        },
        async getList() {
            let lists = await this.$core.getHttp(`/api/trainer/trainer-class/?user=${this.user.id}`)
            this.activeLists = _.filter(lists, {
                status: 1,
                is_active: true
            });
            this.lists = _.filter(lists, {
                status: 0
            });
        },
        async remove(list) {
            let check = await Web.confirm('ยืนยันการยกเลิก')
            if (check) {
                let res = await this.$core.putHttp(`/api/trainer/trainer-class/${list.id}/`, {
                    status: 2,
                    is_active: false,
                    ect: 'ยกเลิก'
                })
                if (res) {
                    await Web.alert('ยกเลิกสำเร็จ')
                    await this.getList();
                }
            }

        },
        async checkExpire(){
            let expires = _.filter(this.activeLists,(r)=>{
                let dateCount = this.$2date(moment().format('YYYY-MM-DD'), r.end_date)
                return dateCount < 0
            });
            if(expires.length > 0){
                await Web.alert(this.$l(`คุณมีรายการที่หมดอายุแล้ว กรุณาต่ออายุก่อนใช้งาน`,`You have expired items. Please renew before using`),'info')
                expires.forEach(async (r)=>{
                    await await this.$core.putHttp(`/api/trainer/trainer-class/${r.id}/`,{
                        is_active: false,
                        status: 2,
                        ect : 'หมดอายุ'
                    }) 
                })
                await this.run(); 
            } 
        }

    }
}
</script>

<style>

</style>

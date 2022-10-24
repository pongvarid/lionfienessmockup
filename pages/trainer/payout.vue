<template>
<div class="bg h-screen">
    <section data-section-id="1" data-share="" data-category="pricing" class="pt-6 pb-32  overflow-hidden">
        <div class="container mx-auto ">
            <div class="max-w-xl">
                <h2 class=" font-heading font-bold text-4xl sm:text-7xl " data-config-id="auto-txt-2-1">{{$l(`Packages`,`Packages`)}}</h2>
                <span class="inline-block  text-base" data-config-id="auto-txt-1-1">{{$l(`เลือกรายการที่คุณต้องการ`,`Choose the package you want.`)}}</span>
            </div>
            <div class="flex flex-wrap">

                <div class="w-full md:w-1/3 mt-4" v-for="item,index in items" :key="index" >
                    <div class="relative pt-8 px-11 pb-10 bg-white rounded shadow-8xl shadow-lg">
                        <p v-if="item.recommended" class="absolute right-2 top-2 font-heading px-2.5 py-1 text-base max-w-max bg-orange-100 uppercase tracking-px rounded-full text-gray-900" data-config-id="auto-txt-22-1">แนะนำ</p>
                        <h3 class="mb-0.5 font-heading font-semibold text-lg text-gray-900" data-config-id="auto-txt-23-1">{{item.name}}</h3>
                        <p class="mb-5 text-gray-600 text-sm" data-config-id="auto-txt-24-1">{{item.description}}</p>
                        <div class="mb-9 flex">
                            <span class="mr-1 mt-0.5 font-heading font-semibold text-lg text-gray-900" data-config-id="auto-txt-25-1">฿</span>
                            <span class="font-heading font-semibold text-6xl sm:text-7xl text-gray-900" data-config-id="auto-txt-26-1">{{item.price}}</span>
                            <span class="font-heading font-semibold self-end" data-config-id="auto-txt-27-1"> ({{item.count}} ครั้ง/{{item.day}} วัน) </span>
                        </div>
                        <div class="group relative mb-9">
                            <div class="absolute top-0 left-0 w-full h-full bg-gradient-green opacity-0 group-hover:opacity-50 p-1 rounded-lg transition ease-out duration-300"></div>
                            <v-btn @click="store(item)" block color="success">เลือก Package นี้</v-btn>
                        </div>
                        <p>
                            {{item.ect}}
                        </p>
                    </div> 
                </div>
            </div>
        </div>
    </section> 
</div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
 
export default {
    data: () => {
        return ({
            items: [], 
            response: false,
        })
    },
    async created() {
        await this.run();
        this.response = true
    },
    methods: {
        async run() { 
            this.items = await this.$core.getHttp(`/api/trainer/trainer-coruse/?is_active=true`); 
        },
        async store(item){ 
            let check =  confirm(this.$l(`ยืนยันการสั่งซื้อ Package นี้?`,`Confirm to buy this package?`))
            if(check){
               let save =  await this.$core.postHttp(`/api/trainer/trainer-class/`,{
                    "number": item.count,
                    "end_date": moment().add(item.count, 'days').format('YYYY-MM-DD'),
                    "status": 0, 
                    "is_active": true, 
                    "trainer": this.$route.query.id,
                    "coruse": item.id,
                    "user": this.$auth.user.id
                });
                if(save.id){
                    await this.$web.alert(this.$l(`สั่งซื้อ Package สำเร็จ`,`Buy package success`))
                    await this.$router.replace(`/trainer/me/?id=${save.id}`)
                }
            }
        }
    }
}
</script>

<style>

</style>

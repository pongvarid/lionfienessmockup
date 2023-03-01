<template>
<div  >
   <span class="font-semibold"> My Package</span>
    <div class="w-full  mt-4">
        <div class=" w-full pt-8 px-11 pb-10 bg-green-100 rounded shadow-8xl shadow-lg">
            <h3 class="mb-0.5 font-heading font-semibold text-lg text-gray-900" data-config-id="auto-txt-23-1">{{package.name}}</h3>
            <p class="mb-5 text-gray-600 text-sm" data-config-id="auto-txt-24-1">{{package.description}}</p>
            <div class="mb-9 flex">
                <span class="mr-1 mt-0.5 font-heading font-semibold text-lg text-gray-900" data-config-id="auto-txt-25-1">฿</span>
                <span class="font-heading font-semibold text-6xl sm:text-7xl text-gray-900" data-config-id="auto-txt-26-1">{{package.price}}</span> 
                <span class="font-heading font-semibold self-end text-black" data-config-id="auto-txt-27-1"> ({{package.count}} ครั้ง/{{package.day}} วัน) </span>
            </div> 
            <p>
                {{package.ect}}
            </p>
        </div>
    </div>
    <div v-if="item.status == 0">
            <div v-if="item.slip" class="mt-4"> 
                <center> <img class="h-48" src="@/assets/images/v3/020-volunteer.png" alt=""></center>
              <v-alert type="info"  >
                {{status}}
              </v-alert>
            </div>
            <div v-else>
                <Trainer-SlipUpload @reload="$emit(`reload`,true)"></Trainer-SlipUpload>
            </div>
    </div>
    <div v-else-if="item.status == 1">
        <div class="pt-4">
           <center> <img class="h-48" src="@/assets/images/v3/008-hired.png" alt=""></center>
            <h2 class="font-semibold">{{$l(`รายละเอียด`,`Detail`)}}</h2>
                <Core-Bar head="วันหมดอายุ" :txt="$core.dateTH(item.end_date)"></Core-Bar> 
                <Core-Bar head="จำนวนครั้งที่ใช้" :txt="`${item.history_count}/${item.number} ครั้ง` "></Core-Bar>
             
        </div>
    </div>
    <div v-else>
        <center> <img class="h-48" src="@/assets/images/v3/007-curriculum vitae.png" alt=""></center>
        <v-alert type="error" >
            {{reject}}
        </v-alert>
    </div>

</div>
</template>

<script>
export default {
    props: {
        item: {
            default: {}
        }
    },
    data: () => {
        return {
            package: {},
            response: false,
        };
    },
    async mounted() {
        await this.run();
        this.response = true
    },
    methods: {
        async run() {

            // this.item = await this.$core.getHttp(`/api/trainer/trainer-class/${this.$route.query.id}/`);
            this.package = await this.$core.getHttp(`/api/trainer/trainer-coruse/${this.item.coruse}/`);
        },
    },
    computed: {
        status() {
            return this.$l(`กรุณารอการตรวจสอบ ภายใน 24 ชั่วโมง หลังจากทำการโอนเงิน หากไม่ได้รับการตรวจสอบภายใน 24 ชั่วโมง กรุณาติดต่อแอดมินของ fitness`,`Please wait for verification within 24 hours after the transfer. If not reviewed within 24 hours, please contact fitness admin.`);
        },
        reject(){
            return this.$l(`การชำระเงินไม่ถูกต้อง กรุณาติดต่อแอดมินของ fitness`,`Payment is incorrect. Please contact fitness admin.`);
        }
    }
}
</script>

<style>

</style>

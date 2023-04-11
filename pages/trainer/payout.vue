<template>
<div >
 <v-toolbar dark>
        <v-btn icon @click="$router.go(-1)">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{$l(`Trainer ของฉัน `,`My Trainer`)}}</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
    <div class="p-6 ">
        <span class="font-semibold   text-base" data-config-id="auto-txt-1-1">{{$l(`เลือกรายการที่คุณต้องการ`,`Choose the package you want.`)}}</span>
        <div class="flex flex-wrap ">

            <div class="w-full md:w-1/3 mt-4" v-for="item,index in items" :key="index" >
                <v-card outlined  @click="store(item)" class="bg-card-x" >
                    <v-card-title primary-title> 
                        <v-spacer></v-spacer>
                        <v-chip v-if="item.recommended" outlined color="warning">
                             {{ $l(`แนะนำ`,`Recommended`) }}
                        </v-chip>
                    </v-card-title>
                    <v-card-text>
                        <span  class="font-semibold text-2xl">{{item.name}}</span> 
                        <p>{{item.description}}</p>
                        <div>
                            <hr>
                            {{item.ect}}
                        </div>
                    </v-card-text>
                    <v-card-actions class="p-2">
                        <v-chip color="black">   <h2 class="text-yellow-500 font-semibold text-base" > ฿ {{Number(item.price).toLocaleString()}}</h2></v-chip>
                        <v-spacer></v-spacer>
                        <span class="text-base"> ({{item.count}} ครั้ง/{{item.day}} วัน) </span>
                    </v-card-actions>
                </v-card>
                <!-- <div class="relative pt-8 px-11 pb-10 bg-white rounded shadow-8xl shadow-lg">
                    <p v-if="item.recommended" class="absolute right-2 top-2 font-heading px-2.5 py-1 text-base max-w-max bg-orange-100 
                    uppercase tracking-px rounded-full text-gray-900" data-config-id="auto-txt-22-1">แนะนำ</p>
                    <h3 class="mb-0.5 font-heading font-semibold text-lg text-gray-900" data-config-id="auto-txt-23-1">{{item.name}}</h3>
                    <p class="mb-5 text-gray-600 text-sm" data-config-id="auto-txt-24-1">{{item.description}}</p>
                    <div class="mb-9 flex">
                        <span class="mr-1 mt-0.5 font-heading font-semibold text-lg text-gray-900" data-config-id="auto-txt-25-1">฿</span>
                        <span class="font-heading font-semibold text-6xl sm:text-7xl text-gray-900" data-config-id="auto-txt-26-1">{{item.price}}</span>
                        <span class="font-heading font-semibold self-end" data-config-id="auto-txt-27-1"></span>
                    </div>
                    <div class="group relative mb-9">
                        <div class="absolute top-0 left-0 w-full h-full bg-gradient-green opacity-0 group-hover:opacity-50 p-1 rounded-lg transition ease-out duration-300"></div>
                        <v-btn @click="store(item)" block color="success">เลือก Package นี้</v-btn>
                    </div>
                    <p>
                        {{item.ect}}
                    </p>
                </div>  -->
            </div>
            <br><br><br>   <br><br><br>   <br><br><br>
        </div>
    </div>
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
    .bg-trainerx{
        background-size: cover;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='600' height='1440' preserveAspectRatio='none' viewBox='0 0 600 1440'%3e%3cg mask='url(%26quot%3b%23SvgjsMask2316%26quot%3b)' fill='none'%3e%3crect width='221.76' height='221.76' clip-path='url(%26quot%3b%23SvgjsClipPath2317%26quot%3b)' x='263.46' y='499.01' fill='url(%23SvgjsPattern2318)' transform='rotate(221.61%2c 374.34%2c 609.89)'%3e%3c/rect%3e%3crect width='317.56' height='317.56' clip-path='url(%26quot%3b%23SvgjsClipPath2319%26quot%3b)' x='-23.72' y='990.8' fill='url(%23SvgjsPattern2320)' transform='rotate(66.42%2c 135.06%2c 1149.58)'%3e%3c/rect%3e%3crect width='300' height='300' clip-path='url(%26quot%3b%23SvgjsClipPath2321%26quot%3b)' x='344.1' y='817.04' fill='url(%23SvgjsPattern2322)' transform='rotate(279.01%2c 494.1%2c 967.04)'%3e%3c/rect%3e%3crect width='332.4' height='332.4' clip-path='url(%26quot%3b%23SvgjsClipPath2323%26quot%3b)' x='320.87' y='590.3' fill='url(%23SvgjsPattern2324)' transform='rotate(176.87%2c 487.07%2c 756.5)'%3e%3c/rect%3e%3crect width='276' height='276' clip-path='url(%26quot%3b%23SvgjsClipPath2325%26quot%3b)' x='50.88' y='321.08' fill='url(%23SvgjsPattern2326)' transform='rotate(349.21%2c 188.88%2c 459.08)'%3e%3c/rect%3e%3cpath d='M539.15 478.69a5.6 5.6 0 1 0-8.21 7.61 5.6 5.6 0 1 0 8.21-7.61zM527.42 489.56a5.6 5.6 0 1 0-8.22 7.61 5.6 5.6 0 1 0 8.22-7.61zM515.68 500.44a5.6 5.6 0 1 0-8.21 7.61 5.6 5.6 0 1 0 8.21-7.61zM503.95 511.31a5.6 5.6 0 1 0-8.22 7.61 5.6 5.6 0 1 0 8.22-7.61zM551.75 445.2a5.6 5.6 0 1 0-8.21 7.61 5.6 5.6 0 1 0 8.21-7.61zM540.01 456.07a5.6 5.6 0 1 0-8.21 7.62 5.6 5.6 0 1 0 8.21-7.62zM528.28 466.95a5.6 5.6 0 1 0-8.22 7.61 5.6 5.6 0 1 0 8.22-7.61zM516.54 477.82a5.6 5.6 0 1 0-8.21 7.62 5.6 5.6 0 1 0 8.21-7.62z' fill='rgba(231%2c 54%2c 53%2c 0.36)'%3e%3c/path%3e%3cpath d='M307.54 1238.86a5.6 5.6 0 1 0-1.52 11.1 5.6 5.6 0 1 0 1.52-11.1zM305.37 1254.71a5.6 5.6 0 1 0-1.52 11.1 5.6 5.6 0 1 0 1.52-11.1zM303.2 1270.57a5.6 5.6 0 1 0-1.51 11.09 5.6 5.6 0 1 0 1.51-11.09zM301.04 1286.42a5.6 5.6 0 1 0-1.52 11.1 5.6 5.6 0 1 0 1.52-11.1zM296.03 1204.99a5.6 5.6 0 1 0-1.52 11.1 5.6 5.6 0 1 0 1.52-11.1zM293.86 1220.84a5.6 5.6 0 1 0-1.52 11.1 5.6 5.6 0 1 0 1.52-11.1zM291.69 1236.69a5.6 5.6 0 1 0-1.52 11.1 5.6 5.6 0 1 0 1.52-11.1zM289.52 1252.55a5.6 5.6 0 1 0-1.52 11.09 5.6 5.6 0 1 0 1.52-11.09z' stroke='rgba(3%2c 123%2c 11%2c 0.27)' stroke-width='2.13' stroke-dasharray='3%2c 2'%3e%3c/path%3e%3crect width='129' height='129' clip-path='url(%26quot%3b%23SvgjsClipPath2327%26quot%3b)' x='-53.11' y='1253.65' fill='url(%23SvgjsPattern2328)' transform='rotate(333%2c 11.39%2c 1318.15)'%3e%3c/rect%3e%3ccircle r='81.37249608693635' cx='403.52' cy='487.88' fill='rgba(3%2c 123%2c 11%2c 0.27)'%3e%3c/circle%3e%3cpath d='M81.95 313.87L93.79 318.74 91.64 331.36 103.48 336.23 101.33 348.85 113.18 353.72 111.02 366.35' stroke='rgba(247%2c 95%2c 226%2c 0.28)' stroke-width='1' stroke-dasharray='4%2c 4'%3e%3c/path%3e%3crect width='283.52' height='283.52' clip-path='url(%26quot%3b%23SvgjsClipPath2329%26quot%3b)' x='310.63' y='1204.97' fill='url(%23SvgjsPattern2330)' transform='rotate(62.24%2c 452.39%2c 1346.73)'%3e%3c/rect%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask2316'%3e%3crect width='600' height='1440' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cpattern x='0' y='0' width='13.86' height='13.86' patternUnits='userSpaceOnUse' id='SvgjsPattern2318'%3e%3cpath d='M0 13.86L6.93 0L13.86 13.86' stroke='rgba(211%2c 183%2c 20%2c 0.26)' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2317'%3e%3ccircle r='55.44' cx='374.34' cy='609.89'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='9.34' height='9.34' patternUnits='userSpaceOnUse' id='SvgjsPattern2320'%3e%3cpath d='M4.67 1L4.67 8.34M1 4.67L8.34 4.67' stroke='rgba(231%2c 54%2c 53%2c 0.36)' fill='none' stroke-width='1'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2319'%3e%3ccircle r='79.39' cx='135.06' cy='1149.58'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern2322'%3e%3cpath d='M0 6L3 0L6 6' stroke='rgba(247%2c 95%2c 226%2c 0.28)' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2321'%3e%3ccircle r='75' cx='494.1' cy='967.04'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='332.4' height='11.08' patternUnits='userSpaceOnUse' id='SvgjsPattern2324'%3e%3crect width='332.4' height='5.54' x='0' y='0' fill='rgba(95%2c 107%2c 247%2c 0.28)'%3e%3c/rect%3e%3crect width='332.4' height='5.54' x='0' y='5.54' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2323'%3e%3ccircle r='83.1' cx='487.07' cy='756.5'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern2326'%3e%3cpath d='M3 1L3 5M1 3L5 3' stroke='rgba(211%2c 183%2c 20%2c 0.26)' fill='none' stroke-width='1'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2325'%3e%3ccircle r='69' cx='188.88' cy='459.08'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='12.9' height='12.9' patternUnits='userSpaceOnUse' id='SvgjsPattern2328'%3e%3cpath d='M6.45 1L6.45 11.9M1 6.45L11.9 6.45' stroke='rgba(95%2c 107%2c 247%2c 0.28)' fill='none' stroke-width='4.08'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2327'%3e%3ccircle r='32.25' cx='11.39' cy='1318.15'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='8.86' height='8.86' patternUnits='userSpaceOnUse' id='SvgjsPattern2330'%3e%3cpath d='M4.43 1L4.43 7.859999999999999M1 4.43L7.859999999999999 4.43' stroke='rgba(3%2c 123%2c 11%2c 0.27)' fill='none' stroke-width='1'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2329'%3e%3ccircle r='70.88' cx='452.39' cy='1346.73'%3e%3c/circle%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
    }
    .bg-card-x{
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1129%26quot%3b)' fill='none'%3e%3cpath d='M121.98 71.78L221.57 129.28L221.57 244.28L121.98 301.78L22.38 244.28L22.38 129.28zM619.95 -100.72L719.55 -43.22L719.55 71.78L619.95 129.28L520.36 71.78L520.36 -43.22zM719.55 416.78L819.15 474.28L819.15 589.28L719.55 646.78L619.95 589.28L619.95 474.28zM819.15 244.28L918.74 301.78L918.74 416.78L819.15 474.28L719.55 416.78L719.55 301.78zM918.74 416.78L1018.34 474.28L1018.34 589.28L918.74 646.78L819.15 589.28L819.15 474.28zM1217.53 244.28L1317.12 301.78L1317.12 416.78L1217.53 474.28L1117.93 416.78L1117.93 301.78zM1416.72 -100.72L1516.32 -43.22L1516.32 71.78L1416.72 129.28L1317.12 71.78L1317.12 -43.22z' stroke='rgba(237%2c 204%2c 124%2c 0.39)' stroke-width='2'%3e%3c/path%3e%3cpath d='M110.48 71.78 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM210.07 129.28 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM210.07 244.28 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM110.48 301.78 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM10.88 244.28 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM10.88 129.28 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM608.45 -100.72 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM708.05 -43.22 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM708.05 71.78 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM608.45 129.28 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM508.86 71.78 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM508.86 -43.22 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM708.05 416.78 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM807.65 474.28 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM807.65 589.28 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM708.05 646.78 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM608.45 589.28 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM608.45 474.28 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM807.65 244.28 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM907.24 301.78 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM907.24 416.78 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM708.05 301.78 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1006.84 474.28 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1006.84 589.28 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM907.24 646.78 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1206.03 244.28 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1305.62 301.78 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1305.62 416.78 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1206.03 474.28 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1106.43 416.78 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1106.43 301.78 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1405.22 -100.72 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1504.82 -43.22 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1504.82 71.78 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1405.22 129.28 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1305.62 71.78 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1305.62 -43.22 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0z' fill='rgba(237%2c 204%2c 124%2c 0.39)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1129'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
        background-size: cover;
    }
</style>

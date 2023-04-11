<template>
<div v-if="response">
    
    <div class="p-6 flex flex-col trainer-bg">
        <div class="text-base font-semibold  ">{{$l(`ค้นหา Trainer ที่ตรงกับคุณ`,`Searching Your Trainer`)}}</div>
        <div v-for="item,i in items" :key="i" class="mt-6"> 
            <v-card outlined v-if="item.user_detail" @click="$router.push(`/trainer/payout/?id=${item.id}`)">
                <div class="d-flex flex-no-wrap justify-space-between ttcard">
                    <div>
                        <v-card-title ><span class="text-sm ">KRU.</span></v-card-title>

                        <v-card-subtitle ><span  class="text-3xl " > {{item.user_detail.nick_name}}</span></v-card-subtitle>

                        <!-- <v-card-actions> 
                            <v-btn @click="$router.push(`/trainer/payout/?id=${item.id}`)" outlined rounded text>
                                {{$l(`เลือก Trainer คนนี้`,`Select This Trainer`)}}
                            </v-btn>
                        </v-card-actions> -->
                    </div> 
                    <v-avatar class="m-4 rounded shadow-2xl" size="125"  tile>
                        <v-img class=" shadow-xl" :src="$url+item.user_detail.image"></v-img>
                    </v-avatar>
                </div>
            </v-card>
        </div>
    </div>
</div>
</template>

<script>
import {
    Core
} from "@/vuexes/core";
import {
    Web
} from "@/vuexes/web";
import {
    Auth
} from "@/vuexes/auth";
import _ from "lodash";
import moment from "moment";
export default {
    data: () => {
        return {
            req: v => !!v || "ฟิลด์ด์นี้ต้องระบุข้อมูล",
            items: [],
            form: {},
            core: Core,
            dialog: false,
            response: false
        };
    },
    async created() {
        await this.run();
        this.response = true
    },
    methods: {
        async run() {
            this.items = await Core.getHttp(`/api/trainer/trainers/?is_active=true`);

        },

    }
}
</script>
   
 <style>
.trainer-bg{
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='600' height='1440' preserveAspectRatio='none' viewBox='0 0 600 1440'%3e%3cg mask='url(%26quot%3b%23SvgjsMask2268%26quot%3b)' fill='none'%3e%3cpath d='M495.29 912.16L493.15 899.53 505 894.67 502.85 882.05 514.7 877.19 512.56 864.56 524.41 859.7M502.29 916.04L500.14 903.42 511.99 898.55 509.85 885.93 521.7 881.07 519.56 868.44 531.4 863.58M509.28 919.92L507.14 907.3 518.99 902.44 516.84 889.81 528.69 884.95 526.55 872.32 538.4 867.46' stroke='rgba(247%2c 95%2c 226%2c 0.28)' stroke-width='2.18' stroke-dasharray='4%2c 4'%3e%3c/path%3e%3crect width='168' height='168' clip-path='url(%26quot%3b%23SvgjsClipPath2269%26quot%3b)' x='167.55' y='368.46' fill='url(%23SvgjsPattern2270)' transform='rotate(229.53%2c 251.55%2c 452.46)'%3e%3c/rect%3e%3crect width='260.4' height='260.4' clip-path='url(%26quot%3b%23SvgjsClipPath2271%26quot%3b)' x='122.99' y='287.11' fill='url(%23SvgjsPattern2272)' transform='rotate(88.08%2c 253.19%2c 417.31)'%3e%3c/rect%3e%3cpath d='M7.7 331.51L20.42 330.04 24.65 342.13 37.37 340.65 41.6 352.74 54.32 351.26 58.55 363.35' stroke='rgba(3%2c 123%2c 11%2c 0.27)' stroke-width='2.65' stroke-dasharray='2%2c 2'%3e%3c/path%3e%3crect width='202.56' height='202.56' clip-path='url(%26quot%3b%23SvgjsClipPath2273%26quot%3b)' x='271.83' y='802.26' fill='url(%23SvgjsPattern2274)' transform='rotate(176.73%2c 373.11%2c 903.54)'%3e%3c/rect%3e%3cpath d='M391.84 167.95L386.09 179.4 373.66 176.3 367.92 187.75 355.49 184.66 349.74 196.1 337.32 193.01' stroke='rgba(247%2c 95%2c 226%2c 0.28)' stroke-width='2.81'%3e%3c/path%3e%3cpath d='M173.81 291.17L177.51 278.91 190.29 279.84 193.99 267.58 206.76 268.5 210.47 256.24 223.24 257.16M178.34 297.76L182.05 285.5 194.82 286.43 198.52 274.17 211.3 275.09 215 262.83 227.77 263.75' stroke='rgba(247%2c 95%2c 226%2c 0.28)' stroke-width='1.85' stroke-dasharray='3%2c 3'%3e%3c/path%3e%3crect width='370.08' height='370.08' clip-path='url(%26quot%3b%23SvgjsClipPath2275%26quot%3b)' x='238.32' y='48.49' fill='url(%23SvgjsPattern2276)' transform='rotate(64.3%2c 423.36%2c 233.53)'%3e%3c/rect%3e%3ccircle r='50' cx='11.58' cy='1233.11' fill='rgba(211%2c 183%2c 20%2c 0.26)'%3e%3c/circle%3e%3crect width='261.6' height='261.6' clip-path='url(%26quot%3b%23SvgjsClipPath2277%26quot%3b)' x='141.51' y='768.72' fill='url(%23SvgjsPattern2278)' transform='rotate(233.46%2c 272.31%2c 899.52)'%3e%3c/rect%3e%3crect width='159.88' height='159.88' clip-path='url(%26quot%3b%23SvgjsClipPath2279%26quot%3b)' x='76.44' y='634.66' fill='url(%23SvgjsPattern2280)' transform='rotate(205.97%2c 156.38%2c 714.6)'%3e%3c/rect%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask2268'%3e%3crect width='600' height='1440' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern2270'%3e%3cpath d='M3 1L3 5M1 3L5 3' stroke='rgba(211%2c 183%2c 20%2c 0.26)' fill='none' stroke-width='1'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2269'%3e%3ccircle r='42' cx='251.55' cy='452.46'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='13.02' height='13.02' patternUnits='userSpaceOnUse' id='SvgjsPattern2272'%3e%3cpath d='M6.51 1L6.51 12.02M1 6.51L12.02 6.51' stroke='rgba(211%2c 183%2c 20%2c 0.26)' fill='none' stroke-width='4.6'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2271'%3e%3ccircle r='65.1' cx='253.19' cy='417.31'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='202.56' height='12.66' patternUnits='userSpaceOnUse' id='SvgjsPattern2274'%3e%3crect width='202.56' height='6.33' x='0' y='0' fill='rgba(211%2c 183%2c 20%2c 0.26)'%3e%3c/rect%3e%3crect width='202.56' height='6.33' x='0' y='6.33' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2273'%3e%3ccircle r='50.64' cx='373.11' cy='903.54'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='10.28' height='10.28' patternUnits='userSpaceOnUse' id='SvgjsPattern2276'%3e%3cpath d='M0 10.28L5.14 0L10.28 10.28' stroke='rgba(247%2c 95%2c 226%2c 0.28)' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2275'%3e%3ccircle r='92.52' cx='423.36' cy='233.53'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='13.08' height='13.08' patternUnits='userSpaceOnUse' id='SvgjsPattern2278'%3e%3cpath d='M6.54 1L6.54 12.08M1 6.54L12.08 6.54' stroke='rgba(3%2c 123%2c 11%2c 0.27)' fill='none' stroke-width='4.93'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2277'%3e%3ccircle r='65.4' cx='272.31' cy='899.52'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='159.88' height='11.42' patternUnits='userSpaceOnUse' id='SvgjsPattern2280'%3e%3crect width='159.88' height='5.71' x='0' y='0' fill='rgba(95%2c 107%2c 247%2c 0.28)'%3e%3c/rect%3e%3crect width='159.88' height='5.71' x='0' y='5.71' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath2279'%3e%3ccircle r='39.97' cx='156.38' cy='714.6'%3e%3c/circle%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
    background-size: cover;
}
.ttcard{
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1124%26quot%3b)' fill='none'%3e%3cpath d='M301.14 464.69L400.73 522.19L400.73 637.19L301.14 694.69L201.54 637.19L201.54 522.19zM400.73 292.19L500.33 349.69L500.33 464.69L400.73 522.19L301.14 464.69L301.14 349.69zM500.33 464.69L599.92 522.19L599.92 637.19L500.33 694.69L400.73 637.19L400.73 522.19zM699.52 119.69L799.12 177.19L799.12 292.19L699.52 349.69L599.92 292.19L599.92 177.19zM699.52 464.69L799.12 522.19L799.12 637.19L699.52 694.69L599.92 637.19L599.92 522.19zM799.12 -52.81L898.71 4.69L898.71 119.69L799.12 177.19L699.52 119.69L699.52 4.69zM998.31 292.19L1097.9 349.69L1097.9 464.69L998.31 522.19L898.71 464.69L898.71 349.69zM1097.9 464.69L1197.5 522.19L1197.5 637.19L1097.9 694.69L998.31 637.19L998.31 522.19zM1197.5 -52.81L1297.09 4.69L1297.09 119.69L1197.5 177.19L1097.9 119.69L1097.9 4.69zM1297.09 119.69L1396.69 177.19L1396.69 292.19L1297.09 349.69L1197.5 292.19L1197.5 177.19zM1496.29 464.69L1595.88 522.19L1595.88 637.19L1496.29 694.69L1396.69 637.19L1396.69 522.19z' stroke='rgba(237%2c 204%2c 124%2c 0.39)' stroke-width='2'%3e%3c/path%3e%3cpath d='M289.64 464.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM389.23 522.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM389.23 637.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM289.64 694.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM190.04 637.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM190.04 522.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM389.23 292.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM488.83 349.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM488.83 464.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM289.64 349.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM588.42 522.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM588.42 637.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM488.83 694.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM688.02 119.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM787.62 177.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM787.62 292.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM688.02 349.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM588.42 292.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM588.42 177.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM688.02 464.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM787.62 522.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM787.62 637.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM688.02 694.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM787.62 -52.81 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM887.21 4.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM887.21 119.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM688.02 4.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM986.81 292.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1086.4 349.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1086.4 464.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM986.81 522.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM887.21 464.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM887.21 349.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1186 522.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1186 637.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1086.4 694.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM986.81 637.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1186 -52.81 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1285.59 4.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1285.59 119.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1186 177.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1086.4 119.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1086.4 4.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1385.19 177.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1385.19 292.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1285.59 349.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1186 292.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1484.79 464.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1584.38 522.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1584.38 637.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1484.79 694.69 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1385.19 637.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0zM1385.19 522.19 a11.5 11.5 0 1 0 23 0 a11.5 11.5 0 1 0 -23 0z' fill='rgba(237%2c 204%2c 124%2c 0.39)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1124'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
    background-size: cover;
}
</style>
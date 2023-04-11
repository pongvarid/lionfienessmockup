<template>
<div >
    <v-toolbar dark>
        <v-btn icon @click="$router.go(-1)">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{$l("ข้อตกลงและเงื่อนไขการใช้งาน","Terms of Use")}}</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
    <div class="p-6">
        <center>
            <img class="h-40" src="@/assets/images/v3/005-certificate.png" alt="">
        </center> 
        <div class="text-sm mt-2">{{$l("เมื่อท่านเข้าใช้งานเว็บไซต์นี้ หรือใช้บริการของเรา หมายถึงท่านยอมรับข้อตกลงและเงื่อนไขการใช้งานนี้ทั้งหมด","When you access this website or use our services means you accept all terms and conditions of use")}}</div>
        <br>
        <v-expansion-panels v-model="tab"     >
            <v-expansion-panel v-for="(item,i) in data" :key="i">
                <v-expansion-panel-header>
                    <h2 class="font-semibold">{{ item.name }}</h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div style="font-size:14px;" v-html="item.detail"> 
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</div>
</template>

    
    
<script>
export default {
    data: () => ({
        data: {},
        tab:[1,]
    }),
    async created() {
        let data = await this.$core.getHttp(`/api/fitness/pdpa/`)
        this.data = data
    }
}
</script>
    
    
<style>
    
    </style>

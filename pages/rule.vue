<template>
<div  >
    <v-toolbar dark>
        <v-btn icon @click="$router.go(-1)">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{$l("กฎของฟิตเนส","Fitness Rules")}}</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
    <div class="p-6">
        <center>
            <img class="h-40" src="@/assets/images/v3/015-online interview.png" alt="">
        </center> 
        <br>
        <v-expansion-panels v-model="tab"     >
            <v-expansion-panel v-for="(item,i) in data" :key="i">
                <v-expansion-panel-header>
                    <h2 class="font-semibold">{{ item.name }}</h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div style="font-size:14px;" v-html="item.description"> 
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
    }),
    async created() {
        let data = await this.$core.getHttp(`/api/fitness/rules/`)
        this.data = data
    }
}
</script>

<style>

</style>

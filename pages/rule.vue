<template>
<div class="h-screen">
    <div class="p-6">
        <center>
            <img class="h-40" src="@/assets/images/v3/015-online interview.png" alt="">
        </center>
        <center><h2 class="font-semibold text-xl">{{data.name}}</h2></center>
        <div class="mt-4" v-html="data.description"> 
        </div>
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
        if (data.length > 0) {
            this.data = data[0]
        }
    }
}
</script>

<style>

</style>

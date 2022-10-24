<template>
    <div> 
        <center> <img class="h-48" src="@/assets/images/v3/013-medical report.png" alt=""></center>
        <Core-Bar head="วันที่เข้าฝึก" :txt="$core.dateTH(data.date)" v-for="data,i in item" :key="i"></Core-Bar>
    </div>
</template>

<script>
export default {
    props:{
        item:{
            default:{}
        }
    }, 
}
</script>

<style>

</style>
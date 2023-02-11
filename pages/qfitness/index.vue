<template>
<div class="p-6 flex flex-col">
    <div class="text-2xl font-semibold">{{$l(`การให้คะแนนฟิตเนส`,`Fitness Ratings`)}}</div>
    <v-form ref="form" v-if="response">
        <div v-for="q,i in questions" :key="i" class="mt-6">
            <h2 class="font-semibold">{{q.name}}</h2>
            <v-select :rules="[required]" :items="[1,2,3,4,5]" v-model="q.score" label="เลือกคะแนน"></v-select>
        </div>
        <v-toolbar color="transparent" flat>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submit()" >ส่งข้อมูล</v-btn>
        </v-toolbar>
    </v-form>
    <div v-else>
     <center class="mt-6">
        <img class="h-40" src="@/assets/images/v2/013-workout.png" alt="">
        <h2 class="mt-4 font-semibold text-xl">{{$l(`ขอบคุณที่ร่วมเป็นส่วนหนึ่งกับเรา`,`Thank you for being a part of us.`)}} </h2>
        <span>{{thank}}</span>
     </center>
    </div>

</div>
</template>

<script>
export default {
    data: () => ({
        required: value => !!value || 'Required.',
        questions: [],
        myRes:[],
        response:false,
    }),
    async created() {

        await this.run();

    },
    methods:{
        async run(){
            this.questions = await this.$core.getHttp(`/api/exercise/questionnairefitness/`)
            this.myRes = await this.$core.getHttp(`/api/exercise/questionnairefitnessdetail/?user=${this.$auth.user.id}`)
            if(this.myRes.length <= 0){
                this.response = true;
            }else{
                this.response = false;
            }

        },
        async submit(){
            if(this.$refs.form.validate()){
                let check = confirm('ยืนยันการส่งข้อมูล')
                if(check){
                    for (let index = 0; index < this.questions.length; index++) {
                         let data = await this.$core.postHttp(`/api/exercise/questionnairefitnessdetail/`,{
                            "score": this.questions[index].score,
                            "question": this.questions[index].id,
                            "user": this.$auth.user.id
                         })
                        
                    }
                    await this.$web.alert('ส่งข้อมูลสำเร็จ')
                    await this.run()
                }
            }
        }
    },
    computed: {
        thank() {
            return this.$l(`ขอบคุณที่ให้คะแนน เราจะนำข้อคิดเห็นของท่าน ไปปรับปรุงการบริการของเราให้ดียิ่งขึ้น`, `Thank you for rating We will take your comments. to improve our service even further.`);
        }
    }
}
</script>

<style>

</style>

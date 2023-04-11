<template>
<div>
    <center> 
        <v-img v-if="user.image" class="rounded-full h-40 w-40 mt-6" :src="`${$url}/${user.image}`" alt=""></v-img>
        <img v-else class="rounded-full h-40 w-40 mt-6" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyHnAAxZw7h-1IEUa5LF2MmLteCLb46LkypKTf1xI&s" alt="">
    </center>
    <v-form class="w-full mt-6"  >
        <v-text-field readonly v-model="user.nick_name" label="ชื่อเล่น" id="id"></v-text-field>
        <v-text-field readonly :value="user.first_name" label="ชื่อ" id="id"></v-text-field>
        <v-text-field readonly :value="user.last_name" label="นาสกุล" id="id"></v-text-field> 
        <v-text-field readonly v-model="user.tel" label="เบอร์โทร" id="id"></v-text-field> 
    </v-form>
</div>
</template>

  
  
<script>
export default {
    props: {
        item: {
            default: {}
        },
        classId: {
            default: null
        }
    },
    data: () => {
        return {
            user: {},
            dialog: false,
            myClass: null,
        };
    },
    async mounted() {
        await this.run();
    },
    methods: {
        async run() {
            let item = await this.$core.getHttp(`/api/trainer/trainer-class/${(this.classId)?this.classId:this.$route.query.id}/`); 
            let user = await this.$core.getHttp(`/api/trainer/trainers/${item.trainer}/`);
            this.user = user.user_detail
        }
    }
}
</script>
  
  
<style>
  
  </style>

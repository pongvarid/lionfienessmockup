<template>
    <div >
        <v-toolbar dark  >
            <v-btn icon @click="$router.go(-1)">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            <v-toolbar-title>{{$l(`ประวัติ`,`History`)}}</v-toolbar-title>
            <v-spacer></v-spacer> 
          </v-toolbar>
          <div class="bg h-screen" v-if="response"> 
            <Class-Checkin v-if="user.is_coach"></Class-Checkin>
            <Class-History v-else></Class-History>
           <br>
           <br>
           <br>
           <br>
           <br>
           <br>
          </div> 
    </div>
 
</template>

<script>
    import {Course} from '@/vuexes/course'
    import {Core} from '@/vuexes/core'
    import {Auth} from '@/vuexes/auth'
export default {
    data: () => {
        return ({
            core: Core,
            courses: [],
            user: Auth.user,
            response: false,
        })
    },
    async mounted(){
        
        await this.run()
    },
    methods:{
        async run(){
            if (!this.user) {
                await this.$router.push(`/auth/login/`)
            } else {
            this.user = await Auth.getUser();
            this.response = true
            }
        }
    }
}
</script>

<style>

</style>
<template>
<div  class="h-screen account-bg">
    <v-toolbar dark>
        <v-btn icon @click="$router.go(-1)">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{$l(`ประวัติ`,`History`)}}</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
    <div v-if="response">
        <v-tabs v-model="tab" color="primary" >
            <v-tab>
                {{$l(`ประวัติการซื้อ Package`,`My Packages`)}}
            </v-tab>
            <v-tab-item>
                <div v-if="tab == 0">
                    <History-Packages></History-Packages>
                </div>
            </v-tab-item>
            <v-tab>
                {{$l(`เทรนเนอร์`,`My Trainers`)}}
            </v-tab>
            <v-tab-item>
                <div v-if="tab == 1">
                    <History-Trainers></History-Trainers>
                </div>
            </v-tab-item>
            <v-tab>
                {{$l(`จองคลาสเรียน`,`Class Register`)}}
            </v-tab>
            <v-tab-item >
                <div v-if="tab == 2">
                    <History-Classes></History-Classes>
                </div>
            </v-tab-item>

        </v-tabs>
    </div>

</div>
<!-- <div >
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
    </div> -->
</template>

<script>
import {
    Course
} from '@/vuexes/course'
import {
    Core
} from '@/vuexes/core'
import {
    Auth
} from '@/vuexes/auth'
export default {
    data: () => {
        return ({
            tab: 0,
            core: Core,
            courses: [],
            user: Auth.user,
            response: false,
        })
    },
    async mounted() {

        await this.run()

    },
    methods: {
        async run() {
            try {
                this.user = await Auth.getUser()
                if (!this.user) {
                    await this.$router.push(`/auth/login/`)
                } else {
                    this.user = await Auth.getUser();
                    this.response = true
                    if(this.$route.query.tab){
                        this.tab = Number(this.$route.query.tab)
                    }
                }
            } catch (error) {
                await this.$router.push(`/auth/login/`)
            }
        }
    }
}
</script>

<style>

</style>

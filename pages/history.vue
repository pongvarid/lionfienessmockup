<template>
  <div class="bg h-screen" v-if="response"> 
    <Class-Checkin v-if="user.is_coach"></Class-Checkin>
    <Class-History v-else></Class-History>
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
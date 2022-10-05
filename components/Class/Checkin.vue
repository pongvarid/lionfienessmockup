<template>
<div>
    <div class="p-6 flex flex-col">
        <div class="text-2xl xd">Check In</div>
        <div class="p-1 mt-4" v-for="course,i in courses" :key="i">
            <v-card class="rounded-lg" v-if="course" @click="$router.push(`/checkin/?id=${course.id}`)">

                <img v-if="course.image1" :src="$url+course.image1" alt="">
                <img v-else src="@/assets/images/c1.png" alt="">
                <v-card-actions>
                    <div class="w-full">
                        <div>
                            <h2 class="font-semibold">{{course.name}}</h2>
                        </div> 
                    </div>
                </v-card-actions>
            </v-card>
        </div> 
    </div>
</div>
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
            this.user = await Auth.getUser();
            await Course.getClass()
            this.courses = Course.classes
            this.response = true
        }
    }
}
</script>

<style>

</style>

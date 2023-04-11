<template>
<div class="p-6 flex flex-col"> 
    <div class="p-1 mt-4" v-for="course,i in courses" :key="i">
        <v-card class="rounded-lg" v-if="course.course_data" @click="$router.push(`/class/${course.course_data.id}/`)">
        <v-img v-if="course.course_data.image_1" :src="$url+course.course_data.image_1" :width="auto" :height="180"></v-img>
           <img v-else src="@/assets/images/c1.png" alt="">
            <v-card-actions>
                <div class="w-full">
                    <div>
                        <h2 class="font-semibold">{{course.course_data.name}}</h2>
                    </div>
                    <div class="flex w-full">
                        <span class="text-xs">{{core.dateX(course.date)}}</span>
                        <v-spacer></v-spacer>
                        <span v-if="!course.missing" class="font-semibold text-xs text-green-600">
                            <v-icon color="success" size="16">mdi-check-circle</v-icon> เข้าคลาสแล้ว
                        </span>
                        <span v-else class="font-semibold text-xs text-red-600">
                            <v-icon color="error" size="16">mdi-close-circle</v-icon> ไม่ได้เข้าคลาส
                        </span>
                    </div>
                </div>
            </v-card-actions>
        </v-card>
    </div>

</div>
</template>

    
    
<script>
import {
    Auth
} from '@/vuexes/auth'
import {
    Course
} from '@/vuexes/course'
import {
    Core
} from '@/vuexes/core'
export default {
    data: () => {
        return ({
            core: Core,
            courses: [],
            user: Auth.user,
            response: false,
        })
    },
    async created() {
        if (!this.user) {
            await this.$router.push(`/auth/login/`)
        } else {
            this.courses = await Course.getMyCheckIn(this.user.id);
            this.response = true;
        }
    },
    methods: {
        async getMyCheckIn() {
            let classes = await Core.getHttp(`/api/register/usercheckin/?user=${userId}`)
            this.myCheckIn = classes
            return classes
        }
    }
}
</script>
    
    
<style>
    
    </style>

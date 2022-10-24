<template>
<div v-if="response">
    <h2 class="font-semibold text-xl">ประวัติการลงทะเบียน</h2>
 
    <div class="p-1 mt-4" v-for="course,i in courses" :key="i">
        <v-card class="rounded-lg" v-if="course.course_data" @click="$router.push(`/class/${course.course_data.id}/`)"> 

            <img v-if="course.course_data.image1" :src="$url+course.course_data.image1" alt="">
            <img v-else src="@/assets/images/c1.png" alt="">
            <v-card-actions>
                <div class="w-full">
                    <div>
                        <h2 class="font-semibold">{{course.course_data.name}}</h2>
                    </div>
                    <div class="flex w-full">
                        <span class="text-xs">{{core.dateX(course.created_at)}}</span>
                        <v-spacer></v-spacer> 
                        <span class="font-semibold text-xs text-green-600">
                            <v-icon color="success" size="16">mdi-check-circle</v-icon> ลงทะเบียนแล้ว
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
            response: false,
        })
    },
    async created() {
        this.courses = await Course.myClass
        this.response = true;
    },
}
</script>

<style>

</style>

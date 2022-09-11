<template>
<div class="p-6 flex flex-col">
    <div class="text-2xl xd">Calendar</div>
    <div v-for="day,index in raws" :key="index" class="mt-4"> 
        <span class="font-semibold">{{day.day_en}}</span> <span class="font-semibold">{{day.date_now}}</span>
        <div >
            <table class="border-collapse border border-slate-400 w-full rounded-lg">
                <tr v-for="course,courseIndex in day.data" :key="courseIndex">
                    <td :class="td" class="w-1/4">{{course.time_data}}</td>
                    <td :style="`background:${course.color_table}; color:${course.color_text}`" :class="td" class="font-semibold w-2/4">{{course.course_name}} </td>
                    <td :class="td" class="w-1/4">Kru. {{course.teacher_name}}</td>
                </tr>
            </table> 
            <br>
        </div>
    </div>
</div>
</template>

<script>
import {
    Core
} from '@/vuexes/core'
import {
    Auth
} from '@/vuexes/auth'
import {
    Web
} from '@/vuexes/web'
import moment from 'moment'
import _ from 'lodash'
export default {
    data: () => ({
        td: 'border border-slate-300 p-1  text-center',
        day: 1,
        raws: []
    }),
    async created() {
        await this.run()
    },
    methods: {
        async run() {
            try {
                let res = await Core.getHttp(`/api/course/series/?is_active=true`)
                if (res.length > 0) {
                    let data = res[res.length - 1].data
                    this.raws = _.map(_.groupBy(data, 'days'), (value, key) => {
                        return {

                            days: key,
                            date_now: moment(value[value.length - 1].date_now).format('DD/MM/YYYY'),
                            day_en: value[value.length - 1].day_en,
                            day_th: value[value.length - 1].day_en,
                            data: _.orderBy(value, ['times'], ['asc'])
                        }
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style>

</style>

<template>
  <div class="bghhP"> 
    <div v-for="list,i in lists" :key="i">
      <v-card outlined class="m-2">
        <v-card-text  @click="$router.push(`/trainer/me/?id=${list.id}&back=history`)">
            <div class="w-full">
                <div class="flex" v-if="list.trainer_detail">
                    <v-avatar size="90">
                        <v-img :src="$url+list.trainer_detail.image"></v-img>
                    </v-avatar>
                    <div class="ml-2">
                        <h3 v-if="list.course_detail" class="text-black text-base font-semibold mb-0">{{ list.course_detail.name }} 
                          ({{ list.course_detail.price?Number(list.course_detail.price).toLocaleString():0 }}.-)</h3>
                        <div>
                            <div v-if="list.trainer_detail" class="text-xl text-black  font-semibold mb-0">KRU. {{ list.trainer_detail.nick_name }}</div>
                            <p style="font-size:14px;">ซื้อเมื่อ {{$core.convertDate(list.created_at)}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </v-card-text>
    </v-card>
    </div>
  </div>
</template>

<script>
import {Auth} from '@/vuexes/auth'
import {Core} from '@/vuexes/core'
import moment from 'moment';
import _ from 'lodash';
export default {
  data: () => {
    return {
      lists: [],
      user:Auth.user
    };
  },
  async created() {
    this.user = await Auth.getUser();
    await this.run();
  },
  methods:{
    async run(){
      let lists = await this.$core.getHttp(`/api/trainer/trainer-class/?user=${this.user.id}`)
      lists = _.orderBy(lists, ['created_at'], ['desc'])
      this.lists = lists
    },
  }
}
</script>

<style>
.bghhP{
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='568' height='1080' preserveAspectRatio='none' viewBox='0 0 568 1080'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1016%26quot%3b)' fill='none'%3e%3cpath d='M131.65 894.28L123.19 884.66 130.71 874.3 122.25 864.69 129.78 854.32 121.32 844.71 128.84 834.34' stroke='rgba(211%2c 183%2c 20%2c 0.36)' stroke-width='1' stroke-dasharray='3%2c 2'%3e%3c/path%3e%3crect width='137.04' height='137.04' clip-path='url(%26quot%3b%23SvgjsClipPath1017%26quot%3b)' x='163.48' y='172.36' fill='url(%23SvgjsPattern1018)' transform='rotate(165.33%2c 232%2c 240.88)'%3e%3c/rect%3e%3cpath d='M415.3 957.65L424.5 966.55 417.84 977.48 427.04 986.39 420.37 997.32 429.57 1006.23 422.9 1017.16' stroke='rgba(3%2c 123%2c 11%2c 0.4)' stroke-width='2.89' stroke-dasharray='3%2c 2'%3e%3c/path%3e%3cpath d='M417.25 223.36 L438.94 210.2L444.80311512585916 233.48811512585917z' stroke='rgba(211%2c 183%2c 20%2c 0.36)' stroke-width='1'%3e%3c/path%3e%3ccircle r='47.333333333333336' cx='271.06' cy='93.07' fill='rgba(3%2c 123%2c 11%2c 0.4)'%3e%3c/circle%3e%3cpath d='M165.83 216.98999999999998 L321.95000000000005 310.92999999999995L127.7876491281429 380.0623508718571z' fill='rgba(126%2c 135%2c 231%2c 0.43)'%3e%3c/path%3e%3cpath d='M382.47 370.43a5.6 5.6 0 1 0 8.9 6.8 5.6 5.6 0 1 0-8.9-6.8zM395.18 380.15a5.6 5.6 0 1 0 8.9 6.8 5.6 5.6 0 1 0-8.9-6.8zM407.89 389.86a5.6 5.6 0 1 0 8.9 6.8 5.6 5.6 0 1 0-8.9-6.8zM420.61 399.58a5.6 5.6 0 1 0 8.89 6.8 5.6 5.6 0 1 0-8.89-6.8z' fill='rgba(3%2c 123%2c 11%2c 0.4)'%3e%3c/path%3e%3ccircle r='47.333333333333336' cx='155.91' cy='564.21' stroke='rgba(231%2c 54%2c 53%2c 0.42)' stroke-width='1.04' stroke-dasharray='4%2c 4'%3e%3c/circle%3e%3cpath d='M530.78 81.77a5.6 5.6 0 1 0-8.28-7.54 5.6 5.6 0 1 0 8.28 7.54zM518.96 71a5.6 5.6 0 1 0-8.28-7.55 5.6 5.6 0 1 0 8.28 7.55zM507.13 60.22a5.6 5.6 0 1 0-8.28-7.55 5.6 5.6 0 1 0 8.28 7.55zM495.31 49.44a5.6 5.6 0 1 0-8.28-7.55 5.6 5.6 0 1 0 8.28 7.55z' fill='rgba(126%2c 135%2c 231%2c 0.43)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1016'%3e%3crect width='568' height='1080' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cpattern x='0' y='0' width='11.42' height='11.42' patternUnits='userSpaceOnUse' id='SvgjsPattern1018'%3e%3cpath d='M0 11.42L5.71 0L11.42 11.42' stroke='rgba(231%2c 54%2c 53%2c 0.42)' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath1017'%3e%3ccircle r='34.26' cx='232' cy='240.88'%3e%3c/circle%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
  background-size: cover;
}
</style>
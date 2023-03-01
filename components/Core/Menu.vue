<template>
<!-- <div class="bg2 pb-0 fixed w-full bottom-0 shadow-2xl "  >
 
    <div class="  sticky bottom-2  p-5  p-2  flex items-center justify-between   shadow-3xl text-gray-400 rounded-2xl cursor-pointer" style="z-index:9999999!important" >
        <div class="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 " @click="$router.push('/calendar')">
            <span class="mdi mdi-calendar  text-xl"></span>
            <span class="text-xs">{{$l('ปฏิทิน','Calendar')}} </span>

        </div>

        <div class="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400" @click="$router.push('/account')">
            <span class="mdi mdi-account-circle text-xl"></span>
            <span class="text-xs">{{$l('โปรไฟล์','Profile')}}</span>
        </div>
        
        <div class="flex flex-col items-center   " @click="$router.push('/home')">
            <div  class="absolute bottom-5 shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-gray-50  bg-black w-20 h-20 p-2 text-white transition ease-in duration-200 ">
                <img class="rounded-full" src="@/assets/images/Screenshot 2565-10-24 at 08.27.03.png" alt="">
            </div>
        </div>
        <div class="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400  mr-4" @click="$router.push('/history')">
            <span class="mdi mdi-clipboard-list text-xl"></span>
            <span class="text-xs">{{$l('ประวัติ','history')}}</span>
        </div>
       
        <div class="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 " @click="$router.push('/menu')" >
            <span class="mdi mdi-apps  text-xl"></span>
            <span class="text-xs">{{$l('เมนู','Menu')}}</span>
        </div>
    </div> 

</div> -->
<v-bottom-navigation class="p-2 pb-6" v-model="value" fixed height="80">
    <div class="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 " @click="$router.push('/calendar')">
        <span class="mdi mdi-calendar  text-xl"></span>
        <span class="text-xs">{{$l('ปฏิทิน','Calendar')}} </span>

    </div>

    <div class="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 mr-2" @click="$router.push('/account')">
        <span class="mdi mdi-account-circle text-xl"></span>
        <span class="text-xs">{{$l('โปรไฟล์','Profile')}}</span>
    </div>
    
    <div class="flex flex-col items-center   " @click="$router.push('/home')">
        <div  class="absolute bottom-5 shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-gray-50  bg-black w-20 h-20 p-2 text-white transition ease-in duration-200 ">
            <img class="rounded-full" src="@/assets/images/Screenshot 2565-10-24 at 08.27.03.png" alt="">
        </div>
    </div>
    <div class="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400  ml-2" @click="$router.push('/history')">
        <span class="mdi mdi-clipboard-list text-xl"></span>
        <span class="text-xs">{{$l('ประวัติ','history')}}</span>
    </div>
   
    <div class="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 " @click="$router.push('/menu')" >
        <span class="mdi mdi-apps  text-xl"></span>
        <span class="text-xs">{{$l('เมนู','Menu')}}</span>
    </div>
  </v-bottom-navigation>
</template>

<script>
export default {
    data: () => {
        return ({
            value:'',
            menus: [{
                    path: '/home',
                    icon: 'mdi-home',
                    name: 'home',
                    label: 'หน้าแรก',
                },
                {
                    path: '/account',
                    icon: 'mdi-account',
                    name: 'account',
                    label: 'ข้อมูลส่วนตัว',
                },
                {
                    path: '/calendar',
                    icon: 'mdi-calendar-blank',
                    name: 'calendar',
                    label: 'ปฏิทิน',
                },
                {
                    path: '/history',
                    icon: 'mdi-clipboard-list',
                    name: 'history',
                    label: 'ประวัติ',
                },
                {
                    path: '/alert',
                    icon: 'mdi-alert-circle',
                    name: 'alert',
                    label: 'ประกาศ',
                },

            ]
        })
    },
    async mounted() {

    },
    methods: {
        action(name) {
            let route = this.$route.name
            return (route == name)
        },
       

    },
    watch: {
      async $route() {
    
      },
    },


}
</script>

<style>
.navBtn-actions>span,
.v-icon {
    color: #eaab4d;
}

.navBtn>span {
    letter-spacing: -0.3px;
    font-size: 10px;
}

.btnx {
    background: rgb(238, 218, 89);
    background: linear-gradient(0deg, rgba(238, 218, 89, 1) 0%, rgba(198, 119, 0, 1) 100%);
}
</style>

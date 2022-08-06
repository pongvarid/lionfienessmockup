<template>
<v-bottom-navigation fixed>
    <v-btn v-for="menu,menuIndex in menus" :key="menuIndex" :class="`navBtn ${(action(menu.name))?'navBtn-actions':''}`" @click="$router.push(menu.path)">
        <span >{{menu.label}}</span>
        <v-icon>{{menu.icon}}</v-icon>
    </v-btn> 
</v-bottom-navigation>
</template>

<script lang="ts">
export default {
    data: () => {
        return ({
            menus:[
                {
                    path:'/home',
                    icon:'mdi-home',
                    name:'home',
                    label:'หน้าแรก',
                },
                 {
                    path:'/account',
                    icon:'mdi-account',
                    name:'account',
                    label:'ข้อมูลส่วนตัว',
                },
                 {
                    path:'/documents',
                    icon:'mdi-file-document-multiple',
                    name:'documents',
                    label:'เอกสาร',
                },
                 {
                    path:'/alert',
                    icon:'mdi-alert-circle',
                    name:'alert',
                    label:'ประกาศ',
                },
                 {
                    path:'/menu',
                    icon:'mdi-menu',
                    name:'menu',
                    label:'เมนู',
                },
            ]
        })
    }, 
    methods:{
        action(name:string): any{
            let route:any = this.$route.name 
            return (route == name) 
        }
    },
    
}
</script>

<style>
    .navBtn-actions > span, .v-icon{
        color:#00838F;
    }
    .navBtn > span{
        letter-spacing: -0.3px;
        font-size:10px;
    }
</style>

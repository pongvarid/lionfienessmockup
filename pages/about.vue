<template>
  <div>
    <v-toolbar dark>
        <v-btn icon @click="$router.push('/home')">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{$l(`ติดต่อเรา`,`Contact`)}} </v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
    <div  >
        <div>   
            
            <div v-for="list,i in lists" :key="i">
                <v-card outlined class="m-2">
                    <v-card-text>
                        <h2 class="font-semibold text-base">{{list.name}}</h2>
                        <p>{{list.detail}}</p>
                        <v-btn outlined block depressed @click="open(list.link,list.name)" v-if="list.link" color="success">{{$l('เปิดลิ้ง','Open Link')}}</v-btn>
                    </v-card-text>
                </v-card>
            </div>
     
        </div>
        <br> <br> <br>
    </div> 
  </div>
</template>

<script>
 
export default {
    data: () => ({ 
       lists:[],
      
    }),
    async created(){
        await this.run()
    },
    methods:{
        async run(){
                this.lists = await this.$core.getHttp('/api/app/contact/')
        },
        async open(link,name){ 
            // this.dialog = true
            // this.name = name
            // this.link = link
            window.open(link, '_system', 'location=yes')
        }
    }
}
</script>

<style>

</style>
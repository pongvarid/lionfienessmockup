<template>
  <div>
    <v-toolbar dark>
        <v-btn icon @click="$router.push('/home')">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{$l(`ติดต่อเรา`,`Contact`)}} </v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
    <div class="p-6">
        <div>   
            <h2 class="font-semibold text-xl">{{$l(`ที่อยู่`,`Address`)}}  </h2>
            <p> 409 ถ.มงฟอร์ตวิลล่า ต.ท่าศาลา, Chiang Mai, Thailand </p>
            <h2 class="font-semibold text-xl">{{$l(`เบอร์โทร`,`Tel`)}}  </h2>
            <p> 085 546 9622</p>
             
            <v-btn @click="open('https://lin.ee/w4JTyZH','Line @lionfitness.cnx')" block  color="success">Line @lionfitness.cnx</v-btn><br>
            <v-btn  @click="open('https://m.facebook.com/lionfitness.cnx','Facebook')" block  target="_blank"  color="primary">Facebook</v-btn><br>
            <v-btn  block @click="open('https://www.instagram.com/lionfitness_chiangmai/','Instagram')"  target="_blank" color="error">Instagram</v-btn><br>
            <v-btn block @click="open('https://www.tiktok.com/@lion.fitness.cnx','Tiktok')"   target="_blank" color="black" dark>TIKTOK</v-btn><br>
            <v-btn block @click="open('https://www.google.com/maps/place/Lion+Fitness+Chiangmai/@18.76261,99.0204793,17z/data=!3m1!4b1!4m5!3m4!1s0x30da2f73087fde2b:0x409b1118dc3c804!8m2!3d18.76261!4d99.022668?shorturl=1','Map')" 
           target="_blank" color="info">Map</v-btn>
     
        </div>
    </div>
    <v-dialog
        v-model="dialog"
        scrollable fullscreen 
        persistent 
    >
        <v-card>
            <v-card-title primary-title>
                {{ name }} <v-spacer></v-spacer>
                <v-btn text @click="dialog=false"><v-icon>mdi-close</v-icon></v-btn>
            </v-card-title>
            <v-card-text>
                <iframe target="_top" height="100%" width="100%" :src="link" frameborder="0"></iframe>
            </v-card-text>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
    data: () => ({
        data: {},
        dialog: false,
        name: '',
        link: ''
    }),
    methods:{
        async open(link,name){
            this.dialog = true
            this.name = name
            this.link = link
        }
    }
}
</script>

<style>

</style>
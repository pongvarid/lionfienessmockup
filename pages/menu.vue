<template>
<div class="bg p-4">
    <h2 class="text-xl font-semibold">{{$l(`เมนู`,`Menu`)}}</h2> 
    <v-list nav class="mt-6" outlined color="transparent">
        <div v-if="logined">
            <h2 class="font-semibold">สมาชิก</h2>
            <v-list-item-group>
                <v-list-item @click="$router.push(`/account`)">
                    <v-list-item-icon>
                        <v-icon size="28">mdi-account-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{$l(`โปรไฟล์`,`Profile`)}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="$router.push(`/account/?tab=1`)">
                    <v-list-item-icon>
                        <v-icon size="28">mdi-wallet-membership</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{$l(`สมาชิกของฉัน`,`My Member`)}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="$router.push(`/account?tab=2`)">
                    <v-list-item-icon>
                        <v-icon size="28">mdi-account-child-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{$l(`เทรนเนอร์ของฉัน`,`My Trainer`)}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            
            <div v-if="user.is_staff || user.is_coach || user.is_trainer">
                <h2 class="font-semibold">ครู & Trainer</h2>
                <v-list-item-group>
                    <v-list-item @click="$router.push(`/checkout/`)">
                        <v-list-item-icon>
                            <v-icon size="28">mdi-shield-check</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{$l(`เช็คชื่อ (ครู)`,`Checkin Teacher`)}} </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="$router.push(`/trainer/checkin/`)">
                        <v-list-item-icon>
                            <v-icon size="28">mdi-shield-check</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{$l(`เช็คชื่อ (Trainer)`,`Checkin Trainer`)}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </div>
        
            <h2 class="font-semibold">Lion Fitness</h2>
            <v-list-item-group>
                <v-list-item @click="$router.push(`/rule`)">
                    <v-list-item-icon>
                        <v-icon size="28">mdi-book-heart</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{$l(`กฎของฟิสเนส`,`Fitness Rules`)}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="$router.push(`/pdpa`)">
                    <v-list-item-icon>
                        <v-icon size="28">mdi-book-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{$l(`ข้อตกลงการใช้งาน`,`Terms of Use`)}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="$router.push(`/qfitness`)">
                    <v-list-item-icon>
                        <v-icon size="28">mdi-scoreboard</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{$l(`การให้คะแนนฟิตเนส`,`Fitness Rating`)}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="$router.push(`/qtrainer`)">
                    <v-list-item-icon>
                        <v-icon size="28">mdi-account-details</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{$l(`การให้คะแนน Trainer`,`Trainer Rating`)}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </div>
        <div >
            <h2 class="font-semibold">{{$l(`ภาษา`,`Language`)}}</h2>
            <v-list-item-group>
                <v-list-item @click="switchLang('th')">
                    <v-list-item-icon>
                        <v-icon size="28">mdi-earth</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>ภาษาไทย</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="switchLang('en')">
                    <v-list-item-icon>
                        <v-icon size="28">mdi-earth</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>English</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </div>
        <div >
            <h2 class="font-semibold">{{$l(`ข้อมูล`,`Information`)}}</h2>
            <v-list-item-group>
                <v-list-item @click="$router.push(`/about`)">
                    <v-list-item-icon>
                        <v-icon size="28">mdi-earth</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{$l(`ติดต่อเรา`,`Contact`)}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item> 
            </v-list-item-group>
        </div> 
    </v-list>
    <br> <br> <br> <br>
    <v-dialog
        v-model="dialogContact"
        scrollable fullscreen 
        persistent :overlay="false"
        max-width="500px"
        transition="dialog-transition"
    >
        <v-card>
            <v-card-title primary-title>
                {{$l(`ติดต่อเรา`,`Contact`)}}  <v-spacer></v-spacer>
                <v-btn icon @click="dialogContact = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <h2 class="font-semibold text-xl">{{$l(`ที่อยู่`,`Address`)}}  </h2>
                <p> 409 ถ.มงฟอร์ตวิลล่า ต.ท่าศาลา, Chiang Mai, Thailand </p>
                <h2 class="font-semibold text-xl">{{$l(`เบอร์โทร`,`Tel`)}}  </h2>
                <p> 085 546 9622</p>
                 
                <v-btn block href="https://lin.ee/w4JTyZH"   target="_blank" color="success">Line @lionfitness.cnx</v-btn><br>
                <v-btn block  href="https://www.facebook.com/lionfitness.cnx" target="_blank" color="primary">Facebook</v-btn><br>
                <v-btn  block href="https://www.instagram.com/lionfitness_chiangmai/" target="_blank" color="error">Instagram</v-btn><br>
                <v-btn block  href="https://www.tiktok.com/@lion.fitness.cnx" target="_blank" color="black" dark>TIKTOK</v-btn><br>
                <v-btn block  href="https://www.google.com/maps/place/Lion+Fitness+Chiangmai/@18.76261,99.0204793,17z/data=!3m1!4b1!4m5!3m4!1s0x30da2f73087fde2b:0x409b1118dc3c804!8m2!3d18.76261!4d99.022668?shorturl=1" target="_blank" color="info">Map</v-btn>
            </v-card-text> 
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import {
    Web
} from '@/vuexes/web'
import {
    Auth 
} from '@/vuexes/auth'
import {
    Core
} from '@/vuexes/core'
import moment from 'moment'
export default { 
    data: () => {
        return ({
            user:  {},
            logined: false,
            dialogContact: false,
        })
    },
    async created() {
        try {
            await Auth.setUser();
            let user = Auth.user
            if(user){
                this.user = user
            }
            this.logined = true
        } catch (error) {
        
            this.logined = false
        }
    },
    props: {

    },
    methods: {
        async switchLang(lang) {
              await localStorage.setItem('lang', lang)
              await this.$router.push('/home')
              location.reload()
        },
        openLink(link){
            let url = encodeURI(link);
             window.open(url, '_system', 'location=yes');
        }
    },
    computed: {
        userTea() {
            return true;
            /*  try {
                 return this.$auth.user.is_trainer || this.$auth.useruser.is_coach
              } catch (error) {
                  return false    
              } */
        },
    }
}
</script>

<style lang="scss" scoped>

</style>

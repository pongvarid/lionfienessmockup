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
                <v-list-item @click="$router.push(`/account/?tab=2`)">
                    <v-list-item-icon>
                        <v-icon size="28">mdi-wallet-membership</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{$l(`สมาชิกของฉัน`,`My Member`)}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="$router.push(`/trainer`)">
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
    
    </v-list>
    <br> <br> <br> <br>
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

        })
    },
    async created() {
        try {
            await Auth.setUser();
            this.user = Auth.user
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
            await location.reload()
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

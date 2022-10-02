<template>
<div class="p-6 flex flex-col">
    <div class="text-2xl xd">History</div>
    <div class="mt-6 p-3 space-y-4 z-0">
        <v-card class="rounded-lg">
            <Core-Dev></Core-Dev>
            <img src="@/assets/images/c1.png" alt="">
            <v-card-actions>
                02/05/2022 <v-spacer></v-spacer> <span class="font-semibold text-xs text-green-600">
                    <v-icon color="success" size="16">mdi-check-circle</v-icon> เข้า class แล้ว
                </span>
            </v-card-actions>
        </v-card>
        <!-- <v-card class="rounded-lg">
            <img src="@/assets/images/c2.png" alt="">
            <v-card-actions>
                02/04/2022 <v-spacer></v-spacer> <span class="font-semibold text-xs text-red-600">
                    <v-icon color="red" size="16">mdi-close-circle</v-icon> ยกเลิก class
                </span>
            </v-card-actions>
        </v-card>
        <v-card class="rounded-lg">
            <img src="@/assets/images/c3.png" alt="">
            <v-card-actions>
                02/03/2022 <v-spacer></v-spacer> <span class="font-semibold text-xs text-green-600">
                    <v-icon color="success" size="16">mdi-check-circle</v-icon> เข้า class แล้ว
                </span>
            </v-card-actions>
        </v-card>
        <v-card class="rounded-lg">
            <img src="@/assets/images/c4.png" alt="">
            <v-card-actions>
                02/02/2022 <v-spacer></v-spacer> <span class="font-semibold text-xs text-green-600">
                    <v-icon color="success" size="16">mdi-check-circle</v-icon> เข้า class แล้ว
                </span>
            </v-card-actions>
        </v-card> -->
        <br> <br> <br>
    </div>
</div>
</template>

<script>
import {
    Auth
} from '@/vuexes/auth'

export default {
    data: () => {
        return ({ 
            user: Auth.user,
            response: false,
        })
    },
    async created() {
        if (!this.user) {
            await this.$router.push(`/auth/login/`)
        } else {
            this.response = true;
        }
    },
}
</script>

<style>

</style>

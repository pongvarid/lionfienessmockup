<template>
  <div >
    <v-toolbar dark>
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $l(`Payments`, `Payments`) }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    <div class="p-6 flex flex-col">
      <v-tabs class="mt-1">
        <v-tab v-for="(payment, i) in payments" :key="i">
          <v-icon>mdi-credit-card</v-icon>
          <span class="pl-2">{{ payment.name }}</span>
        </v-tab>
        <v-tab-item v-for="(payment, i) in payments" :key="i">
          <div class="p-4">
            <center>
              <img
                @click="openImg($url + payment.image)"
                style="width: 50%; height: 50%"
                :src="$url + payment.image"
                alt=""
              />
            </center>
            <br />
            <span>
              {{ payment.detail }}
            </span>
          </div>
        </v-tab-item>
      </v-tabs>
      <div class="mt-2 p-2">
        <v-file-input
          label="อัปโหลดหลักฐานการจ่ายเงิน"
          @change="uploadSlip()"
          v-model="form.file"
        ></v-file-input>
      </div>
    </div>
    <v-dialog fullscreen v-model="dialog">
      <v-card class="d-flex align-content-center flex-wrap">
        <v-card-text>
          <img :src="image" alt="" />
          
          <v-btn class="mt-6" color="red" dark @click="dialog = false"> ปิด </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Web } from "@/vuexes/web";
import { Auth } from "@/vuexes/auth";
import { Core } from "@/vuexes/core";
export default {
  data: () => {
    return {
      user: Auth.user,
      myTier: {},
      form: {
        file: {},
      },
      payments: [],
      response: false,
      dialog: false,
      image: null,
    };
  },
  async mounted() {
    await this.run();
  },
  methods: {
    async run() {
      this.payments = await Core.getHttp(`/api/app/payment/?is_active=true`);
      this.myTier = await Core.getHttp(
        `/api/payout/userpayout/${this.$route.query.id}/`
      );
    },
    async uploadSlip() {
      let formData = new FormData();
      formData.append("image_slip", this.form.file);
      let upload = await Core.putHttp(
        `/api/payout/userpayout/${this.myTier.id}/`,
        formData
      );
      if (upload.id) {
        await Web.alert(`อัปโหลดสลิปเรียบร้อย`);
        await this.$router.push(`/account/?tab=1`);
      }
    },
    async openImg(img) {
      this.dialog = true;
      this.image = img;
    },
  },
};
</script>

<style>
</style>

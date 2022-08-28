import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import axios from '@/plugins/axios'
import _ from "lodash"
import moment from 'moment'
import Swal from 'sweetalert2'
import Vue from 'vue';

@Module({ generateMutationSetters: true })
class WebModule extends VuexModule {
  public loading: boolean = false;
  public loadTxt: any = 'Loading..'

  public snackTxt: any = ''
  public snacking: boolean = false;
  public snackColor: any = 'success';

  public head:string = 'Philobot'
  public text:string = 'Bot Trade for you.'

  public vs:any = null;
  
  public reload:boolean = false
  

  public async getReload(){
    await Web.switchLoad(true)
    this.reload = false
    await this.sleep(1000);
    this.reload = true
    await Web.switchLoad(false)
  }

  public async sleep(msec:any) {
    return new Promise(resolve => setTimeout(resolve, msec));
}


  public async setHead(head:string,text:string){
    this.head = head
    this.text = text
  }

  public async setVuesax(vs:any){
    this.vs = vs
  }
  public async noti(color:string = 'success',title:string = 'Notification',text:string = "Notification Detail") {
    this.vs.notification({
      color,
      title: title,
      text: text
    })

  }

  public async onSnack(txt: string, color: string = 'success') {
    await this.offSnack()
    this.snacking = true
    this.snackTxt = txt
    this.snackColor = color
  }
  public async offSnack() {
    this.snacking = false
  }


  public async switchLoad(load: boolean) {
    //  this.loadTxt = 'กำลังโหลด'
    this.loading = load
  }

  public async onLoad(txt: string) {
    this.loadTxt = txt
    this.loading = true
  }

  public async offLoad() {
    this.loading = false
  }

  public async alert(title: any = 'OK', type: any = 'success', text: any = '') {
    await Swal.fire({
      icon: type,
      title: title,
      text: text,
      confirmButtonText: `OK`,
      confirmButtonColor: "#2196F3",
    })
  }

  public async alertAuto(title: any = 'OK', timer: any = 2000, type: any = 'success', text: any = '') {
    await Swal.fire({
      showConfirmButton: false,
      icon: type,
      title: title,
      text: text,
      timer: timer,
      confirmButtonColor: "#2196F3",

    })
  }
  public async alertnotfound(title: any = 'OK', type: any = 'error', text: any = '') {
    await Swal.fire({
      icon: type,
      title: title,
      text: text,
      confirmButtonText: `OK`,
      confirmButtonColor: "#ef4444",
    })
  }
  public async alerterror(title: any = 'Please click the link from the email again.', type: any = 'error', text: any = '') {
    await Swal.fire({
      icon: type,
      title: title,
      text: text,
      confirmButtonText: `OK`,
      confirmButtonColor: "#ef4444",
    })
  }

  public async confirm(title: any = 'Are you sure ?' ,text="",img="") {
 
    let check = await Swal.fire({ 
      title: title,
      text: text,
      imageUrl: img,
      showCancelButton: true,
      imageWidth: 200, 
      confirmButtonText: `OK`,
      cancelButtonText: `Cancel`,
      confirmButtonColor: "#2196F3",
    }).then((result:any) => {
      return result.isConfirmed
    })
    return check
  }

 

}

import store from "@/vuexes"
export const Web = new WebModule({ store, name: "Web" })


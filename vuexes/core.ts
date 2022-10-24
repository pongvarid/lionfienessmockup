import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import axios from '@/plugins/axios'
import _ from "lodash"

import { Web } from './web'


@Module({ generateMutationSetters: true })
class CoreModule extends VuexModule {

  async checkConnection() {
    return await axios.interceptors.response.use(
      response => {
        console.log(response);
        return true
      },
      error => {
        if (!error.response) {
          return false
        }
        return false
      }
    )
  }
  async putImageHttpAlert(url: string, form: any): Promise<any> {
    let check = await Web.confirm("Are you sure you want to edit the information?")
    if (check) {
      return await axios.put(url, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((r) => {
        Web.alert('Successfully executed')
        return r.data
      }).catch((e) => {
        Web.alert('Failed to edit data', 'error')
        return e.response.data
      })
    }
  }

  async putImageHttp(url: string, form: any): Promise<any> {
    return await axios.put(url, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((r) => {
      Web.alert('Successfully executed')
      return r.data
    }).catch((e) => {
      Web.alert('Failed to edit data', 'error')
      return e.response.data
    })
  }


  async getHttp(url: string): Promise<any> {
    try {
      return await axios.get(url).then((r: any) => {
        let data = r.data

        return data

      }).catch((e: any) => {
        let data = e.response.data
        data.sactiveCode = e.response.status
        data.sactive = false
        data.sactiveText = e.response.statusText
        return data
      })
    }
    catch (error: any) {
      await Web.alert('Connot Connect Server', 'error', error)
      return error
    }
  }
  async postHttp(url: string, form: object): Promise<any> {
    try {
      return await axios.post(url, form).then((r: any) => {
        let data = r.data

        return data

      }).catch((e: any) => {
        let data = e.response.data
        data.sactiveCode = e.response.status
        data.sactive = false
        data.sactiveText = e.response.statusText
        return data
      })
    } catch (error) {
      await Web.alert('Connot Connect Server', 'error', error)

      return error
    }
  }
  async putHttp(url: string, form: object): Promise<any> {
    try {
      return await axios.put(url, form).then((r: any) => {
        let data = r.data

        return data

      }).catch((e: any) => {
        let data = e.response.data
        data.sactiveCode = e.response.status
        data.sactive = false
        data.sactiveText = e.response.statusText
        return data
      })
    } catch (error) {
      await Web.alert('Connot Connect Server', 'error', error)

      return error
    }
  }

  async deleteHttp(url: string): Promise<any> {
    try {
      return await axios.delete(url).then((r: any) => {
        let data: any = {}

        return data

      }).catch((e: any) => {
        let data = e.response.data
        data.sactiveCode = e.response.status
        data.sactive = false
        data.sactiveText = e.response.statusText
        return data
      })
    } catch (error) {
      await Web.alert('Connot Connect Server', 'error', error)
      return error
    }
  }

  convertDate(date: any) {
    return moment(date).format('DD/MM/YYYY');
  }

  dateTH(date: string) {
    return moment(date).format('DD/MM/YYYY');
  }
  dateTTH(date: string) {
    return moment(date).format('DD/MM/YYYY');
  }

  
  dateX(date: any) {
    return moment(date).format('DD/MM/YYYY');
  }
  timeX(date: any) {
    return moment(date).format('HH:mm');
  }

  async generateCodeId(code: string = 'LF') {
    return code + moment().format('DDMMYYHHmmss');
  }

  async getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


  async dataURLtoFile(dataurl: any) {
    let moment = require('moment')
    let date = moment();
    let extension = dataurl.substring("data:image/".length, dataurl.indexOf(";base64"))
    let filename = `${date.format('ddDDmmyyhhmmss')}.${extension}`
    console.log(filename);
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  async fileToBase64(file: any, callback: any,) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  }

  async setWaterMark(file: any) {

  }

  async sentLine(message: any) {
    return await Core.postHttp(`/api/qline/`, { message: message })
  }

}

import store from "@/vuexes"
import moment from "moment";
export const Core = new CoreModule({ store, name: "Core" })


import axios from "axios";
import env from './env'
 

let config = {
  baseURL: process.env.baseURL || process.env.apiUrl || env.host // "http://adminorganize.itef.fun" //"http://209.97.161.34:8005"// "https://admin.opulentz.ga"  //"https://admin.opulentz.ga" //"http://192.168.0.114:8000"  //"http://127.0.0.1:8000"   //"https://admin-canabit.tk"//
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config); 

export default _axios

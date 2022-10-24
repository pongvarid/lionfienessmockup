import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import axios from '@/plugins/axios'
import _ from "lodash"
import moment from 'moment'
import Vue from 'vue';
import { Core } from '@/vuexes/core'
import { Web } from '@/vuexes/web'

@Module({ generateMutationSetters: true })
class TrainerModule extends VuexModule {
   
    async getTrainer() {
        let res = await axios.get('/trainer')
        return res.data
    }

    
   

}

import store from "@/vuexes"
export const Trainer = new TrainerModule({ store, name: "Trainer" })


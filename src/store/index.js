import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from "@/store/modules/auth";
import { users } from "@/store/modules/users";
import { vehicles } from "@/store/modules/vehicles";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    users,
    vehicles
  }
})

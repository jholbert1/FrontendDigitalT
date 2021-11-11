import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// PLUGINS
import vuetify from './plugins/vuetify'
import "./plugins/vee_validate";
import "./plugins/snotify";
import "./plugins/crypto";

Vue.config.productionTip = false

store.dispatch("auth/TRY_AUTO_LOGIN");

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import api from "./apis";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import moment from "moment";
import VueCookies from "vue-cookies";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios; //全域
Vue.prototype.$api = api;
Vue.prototype.$moment = moment;
Vue.prototype.$cookies = VueCookies;

// 狀態處理
import store from "./store";

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");

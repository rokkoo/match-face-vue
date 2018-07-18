// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import {store} from "./storage"
Vue.config.productionTip = false;
Vue.prototype.$eventBus = new Vue() // Lo definimos de manera global

window.axios = axios;
axios.defaults.baseURL = "http://127.0.0.1:3333";
// axios.headers.common["Content-Type"] = "application/json";
// axios.headers.common["Access-Control-Allow-Origin"] = "*";
// axios.headers.common["Accept"] = "application/json, text/plain, */*";
// axios.headers.common["Access-Control-Allow-Headers"] = "Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin";

new Vue({
  el: "#app",
  components: { App },
  router,
  store,
  axios,
  template: "<App/>"
});

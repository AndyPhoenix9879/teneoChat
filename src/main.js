// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;

import firebase from 'firebase/app'
import 'firebase/database'
// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
  apiKey: "AIzaSyDX4n59_Zm6EHF_yaXTtQJJv4zFZU40lzI",
  authDomain: "tie-api-client-android-master.firebaseapp.com",
  databaseURL: "https://tie-api-client-android-master.firebaseio.com",
  storageBucket: "tie-api-client-android-master.appspot.com",
  };

firebase.initializeApp(config);
// Get a reference to the database service
export const db = firebase.database();

Vue.use(ElementUI);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

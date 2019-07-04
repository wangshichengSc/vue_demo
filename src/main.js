// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'

import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(ElementUI); //使用elementUI
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    ['LOGIN'](state, token) {
      sessionStorage.setItem("token", token);
      state.token = token
    }
  }
});

router.beforeEach((to, from, next) => {
  store.state.token = sessionStorage.getItem('token');//获取本地存储的token
  // console.log("111111111" + store.state.token);
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.token !== "" && store.state.token != null) {  // 通过vuex state获取当前的token是否存
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});

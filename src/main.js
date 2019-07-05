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

const store = new Vuex.Store({
  state: {
    token: '',
    userName: '',
    isLogin: false
  },
  mutations: {
    ['LOGIN_TOKEN'](state, token) {
      sessionStorage.setItem("token", token);
      state.token = token;
    },
    ['LOGIN_USERNAME'](state, userName) {
      state.userName = userName;
    },
    ['LOGIN_STATE'](state, loginState){
      state.isLogin = loginState;
    }
  }
});
//配置全局访问
Vue.prototype.$store = store;

router.beforeEach((to, from, next) => {
  store.state.token = sessionStorage.getItem('token');//获取本地存储的token
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.token !== "" && store.state.token != null) {  // 通过vuex state获取当前的token是否存
      next();
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});

//配置请求拦截器
axios.interceptors.request.use(config => {
  let token = store.state.token;
  if (token !== '' && token != null) {
    config.headers['access-token'] = token;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

//配置响应拦截器
axios.interceptors.response.use(response => {
  let responseCode = response.data.code;
  //将后台返回无权限的拦截回登录页面
  if (responseCode === '10010') {
    router.push({
      name: 'Login',
      params: {redirect: router.currentRoute.fullPath}
    })
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});

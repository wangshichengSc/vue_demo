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
import '@/assets/css/reset.css'

Vue.use(ElementUI); //使用elementUI
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tokenId: sessionStorage.getItem("tokenId"),
    userName: sessionStorage.getItem("userName"),
    isLogin: sessionStorage.getItem("loginState")
  },
  mutations: {
    loginEvent(state, data) {
      console.log(JSON.stringify(data));
      state.userName = data.userName;
      state.isLogin = data.isLogin;
      state.tokenId = data.tokenId;
      sessionStorage.setItem("tokenId", data.tokenId);
      sessionStorage.setItem("userName", data.userName);
      sessionStorage.setItem("loginState", data.isLogin);
    }
  }
});
//配置全局访问
Vue.prototype.$store = store;

router.beforeEach((to, from, next) => {
  store.state.tokenId = sessionStorage.getItem('tokenId');//获取本地存储的token
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.tokenId !== "" && store.state.tokenId != null) {  // 通过vuex state获取当前的token是否存
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
  let tokenId = store.state.tokenId;
  if (tokenId !== '' && tokenId != null) {
    config.headers['access-token'] = tokenId;
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

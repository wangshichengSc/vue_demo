import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/components/Test'
import MyPage from '@/components/views/MyPage'
import MyEcharts from '@/components/views/MyEcharts'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: MyPage
    },
    {
      path: '/myEcharts',
      name: 'MyEcharts',
      meta: {
        requireAuth: true
      },
      component: MyEcharts
    }
  ]
})

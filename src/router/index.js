import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'
import MyPage from '@/components/views/MyPage'
import MyEcharts from '@/components/views/MyEcharts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'HelloWorld',
      component: HelloWorld
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

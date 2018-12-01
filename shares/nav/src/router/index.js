import Vue from 'vue'
import Router from 'vue-router'
import Hangqing from '@/components/hangqing'
import Star from '@/components/star'
import Tangu from '@/components/tangu'
import Fenshi from '@/components/fenshi'
import K from '@/components/k'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Hangqing',
      component: Hangqing,
      children: [  //这里就是二级路由的配置
        {
          path: '/fenshi',
          name: 'Fenshi',
          component: Fenshi
        },
        {
          path: '/k',
          name: 'K',
          component: K
        }
      ]
    },
    {
      path: '/star',
      name: 'Star',
      component: Star
    },
    {
      path: '/tangu',
      name: 'Tangu',
      component: Tangu
    },
    {
      path: '/hangqing',
      name: 'Hangqing',
      component: Hangqing
    },
  ]
})

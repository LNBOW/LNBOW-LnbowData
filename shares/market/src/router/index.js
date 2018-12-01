import Vue from 'vue'
import Router from 'vue-router'
import Hangqing from '@/components/hangqing'
import Star from '@/components/star'
import Tangu from '@/components/tangu'
import Lists from '@/components/lists'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Lists',
      component: Lists
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

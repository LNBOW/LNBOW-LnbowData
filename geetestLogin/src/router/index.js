import Vue from 'vue'
import Router from 'vue-router'
import geetestLogin from '@/components/geetestLogin'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/geetestLogin',
      name: 'geetestLogin',
      component: geetestLogin,
    }
  ]
})

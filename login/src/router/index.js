import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import geetestLogin from '@/components/geetestLogin'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [{
    path: '/',
    // path: '/login',
    name: 'login',
    component: login,
  },
    {
      path: '/Login',
      // path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/geetestLogin',
      name: 'geetestLogin',
      component: geetestLogin,
    }
  ]
})

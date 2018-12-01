import Vue from 'vue'
import Router from 'vue-router'
import Star from '@/components/star'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'Star',
      component: Star
    },{
      path: '/star',
      name: 'Star',
      component: Star
    },{
      path: '/',
      name: 'Star',
      component: Star
    },{
      path: '/',
      name: 'Star',
      component: Star
    },{
      path: '/',
      name: 'Star',
      component: Star
    },
  ]
})

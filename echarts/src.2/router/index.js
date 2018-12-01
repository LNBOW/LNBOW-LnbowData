import Vue from 'vue'
import Router from 'vue-router'
import Echarts from '../components/echarts.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'echarts',
      component: Echarts
    }
  ]
})

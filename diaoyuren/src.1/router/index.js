import Vue from 'vue'
import Router from 'vue-router'
import '../asset/css/ionic.min.css'
import index from '../components/index.vue'
import login from '../components/login.vue'
import market from '../components/market.vue'
import more from '../components/more.vue'
import my from '../components/my.vue'
import myinfo from '../components/myinfo.vue'
import picture from '../components/picture.vue'
import regist from '../components/regist.vue'
import shopcart from '../components/shopcart.vue'
import detail from '../components/detail.vue'
import error from '../components/error.vue'
Vue.use(Router)
console.log('Routerindex')
let routes = [
  {path: '/index', component: index},
  {path: '/login', component: login},
  {path: '/market', component: market},
  {path: '/detail/:id', component: detail},
  {path: '/more', component: more},
  {path: '/my', component: my},
  {path: '/myinfo', component: myinfo},
  {path: '/picture', component: picture},
  {path: '/regist', component: regist},
  {path: '/shopcart', component: shopcart},
  {path: '/', redirect: '/index'},
  {path: '*', component: error}
]

export default new Router({
  mode: 'history',
  routes: routes
})

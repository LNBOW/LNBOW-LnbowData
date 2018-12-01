import Vue from 'vue'
import Router from 'vue-router'
import PasswordLogin from '@/components/passwordLogin'
import ValidateLogin from '@/components/validateLogin'
import Register from '@/components/register'
import ResetPassword from '@/components/resetPassword'
import SetPassword from '@/components/setPassword'
import ApplyReset from '@/components/applyReset'
Vue.use(Router)
export default new Router({
  mode:'history',
  routes: [{
    path: '/',
    // path: '/login',
    name: 'ValidateLogin',
    component: ValidateLogin,
  },
  {
    path: '/passwordLogin',
    // path: '/login',
    name: 'PasswordLogin',
    component: PasswordLogin,
  },
  {
    path: '/validateLogin',
    // path: '/login',
    name: 'ValidateLogin',
    component: ValidateLogin,
  },
  {
    path: '/register',
    // path: '/login',
    name: 'Register',
    component: Register,
  },
  {
    path: '/applyReset',
    // path: '/login',
    name: 'ApplyReset',
    component: ApplyReset,
  },
  {
    path: '/resetPassword',
    // path: '/login',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    path: '/setPassword',
    // path: '/login',
    name: 'SetPassword',
    component: SetPassword,
  }
  ]
})

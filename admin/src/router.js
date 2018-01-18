import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '*',
    redirect: {name: 'Home'}
  }]
})

export default router

import Vue from 'vue'
import Router from 'vue-router'

function view (path) {
  return resolve => require([`./views/${path}.vue`], resolve)
}

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: view('Home')
  }, {
    path: '*',
    redirect: {name: 'Home'}
  }]
})

export default router

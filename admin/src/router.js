import Vue from 'vue'
import Router from 'vue-router'

function view (path) {
  return resolve => require([`./views/${path}.vue`], resolve)
}

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Home',
    component: view('Home')
  }, {
    path: '/login',
    name: 'Login',
    component: view('Login')
  }, {
    path: '*',
    redirect: {name: 'Login'}
  }]
})

// router.beforeEach((to, from, next) => {
//   let token = window.localStorage.getItem('TOKEN')
//   console.log(token)
  // if (!token) {
  //   next({name: 'Login'})
  // } else {
  //   next()
  // }
// })

export default router

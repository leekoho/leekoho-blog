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
    name: 'Blog',
    component: view('Blog')
  }, {
    path: '/tag',
    name: 'Tag',
    component: view('Tag')
  }, {
    path: '*',
    redirect: {name: 'Blog'}
  }],
  // 按下浏览器的后退/前进, 会保存之前的滚动条位置, 会像浏览器的原生表现那样
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

export default router

import Vue from 'vue'
import Router from 'vue-router'

function view (path) {
  return resolve => require([`./views/${path}.vue`], resolve)
}

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [{
    path: '/article',
    name: 'ArticleList',
    component: view('article/List')
  }, {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: view('article/Detail')
  }, {
    path: '/tag',
    name: 'Tag',
    component: view('Tag')
  }, {
    path: '/links',
    name: 'Links',
    component: view('Links')
  }, {
    path: '*',
    redirect: {name: 'Article'}
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

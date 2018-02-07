import Vue from 'vue'
import Router from 'vue-router'
import Article from './views/article/List.vue'
import ArticleDetail from './views/article/Detail.vue'
import Tag from './views/Tag.vue'
import Link from './views/Link.vue'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [{
    path: '/article',
    name: 'Article',
    component: Article,
    meta: {
      keepAlive: true
    }
  }, {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: ArticleDetail,
    meta: {
      keepAlive: false
    }
  }, {
    path: '/tag',
    name: 'Tag',
    component: Tag,
    meta: {
      keepAlive: true
    }
  }, {
    path: '/link',
    name: 'Link',
    component: Link,
    meta: {
      keepAlive: true
    }
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

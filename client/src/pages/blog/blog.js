import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
import Axios from 'axios'
import filters from '../../common/utils/filters'

Vue.prototype.markdown = filters.markdown
// import markdown from './utils/markdown'
// 添加响应拦截器
Axios.interceptors.response.use(response => {
  if (response.status === 200 && response.data.code === 0) {
    return response.data.data || response.data
  } else {
    return Promise.reject(response.data.message)
  }
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error)
})
Vue.prototype.$http = Axios

// 全局注册过滤器
Object.keys(filters).forEach(filterName => {
  Vue.filter(`${filterName}`, filters[filterName])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

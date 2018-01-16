/**
 * Created by leekoho on 2018/1/12.
 */
import Router from 'koa-router'
import convert from 'koa-convert'
import importDir from 'import-dir'
import config from '../config'
// 把router文件夹下所有文件引入进来
const routes = importDir('./router')

export default function api() {
  const router = new Router({
    prefix: config.app.baseApi
  })
  Object.keys(routes).forEach(name => {
    return routes[name](router)
  })
  return convert.compose([
    router.routes(),
    router.allowedMethods(),
  ])
}

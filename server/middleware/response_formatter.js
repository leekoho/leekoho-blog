/**
 * Created by leekoho on 2018/1/15.
 */
import ApiError from '../error/ApiError'

let responseFormatter = async(ctx, next) => {
  if (ctx.body) {
    ctx.body = {
      code: 0,
      message: 'success',
      data: ctx.body
    }
  } else {
    ctx.body = {
      code: 0,
      message: 'success'
    }
  }
}


let urlFilter = pattern => {
  return async(ctx, next) => {
    let reg = new RegExp(pattern)
    try {
      // 先去执行路由
      await next()
    }
    catch (error) {
      // if (error instanceof ApiError && reg.test(ctx.originalUrl)) {
      if (reg.test(ctx.originalUrl)) {
        ctx.status = 200
        ctx.body = {
          code: error.code,
          message: error.message
        }
      }
      // 继续抛, 让外层中间件处理日志
      throw error
    }
    if (reg.test(ctx.originalUrl)) {
      responseFormatter(ctx)
    }
  }
}


export default urlFilter
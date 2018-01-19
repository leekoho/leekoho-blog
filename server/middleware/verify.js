/**
 * Created by leekoho on 2017/4/29.
 */
import jwt from 'jsonwebtoken'
import config from '../config'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'
export default async(ctx, next) => {
  // console.log(ctx.get('Authorization'))
  const authorization = ctx.get('Authorization')
  if (authorization === '') {
    throw new ApiError(ApiErrorNames.TOKEN_NULL)
  }
  // const token = authorization.split(' ')[0]
  let tokenContent
  try {
    tokenContent = await jwt.verify(authorization, config.jwt.secret)
  } catch (err) {
    if ('TokenExpiredError' === err.name) {
      throw new ApiError(ApiErrorNames.TOKEN_EXPIRED)
    }
    throw new ApiError(ApiErrorNames.TOKEN_INVAILD)
  }
  console.log('鉴权成功')
  await next()
}

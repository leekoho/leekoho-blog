/**
 * Created by leekoho on 2018/1/15.
 */
let ApiErrorNames = {}

ApiErrorNames.UNKNOW_ERROR = 'UNKNOW_ERROR'
ApiErrorNames.ARTICLE_NOT_EXIST = 'ARTICLE_NOT_EXIST'
ApiErrorNames.PARAMETER_INVAILD = 'PARAMETER_INVAILD'
ApiErrorNames.TOKEN_EXPIRED = 'TOKEN_EXPIRED'
ApiErrorNames.TOKEN_NULL = 'TOKEN_NULL'
ApiErrorNames.TOKEN_INVAILD = 'TOKEN_INVAILD'
ApiErrorNames.USER_NOT_EXIST = 'USER_NOT_EXIST'
ApiErrorNames.USER_PWD_ERROR = 'USER_PWD_ERROR'
ApiErrorNames.USER_OLD_PWD_ERROR = 'USER_OLD_PWD_ERROR'

const errorMap = new Map()
errorMap.set(ApiErrorNames.UNKNOW_ERROR, {code: -1, message: '未知错误'})
errorMap.set(ApiErrorNames.PARAMETER_INVAILD, {code: -2, message: '参数不合法'})

// 鉴权相关错误代码
errorMap.set(ApiErrorNames.TOKEN_EXPIRED, {code: 101, message: '会话已失效'})
errorMap.set(ApiErrorNames.TOKEN_NULL, {code: 102, message: '请先登录'})
errorMap.set(ApiErrorNames.TOKEN_INVAILD, {code: 103, message: 'token不合法'})

// 文章相关错误代码
errorMap.set(ApiErrorNames.ARTICLE_NOT_EXIST, {code: 204, message: '文章不存在'})

// 用户相关
errorMap.set(ApiErrorNames.USER_PWD_ERROR, {code: 301, message: '密码错误'})
errorMap.set(ApiErrorNames.USER_OLD_PWD_ERROR, {code: 302, message: '原密码错误'})
errorMap.set(ApiErrorNames.USER_NOT_EXIST, {code: 304, message: '用户不存在'})

ApiErrorNames.getErrorInfo = errorName => {
  let errorInfo = null

  if (errorName) {
    errorInfo = errorMap.get(errorName)
  }

  if (!errorInfo) {
    errorName = 'UNKNOW_ERROR'
    errorInfo = errorMap.get(errorName)
  }

  return errorInfo
}

export default ApiErrorNames
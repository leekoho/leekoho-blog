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
ApiErrorNames.TAG_IS_EXIST = 'TAG_IS_EXIST'
ApiErrorNames.TAG_NOT_EXIST = 'TAG_NOT_EXIST'
ApiErrorNames.TAG_DELETE_ERROR = 'TAG_DELETE_ERROR'
ApiErrorNames.LINK_NOT_EXIST = 'LINK_NOT_EXIST'
ApiErrorNames.LINK_IS_EXIST = 'LINK_IS_EXIST'
// ApiErrorNames.LINK_INTROD_NOT_NULL = 'LINK_INTROD_NOT_NULL'
ApiErrorNames.COMMENT_NOT_EXIST = 'COMMENT_NOT_EXIST'
ApiErrorNames.COMMENT_IS_REPLYED = 'COMMENT_IS_REPLYED'

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

errorMap.set(ApiErrorNames.TAG_IS_EXIST, {code: 401, message: '标签已存在'})
errorMap.set(ApiErrorNames.TAG_NOT_EXIST, {code: 402, message: '标签不存在'})
errorMap.set(ApiErrorNames.TAG_DELETE_ERROR, {code: 403, message: '标签删除失败'})

errorMap.set(ApiErrorNames.LINK_NOT_EXIST, {code: 501, message: '友链不存在'})
errorMap.set(ApiErrorNames.LINK_IS_EXIST, {code: 502, message: '友链已存在'})
// errorMap.set(ApiErrorNames.LINK_INTROD_NOT_NULL, {code: 503, message: '友链简介不能为空'})

errorMap.set(ApiErrorNames.COMMENT_NOT_EXIST, {code: 601, message: '评论不存在'})
// errorMap.set(ApiErrorNames.COMMENT_IS_REPLYED, {code: 602, message: '评论已经回复过'})

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
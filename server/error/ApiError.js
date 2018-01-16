/**
 * Created by leekoho on 2018/1/15.
 */
import ApiErrorNames from './ApiErrorNames'

class ApiError extends Error {
  constructor (errorName) {
    super()
    let errorInfo = ApiErrorNames.getErrorInfo(errorName)
    this.name = errorName
    this.code = errorInfo.code
    this.message = errorInfo.message
  }
}

export default ApiError
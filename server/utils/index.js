/**
 * Created by leekoho on 2018/1/18.
 */

import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'
export default {
  /*
   ** randomWord 产生任意长度随机字母数字组合
   ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
   */
  randomWord (randomFlag, min, max){
    let str = ''
    let range = min
    let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    // 随机产生
    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min
    }
    for (let i = 0; i < range; i++) {
      let pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos]
    }
    return str
  },

  verifyId (id) {
    if (id.length !== 24) {
      throw new ApiError(ApiErrorNames.PARAMETER_INVAILD)
    }
  }
}
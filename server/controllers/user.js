/**
 * Created by leekoho on 2018/1/16.
 */
import User from '../models/user'
import config from '../config'
import jwt from 'jsonwebtoken'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'

export default {
  async initUser () {
    let user = await User.find().catch(() => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
    if (user.length === 0) {
      user = User.create({
        username: config.admin.username,
        password: config.admin.password
      })
    }
  },
  async signIn (ctx) {
    let {username, password} = ctx.request.body
    const user = await User.findOne({username: username}).catch(() => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
    if (user) {
      if (user.password === password) {
        const token = jwt.sign({
          uid: user._id,
          name: user.username,
          // 有效时间
          exp: config.jwt.expiration
        }, config.jwt.secret)
        ctx.body = {
          username: user.name,
          token
        }
      } else {
        throw new ApiError(ApiErrorNames.USER_PWD_ERROR)
      }
    } else {
      throw new ApiError(ApiErrorNames.USER_NOT_EXIST)
    }
  },
  async signOut (ctx) {
    // TODO 退出登录功能
  },
  async updateUser (ctx) {
    let {id} = ctx.params
    let {username, oldPassword, newPassword} = ctx.request.body
    const user = await User.findById(id).catch(() => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
    if (user) {
      if (user.password === oldPassword) {
        await User.update({
          username,
          password: newPassword
        }).catch(() => {
          throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
        })
      } else {
        throw new ApiError(ApiErrorNames.USER_OLD_PWD_ERROR)
      }
    }
  }
}
/**
 * Created by leekoho on 2018/1/16.
 */
import User from '../models/user'
import util from '../utils'
import config from '../config'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'

export default {
  async initUser () {
    let user = await User.find().catch(() => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
    if (user.length === 0) {
      let salt = util.randomWord(false, 16)
      let password = md5(md5(config.admin.password) + salt)
      user = User.create({
        username: config.admin.username,
        password, salt
      })
    }
  },
  async signIn (ctx) {
    let {loginName, password} = ctx.request.body
    const user = await User.findOne({loginName: loginName}).catch(() => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
    if (user) {
      if (user.password === md5(password + user.salt)) {
        let {_id, username} = user
        const token = jwt.sign({
          _id, username,
          // 有效时间
          exp: config.jwt.expiration
        }, config.jwt.secret)
        ctx.body = {
          _id, username, token
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
      if (md5(oldPassword + user.salt) === user.password) {
        await User.findByIdAndUpdate(id, {
          username,
          password: md5(newPassword + user.salt)
        }).catch(() => {
          throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
        })
      } else {
        throw new ApiError(ApiErrorNames.USER_OLD_PWD_ERROR)
      }
    } else {
      throw new ApiError(ApiErrorNames.USER_NOT_EXIST)
    }
  }
}
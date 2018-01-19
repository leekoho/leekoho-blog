/**
 * Created by leekoho on 2018/1/18.
 */
import Link from '../models/link'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'
import util from '../utils'

export default {
  async getLinkList (ctx) {
    ctx.body = await Link.find().catch(() => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
  },

  async createLink (ctx) {
    let {name, url, introd} = ctx.request.body
    ctx.body = await Link.create({name, url, introd}).catch(err => {
      console.log(err)
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
  },

  async deleteLink (ctx) {
    let {id} = ctx.params
    util.verifyId(id)
    let link = await Link.findByIdAndRemove(id).catch(() => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
    if (!link) {
      throw new ApiError(ApiErrorNames.LINK_NOT_EXIST)
    }
  },

  async updateLink (ctx) {
    let {id} = ctx.params
    util.verifyId(id)
    let {name, url, introd} = ctx.request.body
    let link = await Link.findByIdAndUpdate(id, {name, url, introd}).catch(() => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
    if (!link) {
      throw new ApiError(ApiErrorNames.LINK_NOT_EXIST)
    }
  }
}
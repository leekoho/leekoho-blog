/**
 * Created by leekoho on 2018/1/18.
 */
import Tag from '../models/tag'
// import Article from '../models/article'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'
import util from '../utils'

export default {
  async getTagList (ctx) {
    let sort = {createTime: -1}
    let tagList = await Tag.find().sort(sort)
    ctx.body = tagList
  },

  async getTag (ctx) {
    let {id} = ctx.params
    util.verifyId(id)
    let tag = await Tag.findById(id)
    if (!tag) {
      throw new ApiError(ApiErrorNames.TAG_NOT_EXIST)
    }
    ctx.body = tag
  },

  async createTag (ctx) {
    let {name} = ctx.request.body
    if (!name) {
      throw new ApiError(ApiErrorNames.PARAMETER_INVAILD)
    }
    let rows = await Tag.find({name: name})
    if (rows.length > 0) {
      throw new ApiError(ApiErrorNames.TAG_IS_EXIST)
    }
    ctx.body = await Tag.create({name}).catch(() => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
  },

  async deleteTag (ctx) {
    let {id} = ctx.params
    util.verifyId(id)
    let rows = await Tag.findByIdAndRemove(id).catch(() => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
    if (!rows) {
      throw new ApiError(ApiErrorNames.TAG_NOT_EXIST)
    }
  },

  async updateTag (ctx) {
    let {id} = ctx.params
    util.verifyId(id)
    let {name} = ctx.request.body
    let rows = await Tag.findByIdAndUpdate(id, {name}).catch(() => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
    if (!rows) {
      throw new ApiError(ApiErrorNames.TAG_NOT_EXIST)
    }
  }
}
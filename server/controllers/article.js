/**
 *
 * Created by leekoho on 2018/1/13.
 */
import Article from '../models/article'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'
import util from '../utils'

async function getArticleList(ctx, type) {
  let page = parseInt(ctx.query.page) || 1
  let queryConditions = null
  switch (type) {
    case 'ALL':
      queryConditions = {}
      break
    case 'DRAFT':
      queryConditions = {status: 0}
      break
    case 'POST':
      queryConditions = {status: 1}
      break
    default:
      queryConditions = {status: 1}
      break
  }
  // 文章状态 1 => 已发布  0 => 未发布
  if (!/^[0-9]+$/.test(page)) {
    throw new ApiError(ApiErrorNames.PARAMETER_INVAILD)
  }
  // 一次只能查10条数据出来
  const limit = 10
  let skip = limit * (page - 1)
  let sort = {createTime: -1}
  let articleList = await Article.find(queryConditions).limit(limit).skip(skip).sort(sort).populate('tags').catch(err => {
    throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
  })
  let totalLength = await Article.count(queryConditions).catch(() => {
    throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
  })
  let totalPage = totalLength === 0 ? 0 : Math.ceil(totalLength / limit)
  let hasNextPage = page < totalPage
  let hasPrevPage = page !== 1 && page <= totalPage
  ctx.body = {articleList, totalPage, hasNextPage, hasPrevPage, totalLength}
}

export default {
  async getArticleList(ctx) {
    await getArticleList(ctx, 'POST')
  },
  async getDraftList (ctx) {
    await getArticleList(ctx, 'DRAFT')
  },

  async getArticle (ctx) {
    let {id} = ctx.params
    util.verifyId(id)
    let article = await Article.findById(id).populate('tags').catch(err => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
    if (!article) {
      throw new ApiError(ApiErrorNames.ARTICLE_NOT_EXIST)
    }
    // 更新文章访问次数
    await Article.findByIdAndUpdate(id, {visits: ++article.visits})
    ctx.body = article
  },

  async createArticle (ctx) {
    let {title, content, status, tags} = ctx.request.body
    ctx.body = await Article.create({title, content, status, tags}).catch(() => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
  },

  async deleteArticle (ctx) {
    let {id} = ctx.params
    util.verifyId(id)
    let deleteCount = await Article.findByIdAndRemove(id).catch(() => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
    if (!deleteCount) {
      throw new ApiError(ApiErrorNames.ARTICLE_NOT_EXIST)
    }
  },

  async updateArticle (ctx) {
    let {id} = ctx.params
    let {title, content, status} = ctx.request.body
    util.verifyId(id)
    let updateCount = await Article.findByIdAndUpdate(id, {
      title, content, status, updateTime: Date.now()
    }).catch(() => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
    if (!updateCount) {
      throw new ApiError(ApiErrorNames.ARTICLE_NOT_EXIST)
    }
  }
}
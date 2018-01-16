/**
 *
 * Created by leekoho on 2018/1/13.
 */
import Article from '../models/article'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'

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
  let articleList = await Article.find(queryConditions).limit(limit).skip(skip).sort(sort).catch(err => {
    throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
  })
  let count = await Article.count(queryConditions).catch(() => {
    throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
  })
  let totalPage = count === 0 ? 0 : Math.ceil(count / limit)
  let hasNextPage = page < totalPage
  let hasPrevPage = page !== 1 && page <= totalPage
  ctx.body = {articleList, totalPage, hasNextPage, hasPrevPage}
}

// 验证文章ID
function vaildArticleId(id) {
  // mongodb的`_id`的长度为24
  if (id.length !== 24 || !id) {
    throw new ApiError(ApiErrorNames.PARAMETER_INVAILD)
  }
}

export default {
  async getFrontArticleList(ctx) {
    await getArticleList(ctx, 'POST')
  },

  async getFrontArticle (ctx) {
    let {id} = ctx.params
    vaildArticleId(id)
    let article = await Article.findById(id).catch(err => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
    if (!article) {
      throw new ApiError(ApiErrorNames.ARTICLE_NOT_EXIST)
    }
    // 更新文章访问次数
    await Article.findByIdAndUpdate(id, {visitCount: ++article.visitCount})
    ctx.body = article
  },

  async createArticle (ctx) {
    let {title, content, status} = ctx.request.body
    ctx.body = await Article.create({title, content, status}).catch(() => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
  },

  async deleteArticle (ctx) {
    let {id} = ctx.params
    vaildArticleId(id)
    let count = await Article.count({_id: id}).catch(() => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
    if (count === 0) {
      throw new ApiError(ApiErrorNames.ARTICLE_NOT_EXIST)
    }
    await Article.remove({_id: id}).catch(() => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
  },

  async updateArticle (ctx) {
    let {id} = ctx.params
    let {title, content, status} = ctx.request.body
    vaildArticleId(id)
    await Article.update({_id: id}, {
      title, content, status, updateTime: Date.now()
    }).catch(() => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
  }
}
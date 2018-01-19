/**
 * Created by leekoho on 2018/1/19.
 */
import Comment from '../models/comment'
import Article from '../models/article'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'
import config from '../config'
async function getCommentList(ctx, type) {
  let queryConditions = null
  switch (type) {
    // 已回复
    case 'REPLAYED':
      // $ne 不等于
      queryConditions = {replay: {$ne: null}}
      break
    case 'UNREPLAY':
      queryConditions = {replay: null}
      break
    case 'ALL':
      queryConditions = {}
      break
    default :
      queryConditions = {}
      break
  }

  let page = parseInt(ctx.query.body) || 1
  const limit = config.pageSize
  let skip = limit * (page - 1)
  let commentList = await Comment.find(queryConditions).limit(limit).skip(skip).populate({
    path: 'article',
    select: 'title'
  }).catch(err => {
    throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
  })
  let totalLength = await Comment.count(queryConditions)
  let totalPage = totalLength === 0 ? 0 : Math.ceil(totalLength / limit)
  let hasNextPage = page < totalPage
  let hasPrevPage = page !== 1 && page <= totalPage
  ctx.body = {commentList, totalPage, hasNextPage, hasPrevPage, totalLength}
}

export default {
  async getAllCommentList (ctx) {
    await getCommentList(ctx, 'ALL')
  },

  async createComment (ctx) {
    let {articleId, content, nickname, email, url} = ctx.request.body
    let comment = await Comment.create({article: articleId, content, nickname, email, url})
    await Article.findByIdAndUpdate(articleId, {
      $push: {comments: comment._id, $position: 1}
    }).catch(err => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
  },

  async deleteComment (ctx) {
    let {id} = ctx.params
    let comment = await Comment.findByIdAndRemove(id)
    if (!comment) {
      throw new ApiError(ApiErrorNames.COMMENT_NOT_EXIST)
    }
    await Article.findByIdAndUpdate(comment.article, {
      $pull: {comments: comment._id}
    })
  },

  async replayComment (ctx) {
    // TODO 发送邮件
    let {id} = ctx.params
    let {reply} = ctx.request.body
    await Comment.findByIdAndUpdate(id, {reply}).catch(err => {
      throw new ApiError(ApiErrorNames.UNKNOW_ERROR)
    })
  }
}
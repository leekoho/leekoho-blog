/**
 * Created by leekoho on 2018/1/13.
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  // 文章标题
  title: {
    type: String,
    required: true,
    maxlength: [20, '标题长度不能超过20个字符']
  },
  // 文章摘要
  summary: {type: String, default: null},
  // 文章内容 储存Markdown格式的
  content: {type: String, required: true},
  // 标签
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
  // 评论
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  // 0 => 草稿  1 => 发布
  status: {
    type: Number,
    default: 0,
    min: 0,
    max: 1
  },
  // 访问数
  visits: {type: Number, default: 0},
  // 发布时间
  createTime: {type: Date, default: Date.now()},
  // 更新时间
  updateTime: {type: Date, default: Date.now()}
}, {versionKey: false})

export default mongoose.model('Article', ArticleSchema)
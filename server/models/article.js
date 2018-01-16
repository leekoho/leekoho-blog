/**
 * Created by leekoho on 2018/1/13.
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  // _id: {type: String, required: true},
  // 文章标题
  title: {type: String, required: true},
  // 文章内容 储存Markdown格式的
  content: {type: String, required: true},
  // 0 => 草稿  1 => 发布
  status: {type: Number, default: 0},
  // 访问数
  visitCount: {type: Number, default: 0},
  // 发布时间
  createTime: {type: Date, default: Date.now()},
  // 更新时间
  updateTime: {type: Date, default: Date.now()}
}, {versionKey: false})

export default mongoose.model('Article', ArticleSchema)
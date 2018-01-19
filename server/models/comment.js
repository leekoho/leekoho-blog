/**
 * Created by leekoho on 2018/1/19.
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  article: {type: Schema.Types.ObjectId, ref: 'Article'},
  // 评论内容
  content: {
    type: String,
    required: [true, '内容是必填的'],
    maxlength: [300, '内容长度不能超过300个字符']
  },
  // 昵称
  nickname: {
    type: String,
    maxlength: [15, '昵称长度不能超过15个字符'],
    required: [true, '昵称是必填的']
  },
  // 电子邮箱
  email: {
    type: String,
    default: null,
    validate: {
      validator (value) {
        if (value) {
          return  /^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$/i.test(value)
        }
      },
      message: '不是正确的邮箱地址'
    }
  },
  // 个人主页
  url: {
    type: String,
    default: null,
    validate: {
      validator (value) {
        if (value) {
          return /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(value)
        }
      },
      message: '不是正确的网址'
    }
  },
  // 作者回复
  reply: {type: String, default: null},
  // 创建时间
  createTime: {type: Date, default: Date.now()}
}, {versionKey: false})

export default mongoose.model('Comment', CommentSchema)
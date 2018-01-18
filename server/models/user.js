/**
 * Created by leekoho on 2018/1/16.
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
  // 用户名
  username: {type: String, required: true},
  // 密码
  password: {type: String, required: true},
  // 盐
  salt: {type: String, required: true},
}, {versionKey: false})

export default mongoose.model('User', UserSchema)
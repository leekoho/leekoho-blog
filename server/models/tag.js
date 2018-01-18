/**
 * Created by leekoho on 2018/1/16.
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const TagSchema = new Schema({
  // 标签名
  name: {type: String, required: true}
}, {versionKey: false})

export default mongoose.model('Tag', TagSchema)
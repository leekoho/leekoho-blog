/**
 * Created by leekoho on 2018/1/18.
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const LinkSchema = new Schema({
  name: {type: String, required: true},
  url: {type: String, required: true},
  introd: {type: String, required: true}
}, {versionKey: false})

export default mongoose.model('Link', LinkSchema)
/**
 * Created by leekoho on 2018/1/16.
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
}, {versionKey: false})

export default mongoose.model('User', UserSchema)
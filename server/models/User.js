import { Schema, model } from "mongoose"

const UserSchema = new Schema({
  email: String,
  pfp: [String, null],
  username: String,
  display_name: String,
  password: String
}, { timestamps: true })

export default model('user', UserSchema)
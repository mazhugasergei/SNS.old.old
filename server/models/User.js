import { Schema, model } from "mongoose"

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  display_name: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default model('User', UserSchema)
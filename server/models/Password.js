import { Schema, model } from 'mongoose'

const PasswordSchema = new Schema({
  author_id: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

export default model('Password', PasswordSchema)
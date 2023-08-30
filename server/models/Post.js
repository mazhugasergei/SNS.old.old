import { Schema, model } from "mongoose"

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default model('Post', PostSchema)
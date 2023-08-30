import Post from '../models/Post.js'

const posts_get = async (req, res) => {
  await Post.find().sort({ createdAt: -1 })
    .then(result => res.json(result))
    .catch(err => res.status(400).json({ message: err.message }))
}

export default {
  posts_get
}
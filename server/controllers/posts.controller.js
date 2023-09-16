import Post from '../models/Post.js'

const posts_get = async (req, res) => {
  await Post.find().sort({ createdAt: -1 })
    .then(result => res.json(result))
    .catch(err => console.error(err))
}

export default {
  posts_get
}
import User from '../models/User.js'

const users_get = async (req, res) => {
  await User.find().sort({ createdAt: -1 })
    .then(result => res.json(result))
    .catch(err => console.error(err))
}

const user_get = async (req, res) => {
  await User.findById(req.params.id)
    .then(result => res.json(result))
    .catch(err => console.error(err))
}

export default {
  users_get, user_get
}
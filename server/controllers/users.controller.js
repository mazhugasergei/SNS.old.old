import User from '../models/User.js'
import jwt from 'jsonwebtoken'

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

const user_update = async (req, res) => {
  const { newUsername, newDisplayName } = req.body
  // if username is in use
  const existing_user = await User.findOne({ username: newUsername })
    .catch(err => console.error(err))
  if(existing_user && existing_user._id.toString() !== req._id){ res.json({ status: 1, message: "The ID is in use" }); return }
  // update user
  const user = await User.findByIdAndUpdate(req._id, { username: newUsername, display_name: newDisplayName }, { new: true })
    .catch(err => console.error(err))
  // token
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '30d' })

  res.json({ token })
}

export default {
  users_get, user_get, user_update
}
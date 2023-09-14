import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const is_auth = async (req, res) => {
  res.json({ _id: req._id, display_name: req.display_name })
}

const log_in = async (req, res) => {
  const { username, password } = req.body
  // user
  const user = await User.findOne({ username })
    .catch(err => res.status(400).json({ message: err.message }))
  if(!user){ res.json({ status: 1, message: "User doesn\'t exist" }); return }
  // password
  const isValid = await bcrypt.compare(password, user.password)
    .catch(err => res.status(400).json({ message: err.message }))
  if(!isValid){ res.json({ status: 2, message: "Incorrect password" }); return }
  // token
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '30d' })
  res.json({ _id: user._id, display_name: user.display_name, token })
}

const sign_up = async (req, res) => {
  const { username, password } = req.body
  // does exist?
  const user = await User.findOne({ username })
    .catch(err => res.status(400).json({ message: err.message }))
  if(user){ res.json({ status: 1, message: "This username is taken" }) }
  // TODO: create a user
}

export default {
  is_auth, log_in
}
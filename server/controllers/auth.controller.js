import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '5m' })
  res.json({ token })
}

export default {
  log_in
}
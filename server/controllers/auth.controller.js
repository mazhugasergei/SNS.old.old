import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const log_in = async (req, res) => {
  const { username, password } = req.body
  // user
  const user = await User.findOne({ username })
    .catch(err => res.status(400).json({ message: err.message }))
  if(!user){ res.send('incorrect credentials'); return }
  // password
  const isValid = await bcrypt.compare(password, user.password)
    .catch(err => res.status(400).json({ message: err.message }))
  if(!isValid){ res.send('incorrect credentials'); return }
  // token
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '5m' })
  res.json({ token })
}

export default {
  log_in
}
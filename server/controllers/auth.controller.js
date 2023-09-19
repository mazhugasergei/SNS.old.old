import User from '../models/User.js'
import VerificationCode from '../models/VerificationCode.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const is_auth = async (req, res) => {
  res.json({
    _id: req._id,
    username: req.username,
    display_name: req.display_name
  })
}

const log_in = async (req, res) => {
  const { email, password } = req.body
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const username = emailRegex.test(email) ? null : email
  // does exist?
  const user = await User.findOne(username ? { username } : { email })
    .catch(err => console.error(err))
  if(!user){ res.json({ status: 1, message: "User doesn\'t exist" }); return }
  // password
  const isValid = await bcrypt.compare(password, user.password)
    .catch(err => console.error(err))
  if(!isValid){ res.json({ status: 2, message: "Incorrect password" }); return }
  // token
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '30d' })

  res.json({
    _id: user._id,
    username: user.username,
    display_name: user.display_name,
    token
  })
}

const sign_up = async (req, res) => {
  const { email } = req.body
  // does exist?
  const user = await User.findOne({ email })
    .catch(err => console.error(err))
  if(user){ res.json({ status: 1, message: "This Email is in use" }) }
  // send verification code email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  })
  const verificationCode = Math.floor((Math.random() * 10000)).toString().padStart(4, '0')
  const message = {
    from: `SNS Web App <${process.env.EMAIL}>`,
    to: `Recipient <${email}>`,
    subject: 'SNS Web App Verification Code',
    text: `Your SNS Web App verification code: ${verificationCode}`
  }
  transporter.sendMail(message, (err, info) => {
    if(err){ console.error(err); return }
  })
  // create/update a code record with expiration in 1 minute
  const code = await VerificationCode.findOne({ email })
    .catch(err => console.error(err))
  // update
  if(code) await VerificationCode.updateOne({ email, verificationCode })
    .catch(err => console.error(err))
  // create
  else await VerificationCode.create({ email, verificationCode })
    .catch(err => console.error(err))

  res.send(true)
}

const verify_code = async (req, res) => {
  const { email, password, verificationCode } = req.body
  // does exist?
  const code = await VerificationCode.findOne({ email, verificationCode })
    .catch(err => console.error(err))
  if(!code){ res.json({ status: true, message: "The code is wrong / expired" }); return }
  // delete a code record
  await VerificationCode.findOneAndDelete({ email })
    .catch(err => console.error(err))
  // create a user
  const user = await User.create({
    email,
    username: email.substring(0, email.indexOf('@')),
    display_name: email.substring(0, email.indexOf('@')),
    password: await bcrypt.hash(password, 12)
  })
    .catch(err => console.error(err))
  // token
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '30d' })

  res.json({
    _id: user._id,
    username: user.username,
    display_name: user.display_name,
    token
  })
}

export default {
  is_auth, log_in, sign_up, verify_code
}
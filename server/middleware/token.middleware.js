import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export default async (req, res, next) => {
  // verify token
  const token = req.headers['x-access-token']
  if(!token) return
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
    if(err){ console.error(err); return }
    req._id = decoded.user._id
    req.username = decoded.user.username
    req.display_name = decoded.user.display_name
  })
  // if verified, check if the user still exists
  const user = await User.findById(req._id)
  if(!user) return
  else next()
}
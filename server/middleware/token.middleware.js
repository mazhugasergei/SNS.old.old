import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const token = req.headers['x-access-token']
  if(!token){ res.json({ message: "no token" }); return }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
    if(err){ res.json({ message: err.message }); return }
    req._id = decoded.user._id
    req.display_name = decoded.user.display_name
    next()
  })
}
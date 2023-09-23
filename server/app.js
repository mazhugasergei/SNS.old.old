import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from './middleware/cors.middleware.js'
import bodyParser from 'body-parser'
// routers
import posts_router from './routers/posts.router.js'
import users_router from './routers/users.router.js'
import auth_router from './routers/auth.router.js'

const app = express()
app.use(express.json())
app.use(cors())
// extend allowed request body size
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// routes
app.use('/posts', posts_router)
app.use('/users', users_router)
app.use('/auth', auth_router)

// connect to db
mongoose.connect(process.env.MONGODB_URI)
  .then(()=>{
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`)
    })
  })
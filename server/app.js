import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
// routers
import posts_router from './routers/posts.router.js'
import users_router from './routers/users.router.js'
import passwords_router from './routers/passwords.router.js'

const app = express()

app.use(express.json())
app.use(cors({ origin: process.env.CORS_ORIGIN }))

// routes
app.use('/api/posts', posts_router)
app.use('/api/users', users_router)
app.use('/api/password', passwords_router)

// connect to db
mongoose.connect(process.env.MONGODB_URI)
  .then(()=>{
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`)
    })
  })
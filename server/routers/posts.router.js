import express from 'express'
import controller from '../controllers/posts.controller.js'

const router = express.Router()

router.get('/', controller.posts_get)

export default router
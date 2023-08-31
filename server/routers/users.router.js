import express from 'express'
import controller from '../controllers/users.controller.js'

const router = express.Router()

router.get('/', controller.users_get)

export default router
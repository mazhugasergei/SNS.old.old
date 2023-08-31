import express from 'express'
import controller from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/login', controller.log_in)

export default router
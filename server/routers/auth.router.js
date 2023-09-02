import express from 'express'
import controller from '../controllers/auth.controller.js'
import verify_token from '../middleware/verify_token.middleware.js'

const router = express.Router()

router.post('/login', controller.log_in)
router.get('/is-auth', verify_token, controller.is_auth)

export default router
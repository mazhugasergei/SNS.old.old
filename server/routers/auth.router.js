import express from 'express'
import controller from '../controllers/auth.controller.js'
import token from '../middleware/token.middleware.js'

const router = express.Router()

router.post('/log-in', controller.log_in)
router.post('/sign-up', controller.sign_up)
router.get('/is-auth', token, controller.is_auth)

export default router
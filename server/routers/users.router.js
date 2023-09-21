import express from 'express'
import controller from '../controllers/users.controller.js'
import token from '../middleware/token.middleware.js'

const router = express.Router()

router.get('/', controller.users_get)
router.get('/:id', controller.user_get)
router.post('/update', token, controller.user_update)
router.post('/delete', token, controller.user_delete)

export default router
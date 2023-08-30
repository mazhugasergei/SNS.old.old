import express from 'express'
import controller from '../controllers/users.controller.js'

const router = express.Router()

router.get('/', controller.users_get)
router.get('/id/:id', controller.user_get_by_id)
router.get('/username/:username', controller.user_get_by_username)

export default router
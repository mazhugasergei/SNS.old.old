import express from 'express'
import controller from '../controllers/passwords.controller.js'

const router = express.Router()

router.get('/:author_id', controller.password_get)

export default router
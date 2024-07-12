import { Router } from 'express'
import { createComment } from './comment.controller.js'
import { auth } from '../../middlewares/auth.js'

const commentRouter = Router()

commentRouter.post('/', auth, createComment)

export { commentRouter }
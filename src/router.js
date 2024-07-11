import { Router } from 'express';
import { router as gameRoutes } from './entities/games/games.routes.js'
import { router as usersRoutes } from './entities/users/users.routes.js'

const router = Router()

router.use('/games', gameRoutes)
router.use('/users', usersRoutes)

export { router }
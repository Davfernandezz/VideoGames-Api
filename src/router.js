import { Router } from 'express';
import { router as gameRoutes} from './entities/games/games.routes.js'

const router = Router()

router.use('/games', gameRoutes)

export {router}
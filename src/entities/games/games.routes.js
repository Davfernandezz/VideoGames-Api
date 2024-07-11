import { Router } from "express";
import { createGame } from "./games.controller.js";

const router = Router()

router.post('/games', createGame)

export {router}
import { Types } from "mongoose"
import Game from "./game.model.js"

//POST
export const createGame = async (req, res) => {
    try {
        const { tittle, description } = req.body

        if (!tittle || !description) {
            throw new Error('Tittle and description ara required')
        }
        await Game.create({
            tittle: tittle,
            description: description
        })
        res.status(201).json({
            success: true,
            message: "Game created",

        })
    } catch (error) {
        if (error.message === 'Tittle and description ara required') {
            return res.status(400).json(
                {
                    success: false,
                    message: "Error creating game",
                    error: error.message
                }
            )
        }
        res.status(500).json({
            success: false,
            message: "Error creating game",
            error: error.message
        })
    }
}

//GET
export const getAllGames = async (req, res) => {
    try {
        const games = await Game.find()
            .select('-updatedAt')
            .populate({
                path: 'userFavourites',
                select: "-password"
            })

        res.status(200).json({
            success: true,
            message: "Game retrieved succesfully",
            data: games
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrievening game",
            error: error.message
        })
    }
}

//DELETE
export const deleteGame = async (req, res) => {
    try {
        const idDelete = req.params.id
        const idToDeleteValid = Types.ObjectId.isValid(idDelete)

        if (!idToDeleteValid) {
            return res.status(400).json({
                success: false,
                message: "Id not valid"
            })
        }
        const deletedGame = await Game.findByIdAndDelete(idDelete)
        if (!deletedGame) {
            return res.status(404).json({
                succes: false,
                message: "Not Game found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Game deleted",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting games",
            error: error.message
        })
    }
}

//PUT
export const addFavouriteGame = async (req, res) => {
    try {
        const gameId = req.params.id
        const userId = req.tokenData.id

        const game = await Game.findById(gameId)

        if (!game) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Game not found"
                }
            )
        }
        // game.userFavourites.includes(userId)
        game.userFavourites.push(userId)
        const updateGame = await game.save()

        res.json({
            success: true,
            message: "User added to favourite game",
            data: updateGame
        })
    } catch (error) {
        res.status(500).json(
            {
                succes: false,
                message: "Error adding user to favourite",
                error: error.message
            }
        )
    }
}
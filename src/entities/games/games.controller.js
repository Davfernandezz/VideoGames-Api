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
export const deleteGame = async(req, res) =>{
    try {
        const idDelete= req.params.id
        const idToDeleteValid= Types.ObjectId.isValid(idDelete)

        if(!idToDeleteValid){
            return res.status(400).json({
                success:false,
                message:"Id not valid"
            })
        }

        const deletedGame =await Game.findByIdAndDelete(idDelete)
        if(!deletedGame){
            return res.status(404).json({
                succes:false,
                message:"Not Game found"
            })
        }

        res.status(200).json({
            success:true,
            message:"Game deleted",
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error deleting games",
            error:error.message
        })
    }
}
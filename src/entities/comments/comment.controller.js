import Game from "../games/game.model.js"
import Comment from "./comment.model.js"

//POST
export const createComment = async (req, res) => {
    try {
        const userId = req.tokenData.id
        const gameId = req.body.gameId
        const message = req.body.message

        const game = await Game.findById(gameId)   

        const newComment = await Comment.create({
            message: message,
            user: userId
        })
        game.comments.push(newComment._id)
        const addCommentToGame = await game.save()

        res.status(200).json({
            success: true,
            message: "comment created",
            data: addCommentToGame
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating game comment",
            error: error.message
        })
    }
}
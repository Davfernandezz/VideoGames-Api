import Game from "./game.model.js"

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
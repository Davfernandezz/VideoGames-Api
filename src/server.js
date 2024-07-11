import express from 'express';
import 'dotenv/config';
import { dbConnection } from './database/db.js';
import { createGame } from './entities/games/games.controller.js';
import { router as gameRoutes} from './entities/games/games.routes.js';


const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json())

app.get('/healthy', (req, res) => {
    res.json(
        {
            success: true,
            message: "Server is healthy"
        }
    )
})


// app.post('/games', createGame)

app.use('/api', gameRoutes)


dbConnection()
    .then(() => {
        console.log('Database Connected');
        app.listen(PORT, () => {
            console.log(`Server running ${PORT}`);
        });
    })
    .catch(error => {
        console.log('Error conecction database: ' + error.message);
    })
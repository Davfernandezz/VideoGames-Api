// const express = require('express')
import express from 'express';
import 'dotenv/config';
import { dbConnection } from './database/db.js';


const app = express()

const PORT = process.env.PORT || 4000

app.get('/healthy', (req, res) => {
    res.json(
        {
            success: true,
            message: "Server is healthy"
        }
    )
})


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
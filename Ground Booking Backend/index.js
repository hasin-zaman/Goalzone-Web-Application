import express from 'express'
const app = express();

import cors from 'cors'
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ['GET','POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type','Authorization'],
        credentials: true
    })
)

import dotenv from 'dotenv'
dotenv.config() // load environment variables from .env file

import mongoose from 'mongoose';
import { cityRouter } from './src/routes/cityRoutes.js'
import { areaRouter } from './src/routes/areaRoutes.js'
import { groundRouter } from './src/routes/groundRoutes.js'
import { slotRouter } from './src/routes/slotRoutes.js'
import { userRouter } from './src/routes/userRoutes.js'
import { reviewRouter } from './src/routes/reviewRoutes.js'
import { bookingRouter } from './src/routes/bookingRoutes.js'

// sets up the Express application to handle incoming data in JSON format
app.use(express.json());

// users router
app.use('/', userRouter);

// cities router
app.use('/', cityRouter);

// areas router
app.use('/', areaRouter);

// grounds router
app.use('/', groundRouter);

// slots router
app.use('/', slotRouter);

// reviews router
app.use('/', reviewRouter);

// bookings router
app.use('/', bookingRouter);

// 5.Bookings CRUD operations //

// CREATE new booking for a particular ground
// app.post('/users/:userID/bookings', addSlot);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
        console.log('Connected to MongoDB');

        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            console.log(`Node API app is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

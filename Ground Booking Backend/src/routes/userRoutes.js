import express from 'express'
const userRouter = express.Router();

import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config() // load environment variables from .env file

import { home, userSignUp, getAllUsers, userLogin, updateUser, deleteUser, deleteAll } from "../controllers/user_controllers.js"
import { verifyToken } from '../helpers/authHelpers.js'

// creates endpoint to handle GET requests to the '/' URL path
userRouter.get('/', home);

// CREATE new user
userRouter.post('/users/signup', userSignUp)

// READ / GET all users
userRouter.get('/users', getAllUsers)

// READ / GET individual user
userRouter.get('/users/login', userLogin)

// UPDATE a user
userRouter.put('/users/:id', updateUser)

// DELETE a user
userRouter.delete('/users/:id', deleteUser)

// DELETE all users
userRouter.delete('/users', deleteAll)

// protected route
userRouter.get('/users/protected', verifyToken, function (req, res) {

    jwt.verify(req.token, `${process.env.JWT_SECRET_KEY}`, function (err, data) {
        if (err) {
            res.status(403).json({ message: 'Invalid token' });
        } else {
            res.status(200).json({
                message: 'Profile accessed',
                data: data
            });
        }
    })
})

export { userRouter }
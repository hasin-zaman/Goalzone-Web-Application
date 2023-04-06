import express from 'express'
const groundRouter = express.Router();
import { addGround, viewGrounds, viewGround, updateGround, deleteGround } from "../controllers/ground_controllers.js"

// CREATE new ground in a particular area
groundRouter.post('/cities/:cityID/areas/:areaID/grounds', addGround);

// GET all grounds in a particular area
groundRouter.get('/cities/:cityID/areas/:areaID/grounds', viewGrounds);

// GET particular ground in a particular area. Search by name
groundRouter.get('/cities/:cityID/areas/:areaID/grounds', viewGround);

// UPDATE a particular ground
groundRouter.put('/cities/:cityID/areas/:areaID/grounds/:groundID', updateGround);

// DELETE a particular ground
groundRouter.delete('/cities/:cityID/areas/:areaID/grounds/:groundID', deleteGround);

export { groundRouter }
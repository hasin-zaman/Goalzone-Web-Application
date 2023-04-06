import express from 'express'
const areaRouter = express.Router();
import { addArea, getArea, getAllAreas, updateArea, deleteArea } from "../controllers/area_controllers.js"

// CREATE new area in a particular city
areaRouter.post('/cities/:cityID/areas', addArea);

// GET individual area of a particular city
areaRouter.get('/cities/:cityID/areas/:areaID', getArea);

// GET all areas of a particular city
areaRouter.get('/cities/:cityID/areas', getAllAreas);

// UPDATE individual area of a particular city
areaRouter.put('/cities/:cityID/areas/:areaID', updateArea);

// DELETE individual area of a particular city
areaRouter.delete('/cities/:cityID/areas/:areaID', deleteArea);

export { areaRouter }
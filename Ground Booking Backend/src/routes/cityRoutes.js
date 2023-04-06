import express from 'express'
const cityRouter = express.Router();
import { addCity, getAllCities, getCity, deleteCity, } from "../controllers/city_controllers.js";
import { verifyToken } from '../helpers/authHelpers.js';

cityRouter.post('/cities', addCity);
cityRouter.get('/cities/:id', getCity);
cityRouter.get('/cities', getAllCities);
cityRouter.delete('/cities/:id', deleteCity);

export { cityRouter }


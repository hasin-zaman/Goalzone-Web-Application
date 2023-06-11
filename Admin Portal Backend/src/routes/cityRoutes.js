const express = require('express');
const router = express.Router();
const { verifyAccessToken }=require('../helpers/authenticationHelpers.js');
const {addCity, getAllCities, getCity, updateCity, deleteCity}=require('../controllers/cityController');

router.post('/countries/:countryId/cities', verifyAccessToken(["Admin"]), addCity);

router.get('/countries/:countryId/cities', verifyAccessToken(["Admin"]), getAllCities);

router.get('/countries/:countryId/cities/:id', verifyAccessToken(["Admin"]), getCity);

router.put('/countries/:countryId/cities/:id', verifyAccessToken(["Admin"]), updateCity);

router.delete('/countries/:countryId/cities/:id', verifyAccessToken(["Admin"]), deleteCity);

module.exports=router;
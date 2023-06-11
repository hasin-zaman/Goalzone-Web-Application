const express = require('express');
const router = express.Router();
const {getAllCities, getCity}=require('../controllers/cityController');

router.get('/countries/:countryId/cities', getAllCities);

router.get('/countries/:countryId/cities/:id', getCity);

module.exports=router;
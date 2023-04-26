const express = require('express');
const router = express.Router();
const { verifyAccessToken }=require('../helpers/authenticationHelpers.js');
const {addCity, getAllCities, getCity, updateCity, deleteCity}=require('../controllers/cityController');

router.post('/', verifyAccessToken, addCity);

router.get('/', getAllCities);

router.get('/:id', getCity);

router.put('/:id', verifyAccessToken, updateCity);

router.delete('/:id', verifyAccessToken, deleteCity);

module.exports=router;
const express = require('express');
const router = express.Router();
const {getAllCountries, getCountry}=require('../controllers/countryController');

router.get('/', getAllCountries);

router.get('/:id', getCountry);

module.exports=router;
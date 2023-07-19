const express = require('express');
const router = express.Router();
const { verifyAccessToken }=require('../helpers/authenticationHelpers.js');
const {addCountry, getAllCountries, getCountry, updateCountry, deleteCountry}=require('../controllers/countryController');

router.post('/', verifyAccessToken(["Admin"]), addCountry);

router.get('/', verifyAccessToken(["Admin"]), getAllCountries);

router.get('/:id', verifyAccessToken(["Admin"]), getCountry);

router.put('/:id', verifyAccessToken(["Admin"]), updateCountry);

router.delete('/:id', verifyAccessToken(["Admin"]), deleteCountry);

module.exports=router;
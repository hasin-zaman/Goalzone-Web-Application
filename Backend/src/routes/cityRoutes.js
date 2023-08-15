const express = require('express');
const router = express.Router();
const authentication=require('../middlewares/authentication.js');
const { checkRole, matchUser }=require('../middlewares/authorization.js');
const {getActiveCities, addCity, getAllCities, getCity, updateCity, deleteCity}=require('../controllers/cityController');

//main
router.get('/countries/:countryId/cities', getActiveCities);

//admin
router.post('/admin/countries/:countryId/cities', addCity);

router.get('/admin/countries/:countryId/cities', getAllCities);

router.get('/admin/countries/:countryId/cities/:id', getCity);

router.patch('/admin/countries/:countryId/cities/:id', updateCity);

router.delete('/admin/countries/:countryId/cities/:id', deleteCity);

module.exports=router;
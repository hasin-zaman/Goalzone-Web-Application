const express = require('express');
const router = express.Router();
const authentication=require('../middlewares/authentication.js');
const { checkRole, matchUser }=require('../middlewares/authorization.js');
const {getActiveCountries, addCountry, getAllCountries, getCountry, updateCountry, deleteCountry}=require('../controllers/countryController');

//main
router.get('/countries', getActiveCountries);


//admin
router.post('/admin/countries', addCountry);

// router.get('/admin/countries/:userId', authentication(), checkRole('Player'), matchUser(), getAllCountries);

router.get('/admin/countries', getAllCountries);

router.get('/admin/countries/:id', getCountry);

router.patch('/admin/countries/:id', updateCountry);

router.delete('/admin/countries/:id', deleteCountry);

module.exports=router;
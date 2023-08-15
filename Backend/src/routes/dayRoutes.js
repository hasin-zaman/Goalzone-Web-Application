const express = require('express');
const router = express.Router();
const authentication=require('../middlewares/authentication.js');
const { checkRole, matchUser }=require('../middlewares/authorization.js');
const {getAllDays, getDay}=require('../controllers/dayController');

router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/days', getAllDays);

router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId', getDay);

module.exports=router;
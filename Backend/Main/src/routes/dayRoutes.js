const express = require('express');
const router = express.Router();
const { verifyAccessToken }=require('../helpers/authenticationHelpers.js');
const {getAllDays}=require('../controllers/dayController');

router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/days', getAllDays);

module.exports=router;
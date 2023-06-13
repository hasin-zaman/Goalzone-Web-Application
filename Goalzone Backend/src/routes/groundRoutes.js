const express = require('express');
const router = express.Router();
const { verifyAccessToken }=require('../helpers/authenticationHelpers.js');
const {registerGround, getAllGrounds, getGround, updateGround, deleteGround}=require('../controllers/groundController');

router.post('/countries/:countryId/cities/:cityId/grounds/:userId', registerGround);

router.get('/countries/:countryId/cities/:cityId/grounds', getAllGrounds);

router.get('/countries/:countryId/cities/:cityId/grounds/:id', getGround);

router.put('/countries/:countryId/cities/:cityId/grounds/:id', updateGround);

router.delete('/countries/:countryId/cities/:cityId/grounds/:id', deleteGround);

module.exports=router;
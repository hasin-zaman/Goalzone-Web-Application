const express = require('express');
const router = express.Router();
const { verifyAccessToken }=require('../helpers/authenticationHelpers.js');
const {addGround, getAllGrounds, getGround, updateGround, deleteGround}=require('../controllers/groundController');

router.post('/countries/:countryId/cities/:cityId/grounds', verifyAccessToken(['Admin']), addGround);

router.get('/countries/:countryId/cities/:cityId/grounds', verifyAccessToken(['Admin']), getAllGrounds);

router.get('/countries/:countryId/cities/:cityId/grounds/:id', verifyAccessToken(['Admin']), getGround);

router.put('/countries/:countryId/cities/:cityId/grounds/:id', verifyAccessToken(['Admin']), updateGround);

router.delete('/countries/:countryId/cities/:cityId/grounds/:id', verifyAccessToken(['Admin']), deleteGround);

module.exports=router;
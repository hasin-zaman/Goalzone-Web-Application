const express = require('express');
const router = express.Router();
const { verifyAccessToken }=require('../helpers/authenticationHelpers.js');
const {registerGround, getAllGrounds, getGround, updateGround, deleteGround}=require('../controllers/groundController');

router.post('/cities/:cityId/grounds/:userId', registerGround);

router.get('/cities/:cityId/grounds', getAllGrounds);

router.get('/cities/:cityId/grounds/:id', getGround);

router.put('/cities/:cityId/grounds/:id', updateGround);

router.delete('/cities/:cityId/grounds/:id', deleteGround);

module.exports=router;
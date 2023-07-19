const express = require('express');
const router = express.Router();
const { verifyAccessToken }=require('../helpers/authenticationHelpers.js');
const {createSlot, getAllSlots, getSlot, updateSlot, deleteSlot}=require('../controllers/slotController');

router.post('/countries/:countryId/cities/:cityId/grounds/:groundId/slots/:userId', createSlot);

router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/slots', getAllSlots);

router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/slots/:id', getSlot);

router.put('/countries/:countryId/cities/:cityId/grounds/:groundId/slots/:id', updateSlot);

router.delete('/countries/:countryId/cities/:cityId/grounds/:groundId/slots/:id', deleteSlot);

module.exports=router;
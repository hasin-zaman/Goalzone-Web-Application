const express = require('express');
const router = express.Router();
const { verifyAccessToken }=require('../helpers/authenticationHelpers.js');
const {addGround, getAllGrounds, getGround, updateGround, deleteGround}=require('../controllers/groundController');

router.post('/', addGround);

router.get('/', getAllGrounds);

router.get('/:id', getGround);

router.put('/:id', updateGround);

router.delete('/:id', deleteGround);

module.exports=router;
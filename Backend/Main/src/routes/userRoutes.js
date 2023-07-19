const express = require('express');
const router = express.Router();
const { verifyAccessToken }=require('../helpers/authenticationHelpers.js');
const {userSignup, userLogin, getUser, updateUser, deleteUser}=require('../controllers/userController');


router.post('/signup', userSignup);

router.post('/login', userLogin);

router.get('/:userId', getUser);

router.put('/:userId', updateUser);

router.delete('/:userId', deleteUser);

module.exports=router;
const express = require('express');
const router = express.Router();
const { verifyAccessToken }=require('../helpers/authenticationHelpers.js');
const {userSignup, userLogin, getAllUsers, getUser, updateUser, deleteUser, deleteAll}=require('../controllers/userController');


router.post('/signup', userSignup);

router.post('/login', userLogin);

router.get('/', getAllUsers);

router.get('/:userId', getUser);

router.put('/:userId', updateUser);

router.delete('/:userId', deleteUser);

router.delete('/', deleteAll);

module.exports=router;
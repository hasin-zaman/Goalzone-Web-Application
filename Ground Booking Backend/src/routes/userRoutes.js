const express = require('express');
const router = express.Router();
const { verifyAccessToken }=require('../helpers/authenticationHelpers.js');
const {userSignup, userLogin, getAllUsers, getUser, updateUser, deleteUser, deleteAll}=require('../controllers/userController');


router.post('/signup', userSignup);

router.post('/login', userLogin);

router.get('/', getAllUsers);

router.get('/:id', verifyAccessToken, getUser);

router.put('/:id', verifyAccessToken, updateUser);

router.delete('/:id', deleteUser);

router.delete('/', verifyAccessToken, deleteAll);

module.exports=router;
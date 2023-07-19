const express = require('express');
const router = express.Router();
const { verifyAccessToken }=require('../helpers/authenticationHelpers.js');
const {addUser, adminLogin, getAllUsers, getUser, updateUser, deleteUser, deleteAll}=require('../controllers/userController');


router.post('/', verifyAccessToken(["Admin"]), addUser);

router.post('/login', adminLogin);

router.get('/', verifyAccessToken(["Admin"]), getAllUsers);

router.get('/:userId', verifyAccessToken(["Admin"]), getUser);

router.put('/:userId', verifyAccessToken(["Admin"]), updateUser);

router.delete('/:userId', verifyAccessToken(["Admin"]), deleteUser);

router.delete('/', verifyAccessToken(["Admin"]), deleteAll);

module.exports=router;
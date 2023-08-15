const express = require('express');
const router = express.Router();
const authentication=require('../middlewares/authentication.js');
const { checkRole, matchUser }=require('../middlewares/authorization.js');
const {signup, login, getProfile, updateMyProfile, deleteMyProfile, addUser, adminLogin, getAllUsers, getUser, updateUser, deleteUser}=require('../controllers/userController');

//main
router.post('/users/signup', signup);

router.post('/users/login', login);

router.get('/users/:userId', getProfile);

router.patch('/users/:userId', updateMyProfile);

router.delete('/users/:userId', deleteMyProfile);

//admin
router.post('/admin/users', addUser);

router.post('/admin/users/login', adminLogin);

router.get('/admin/users', getAllUsers);

router.get('/admin/users/:userId', getUser);

router.patch('/admin/users/:userId', updateUser);

router.delete('/admin/users/:userId', deleteUser);

module.exports=router;
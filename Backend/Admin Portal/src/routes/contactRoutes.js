const express = require('express');
const router = express.Router();
const { verifyAccessToken }=require('../helpers/authenticationHelpers.js');
const {getAllMessages, getMessage, updateMessageStatusToRead, updateMessageStatusToResponded, deleteMessage}=require('../controllers/contactController');

router.get('/', verifyAccessToken(["Admin"]), getAllMessages);

router.get('/:id', verifyAccessToken(["Admin"]), getMessage);

router.patch('/status/read/:id', verifyAccessToken(["Admin"]), updateMessageStatusToRead);

router.patch('/status/responded/:id', verifyAccessToken(["Admin"]), updateMessageStatusToResponded);

router.delete('/:id', verifyAccessToken(["Admin"]), deleteMessage);

module.exports=router;
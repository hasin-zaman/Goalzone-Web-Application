const express = require('express');
const router = express.Router();
const authentication=require('../middlewares/authentication.js');
const { checkRole, matchUser }=require('../middlewares/authorization.js');
const {sendMessage, getAllMessages, getMessage, updateStatusToRead, updateStatusToResponded, deleteMessage}=require('../controllers/contactController');

//main
router.post('/contact', sendMessage);

//admin
router.get('/admin/contact', getAllMessages);

router.get('/admin/contact/:id', getMessage);

router.patch('/admin/contact/:id/status/read', updateStatusToRead);

router.patch('/admin/contact/:id/status/responded', updateStatusToResponded);

router.delete('/admin/contact/:id', deleteMessage);

module.exports=router;
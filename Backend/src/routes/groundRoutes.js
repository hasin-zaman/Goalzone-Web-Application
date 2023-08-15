const express = require('express');
const router = express.Router();
const authentication=require('../middlewares/authentication.js');
const { checkRole, matchUser }=require('../middlewares/authorization.js');
const {registerGround, getActiveGrounds, getActiveGround, updateMyGround, deactivateGround, addGround, getAllGrounds, getGround, updateGround, deleteGround}=require('../controllers/groundController');

//main
router.post('/countries/:countryId/cities/:cityId/grounds/:userId', registerGround);

router.get('/countries/:countryId/cities/:cityId/grounds', getActiveGrounds);

router.get('/countries/:countryId/cities/:cityId/grounds/:id', getActiveGround);

router.patch('/countries/:countryId/cities/:cityId/grounds/:id', updateMyGround);

router.patch('/countries/:countryId/cities/:cityId/grounds/:id', deactivateGround);

//admin
router.post('/admin/countries/:countryId/cities/:cityId/grounds/:inchargeId', addGround);

router.get('/admin/countries/:countryId/cities/:cityId/grounds', getAllGrounds);

router.get('/admin/countries/:countryId/cities/:cityId/grounds/:id', getGround);

router.patch('/admin/countries/:countryId/cities/:cityId/grounds/:id', updateGround);

router.delete('/admin/countries/:countryId/cities/:cityId/grounds/:id', deleteGround);


module.exports=router;
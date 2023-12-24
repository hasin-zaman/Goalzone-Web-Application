const express = require('express');
const router = express.Router();
const authentication=require('../middlewares/authentication.js');
const { checkRole, matchUser }=require('../middlewares/authorization.js');
const {signup, login, getProfile, updateMyProfile, deleteMyProfile}=require('../controllers/main/userController');
const {registerTeam, getActiveTeams, getActiveTeam, updateMyTeam, deleteMyTeam, sendRequest, unsendRequest, approveRequest, declineRequest, leaveTeam}=require('../controllers/main/teamController');
const {sendMessage}=require('../controllers/main/contactController');
const {getActiveCountries}=require('../controllers/main/countryController');
const {getActiveCities}=require('../controllers/main/cityController');
const {registerGround, getActiveGrounds, getActiveGround, updateMyGround, deactivateGround}=require('../controllers/main/groundController');
const {postReview, getApprovedReviews, getApprovedReview, updateMyReview, deleteMyReview}=require('../controllers/main/reviewController');
const {getAllDays, getDay}=require('../controllers/main/dayController');
const {createSlot, getAllSlots, getSlot, updateSlot, deleteSlot}=require('../controllers/main/slotController');

//user
router.post('/users/signup', signup);
router.post('/users/login', login);
router.get('/users/:userId', getProfile);
router.patch('/users/:userId', updateMyProfile);
router.delete('/users/:userId', deleteMyProfile);

//team
router.post('/teams/:userId', registerTeam);
router.get('/teams/', getActiveTeams);
router.get('/teams/:id', getActiveTeam);
router.patch('/teams/:id/:userId', updateMyTeam);
router.patch('/teams/:id/send/:userId', sendRequest);
router.patch('/teams/:id/unsend/:userId', unsendRequest);
router.patch('/teams/:id/approve/:requestId/:userId', approveRequest);
router.patch('/teams/:id/decline/:requestId/:userId', declineRequest);
router.patch('/teams/:id/leaveTeam/:userId', leaveTeam);
router.delete('/teams/:id', deleteMyTeam);

//contact
router.post('/contact', sendMessage);

//country
router.get('/countries', getActiveCountries);

//city
router.get('/countries/:countryId/cities', getActiveCities);

//ground
router.post('/countries/:countryId/cities/:cityId/grounds/:userId', registerGround);
router.get('/countries/:countryId/cities/:cityId/grounds', getActiveGrounds);
router.get('/countries/:countryId/cities/:cityId/grounds/:id', getActiveGround);
router.patch('/countries/:countryId/cities/:cityId/grounds/:id', updateMyGround);
router.patch('/countries/:countryId/cities/:cityId/grounds/:id', deactivateGround);

//review
router.post('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:userId', postReview);
router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews', getApprovedReviews);
router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:id', getApprovedReview);
router.patch('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:id', updateMyReview);
router.delete('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:id', deleteMyReview);

//day
router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/days', getAllDays);
router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId', getDay);

//slot
router.post('/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:userId', createSlot);
router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots', getAllSlots);
router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:id', getSlot);
router.patch('/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:id', updateSlot);
router.delete('/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:id', deleteSlot);

module.exports=router;
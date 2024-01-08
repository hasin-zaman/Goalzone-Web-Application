const express = require('express');
const router = express.Router();
const {findOneUser, findOneTeam, findOneCountry, findOneCity, findOneGround, findOneDay}=require('../middlewares/findOne.js');
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
router.get('/users/:userId', findOneUser({path: 'teams._id', select: 'teamId teamName profileImage captain'}), getProfile);
router.patch('/users/:userId', findOneUser(), updateMyProfile);
router.delete('/users/:userId', deleteMyProfile);

//team
router.post('/teams/:userId', registerTeam);
router.get('/teams', getActiveTeams);
router.get('/teams/:teamId', findOneTeam([
    { path: "captain", select: "userId firstName lastName profileImage mostPreferredPosition secondPreferredPosition age" },
    { path: "players", select: "userId firstName lastName profileImage mostPreferredPosition secondPreferredPosition age" },
    { path: "requests", select: "userId firstName lastName profileImage mostPreferredPosition secondPreferredPosition age" }
], 'Active'), getActiveTeam);
router.patch('/teams/:teamId/:userId', findOneTeam(), updateMyTeam);
router.patch('/teams/:teamId/send/:userId', findOneTeam(), sendRequest);
router.patch('/teams/:teamId/unsend/:userId', findOneTeam(), unsendRequest);
router.patch('/teams/:teamId/approve/:requestId/:userId', findOneTeam(), approveRequest);
router.patch('/teams/:teamId/decline/:requestId/:userId', findOneTeam(), declineRequest);
router.patch('/teams/:teamId/leaveTeam/:userId', findOneTeam(), leaveTeam);
router.delete('/teams/:teamId', deleteMyTeam);

//contact
router.post('/contact', sendMessage);

//country
router.get('/countries', getActiveCountries);

//city
router.get('/countries/:countryId/cities', findOneCountry('cities'), getActiveCities);

//ground
router.post('/countries/:countryId/cities/:cityId/grounds/:userId', findOneCountry(), findOneCity(), registerGround);
router.get('/countries/:countryId/cities/:cityId/grounds', findOneCountry(), findOneCity({path: 'grounds', populate: {path: 'incharge'}}), getActiveGrounds);
router.get('/countries/:countryId/cities/:cityId/grounds/:groundId', findOneCountry(), findOneCity({path: 'grounds', populate: [{path: 'incharge'}, {path: 'days'}]}), getActiveGround);
router.patch('/countries/:countryId/cities/:cityId/grounds/:groundId', findOneCountry(), findOneCity('grounds'), updateMyGround);
router.patch('/countries/:countryId/cities/:cityId/grounds/deactivate/:groundId', findOneCountry(), findOneCity('grounds'), deactivateGround);

//review
router.post('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:userId', findOneCountry(), findOneCity(), findOneGround('reviews'), postReview);
router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews', findOneCountry(), findOneCity(), findOneGround({
    path: 'reviews',
    populate: {
        path: 'user',
        select: 'userId firstName lastName role profileImage'
    }
}), getApprovedReviews);
router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:reviewId', findOneCountry(), findOneCity(), findOneGround('reviews'), getApprovedReview);
router.patch('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:reviewId', findOneCountry(), findOneCity(), findOneGround('reviews'), updateMyReview);
router.delete('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:reviewId', findOneCountry(), findOneCity(), findOneGround('reviews'), deleteMyReview);

//day
router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/days', findOneCountry(), findOneCity(), findOneGround('days'), getAllDays);
router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId', findOneCountry(), findOneCity(), findOneGround('days'), getDay);

//slot
router.post('/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:userId', findOneCountry(), findOneCity(), findOneGround(), findOneDay('slots'), createSlot);
router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots', findOneCountry(), findOneCity(), findOneGround(), findOneDay('slots'), getAllSlots);
router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:slotId', findOneCountry(), findOneCity(), findOneGround(), findOneDay('slots'), getSlot);
router.patch('/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:slotId', findOneCountry(), findOneCity(), findOneGround(), findOneDay('slots'), updateSlot);
router.delete('/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:slotId', findOneCountry(), findOneCity(), findOneGround(), findOneDay('slots'), deleteSlot);

module.exports=router;
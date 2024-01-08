const express = require('express');
const router = express.Router();
const {findOneUser, findOneTeam, findOneCountry, findOneCity, findOneGround, findOneContact}=require('../middlewares/findOne.js');
const {addUser, getAllUsers, getUser, updateUser, deleteUser}=require('../controllers/admin/userController');
const {addTeam, getAllTeams, getTeam, updateTeam, deleteTeam}=require('../controllers/admin/teamController');
const {getAllMessages, getMessage, updateStatusToRead, updateStatusToResponded, deleteMessage}=require('../controllers/admin/contactController');
const {addCountry, getAllCountries, getCountry, updateCountry, deleteCountry}=require('../controllers/admin/countryController');
const {addCity, getAllCities, getCity, updateCity, deleteCity}=require('../controllers/admin/cityController');
const {addGround, getAllGrounds, getGround, updateGround, deleteGround}=require('../controllers/admin/groundController');
const {getAllReviews, getReview, approveReview, disapproveReview, deleteReview}=require('../controllers/admin/reviewController');

// router.get('/users/:userId', authentication(), checkRole('Player'), matchUser(), getAllCountries);

//user
router.post('/users', addUser);
router.get('/users', getAllUsers);
router.get('/users/:userId', findOneUser({path: 'teams._id', select: 'teamId teamName profileImage captain'}), getUser);
router.patch('/users/:userId', findOneUser('teams._id'), updateUser);
router.delete('/users/:userId', deleteUser);

//team
router.post('/teams/:captainId', addTeam);
router.get('/teams', getAllTeams);
router.get('/teams/:teamId', findOneTeam([
    { path: "captain", select: "userId firstName lastName profileImage mostPreferredPosition secondPreferredPosition age" },
    { path: "players", select: "userId firstName lastName profileImage mostPreferredPosition secondPreferredPosition age" },
    { path: "requests", select: "userId firstName lastName profileImage mostPreferredPosition secondPreferredPosition age" }
]), getTeam);
router.patch('/teams/:teamId', findOneTeam(), updateTeam);
router.delete('/teams/:teamId', deleteTeam);

//contact
router.get('/contact', getAllMessages);
router.get('/contact/:messageId', findOneContact(), getMessage);
router.patch('/contact/:messageId/status/read', updateStatusToRead);
router.patch('/contact/:messageId/status/responded', updateStatusToResponded);
router.delete('/contact/:messageId', deleteMessage);

//country
router.post('/countries', addCountry);
router.get('/countries', getAllCountries);
router.get('/countries/:countryId', findOneCountry('cities'), getCountry);
router.patch('/countries/:countryId', findOneCountry(), updateCountry);
router.delete('/countries/:countryId', deleteCountry);

//city
router.post('/countries/:countryId/cities', findOneCountry(), addCity);
router.get('/countries/:countryId/cities', findOneCountry({path: 'cities', populate: {path: 'grounds', select: 'groundName'}}), getAllCities);
router.get('/countries/:countryId/cities/:cityId', findOneCountry('cities'), getCity);
router.patch('/countries/:countryId/cities/:cityId', findOneCountry('cities'), updateCity);
router.delete('/countries/:countryId/cities/:cityId', findOneCountry('cities'), deleteCity);

//ground
router.post('/countries/:countryId/cities/:cityId/grounds/:inchargeId', findOneCountry(), findOneCity(), addGround);
router.get('/countries/:countryId/cities/:cityId/grounds', findOneCountry(), findOneCity({path: 'grounds', populate: {path: 'incharge'}}), getAllGrounds);
router.get('/countries/:countryId/cities/:cityId/grounds/:groundId', findOneCountry(), findOneCity({path: 'grounds', populate: [{path: 'incharge'}, {path: 'days'}]}), getGround);
router.patch('/countries/:countryId/cities/:cityId/grounds/:groundId', findOneCountry(), findOneCity('grounds'), updateGround);
router.delete('/countries/:countryId/cities/:cityId/grounds/:groundId', findOneCountry(), findOneCity('grounds'), deleteGround);

//review
router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews', findOneCountry(), findOneCity(), findOneGround({
    path: 'reviews',
    populate: {
        path: 'user',
        select: 'userId firstName lastName role profileImage'
    }
}), getAllReviews);
router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:reviewId', findOneCountry(), findOneCity(), findOneGround({
    path: 'reviews',
    populate: {
        path: 'user',
        select: 'userId firstName lastName role profileImage'
    }
}), getReview);
router.patch('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:reviewId/approve', findOneCountry(), findOneCity(), findOneGround('reviews'), approveReview);
router.patch('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:reviewId/disapprove', findOneCountry(), findOneCity(), findOneGround('reviews'), disapproveReview);
router.delete('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:reviewId', findOneCountry(), findOneCity(), findOneGround('reviews'), deleteReview);

module.exports=router;
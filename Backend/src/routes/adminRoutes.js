const express = require('express');
const router = express.Router();
const authentication=require('../middlewares/authentication.js');
const { checkRole, matchUser }=require('../middlewares/authorization.js');
const {addUser, getAllUsers, getUser, updateUser, deleteUser}=require('../controllers/admin/userController');
const {addTeam, getAllTeams, getTeam, updateTeam, deleteTeam}=require('../controllers/admin/teamController');
const {getAllMessages, getMessage, updateStatusToRead, updateStatusToResponded, deleteMessage}=require('../controllers/admin/contactController');
const {addCountry, getAllCountries, getCountry, updateCountry, deleteCountry}=require('../controllers/admin/countryController');
const {addCity, getAllCities, getCity, updateCity, deleteCity}=require('../controllers/admin/cityController');
const {addGround, getAllGrounds, getGround, updateGround, deleteGround}=require('../controllers/admin/groundController');
const {getAllReviews, getReview, approveReview, disapproveReview, deleteReview}=require('../controllers/admin/reviewController');

//user
router.post('/admin/users', addUser);
router.get('/admin/users', getAllUsers);
router.get('/admin/users/:userId', getUser);
router.patch('/admin/users/:userId', updateUser);
router.delete('/admin/users/:userId', deleteUser);

//team
router.post('/admin/teams/:captainId', addTeam);
router.get('/admin/teams', getAllTeams);
router.get('/admin/teams/:id', getTeam);
router.patch('/admin/teams/:id', updateTeam);
router.delete('/admin/teams/:id', deleteTeam);

//contact
router.get('/admin/contact', getAllMessages);
router.get('/admin/contact/:id', getMessage);
router.patch('/admin/contact/:id/status/read', updateStatusToRead);
router.patch('/admin/contact/:id/status/responded', updateStatusToResponded);
router.delete('/admin/contact/:id', deleteMessage);

//country
router.post('/admin/countries', addCountry);
// router.get('/admin/countries/:userId', authentication(), checkRole('Player'), matchUser(), getAllCountries);
router.get('/admin/countries', getAllCountries);
router.get('/admin/countries/:id', getCountry);
router.patch('/admin/countries/:id', updateCountry);
router.delete('/admin/countries/:id', deleteCountry);

//city
router.post('/admin/countries/:countryId/cities', addCity);
router.get('/admin/countries/:countryId/cities', getAllCities);
router.get('/admin/countries/:countryId/cities/:id', getCity);
router.patch('/admin/countries/:countryId/cities/:id', updateCity);
router.delete('/admin/countries/:countryId/cities/:id', deleteCity);

//ground
router.post('/admin/countries/:countryId/cities/:cityId/grounds/:inchargeId', addGround);
router.get('/admin/countries/:countryId/cities/:cityId/grounds', getAllGrounds);
router.get('/admin/countries/:countryId/cities/:cityId/grounds/:id', getGround);
router.patch('/admin/countries/:countryId/cities/:cityId/grounds/:id', updateGround);
router.delete('/admin/countries/:countryId/cities/:cityId/grounds/:id', deleteGround);

//review
router.get('/admin/countries/:countryId/cities/:cityId/grounds/:groundId/reviews', getAllReviews);
router.get('/admin/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:id', getReview);
router.patch('/admin/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:id/approve', approveReview);
router.patch('/admin/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:id/disapprove', disapproveReview);
router.delete('/admin/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:id', deleteReview);

module.exports=router;
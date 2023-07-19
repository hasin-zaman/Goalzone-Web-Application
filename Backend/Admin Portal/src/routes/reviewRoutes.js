const express = require('express');
const router = express.Router();
const { verifyAccessToken }=require('../helpers/authenticationHelpers.js');
const {getAllReviews, getReview, approveReview, disapproveReview, deleteReview}=require('../controllers/reviewController');

router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews', getAllReviews);

router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:id', getReview);

router.patch('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/approve/:id', approveReview);

router.patch('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/disapprove/:id', disapproveReview);

router.delete('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:id', deleteReview);

module.exports=router;
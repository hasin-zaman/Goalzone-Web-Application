const express = require('express');
const router = express.Router();
const { verifyAccessToken }=require('../helpers/authenticationHelpers.js');
const {postReview, getAllReviews, getReview, updateReview, deleteReview}=require('../controllers/reviewController');

router.post('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:userId', postReview);

router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews', getAllReviews);

router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:id', getReview);

router.patch('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:id', verifyAccessToken(), updateReview);

router.delete('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:id', deleteReview);

module.exports=router;
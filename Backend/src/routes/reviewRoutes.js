const express = require('express');
const router = express.Router();
const authentication=require('../middlewares/authentication.js');
const { checkRole, matchUser }=require('../middlewares/authorization.js');
const {postReview, getApprovedReviews, getApprovedReview, updateMyReview, deleteMyReview, getAllReviews, getReview, approveReview, disapproveReview, deleteReview}=require('../controllers/reviewController');

//main
router.post('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:userId', postReview);

router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews', getApprovedReviews);

router.get('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:id', getApprovedReview);

router.patch('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:id', updateMyReview);

router.delete('/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:id', deleteMyReview);

//admin
router.get('/admin/countries/:countryId/cities/:cityId/grounds/:groundId/reviews', getAllReviews);

router.get('/admin/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:id', getReview);

router.patch('/admin/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:id/approve', approveReview);

router.patch('/admin/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:id/disapprove', disapproveReview);

router.delete('/admin/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:id', deleteReview);

module.exports=router;
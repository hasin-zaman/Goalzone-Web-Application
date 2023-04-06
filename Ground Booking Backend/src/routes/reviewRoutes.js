import express from 'express'
const reviewRouter = express.Router();
import { addReview, getReviews, updateReview, deleteReview, deleteAllReviews } from '../controllers/review_controllers.js';
import { verifyToken } from '../helpers/authHelpers.js';

reviewRouter.post('/cities/:cityID/areas/:areaID/grounds/:groundID/reviews', verifyToken, addReview);

reviewRouter.get('/cities/:cityID/areas/:areaID/grounds/:groundID/reviews', verifyToken, getReviews);

reviewRouter.put('/cities/:cityID/areas/:areaID/grounds/:groundID/reviews/:reviewID', verifyToken, updateReview);

reviewRouter.delete('/cities/:cityID/areas/:areaID/grounds/:groundID/reviews/:reviewID', verifyToken, deleteReview);

reviewRouter.delete('/cities/:cityID/areas/:areaID/grounds/:groundID/reviews', verifyToken, deleteAllReviews);

export { reviewRouter }
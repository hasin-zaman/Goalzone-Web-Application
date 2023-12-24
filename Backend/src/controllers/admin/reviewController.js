const Country=require('../../models/countryModel');
const City=require('../../models/cityModel');
const Ground=require('../../models/groundModel');
const Review=require('../../models/reviewModel');
const controllerWrapper = require('../../utils/wrappers/controllerWrapper');

const getAllReviews = controllerWrapper(
    async (req, res) => {
        // checking if country exists
        const country = await Country.findOne({countryId: req.params.countryId});
        if(!country) {
            return res.status(404).json({message: "Country not found."}) // Not Found
        }

        // checking if city exists
        const city = await City.findOne({cityId: req.params.cityId});
        if(!city) {
            return res.status(404).json({message: "City not found."}) // Not Found
        }

        // checking if ground exists
        const ground = await Ground.findOne({groundId: req.params.groundId}).populate({
            path: 'reviews',
            populate: {
                path: 'user',
                select: 'userId firstName lastName role profileImage'
            }
        });
        if(!ground) {
            return res.status(404).json({message: "Ground not found."}) // Not Found
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const reviews = ground.reviews.slice(skip, skip + limit);

        res.status(200).json({page, totalReviews: ground.reviews.length, totalPages: Math.ceil(ground.reviews.length/limit), reviews});
    }, 
    "Unable to get reviews."
)

const getReview = controllerWrapper(
    async (req, res) => {
        // checking if country exists
        const country = await Country.findOne({countryId: req.params.countryId});
        if(!country) {
            return res.status(404).json({message: "Country not found."}) // Not Found
        }

        // checking if city exists
        const city = await City.findOne({cityId: req.params.cityId});
        if(!city) {
            return res.status(404).json({message: "City not found."}) // Not Found
        }

        // checking if ground exists
        const ground = await Ground.findOne({groundId: req.params.groundId}).populate({
            path: 'reviews',
            populate: {
                path: 'user',
                select: 'userId firstName lastName role profileImage'
            }
        });
        if(!ground) {
            return res.status(404).json({message: "Ground not found."}) // Not Found
        }

        const review = ground.reviews.find((review) => review.reviewId == req.params.id);
        if(!review) {
            return res.status(404).json({message: 'Review not found.'});
        }

        res.status(200).json(review);
    }, 
    "Unable to get review."
)

const approveReview = controllerWrapper(
    async (req, res) => {
        if(Object.keys(req.body).length !== 0) {
            return res.status(400).json({message: "Request body is not allowed."});
        }

        // checking if country exists
        const country = await Country.findOne({countryId: req.params.countryId});
        if(!country) {
            return res.status(404).json({message: "Country not found."}) // Not Found
        }

        // checking if city exists
        const city = await City.findOne({cityId: req.params.cityId});
        if(!city) {
            return res.status(404).json({message: "City not found."}) // Not Found
        }

        // checking if ground exists
        const ground = await Ground.findOne({groundId: req.params.groundId}).populate('reviews');
        if(!ground) {
            return res.status(404).json({message: "Ground not found."}) // Not Found
        }

        const review = await Review.findOneAndUpdate({reviewId: req.params.id}, {status: 'Approved'}, {runValidators: true});
        if(!review) {
            return res.status(404).json({message: "Review not found."});
        }

        const updatedReview = await Review.findOne({reviewId: req.params.id});

        res.status(200).json({message: "Review status successfully updated to 'Approved'!", updatedReview});
    }, 
    "Unable to approve review."
)

const disapproveReview = controllerWrapper(
    async (req, res) => {
        if(Object.keys(req.body).length !== 0) {
            return res.status(400).json({message: "Request body is not allowed."});
        }

        // checking if country exists
        const country = await Country.findOne({countryId: req.params.countryId});
        if(!country) {
            return res.status(404).json({message: "Country not found."}) // Not Found
        }

        // checking if city exists
        const city = await City.findOne({cityId: req.params.cityId});
        if(!city) {
            return res.status(404).json({message: "City not found."}) // Not Found
        }

        // checking if ground exists
        const ground = await Ground.findOne({groundId: req.params.groundId}).populate('reviews');
        if(!ground) {
            return res.status(404).json({message: "Ground not found."}) // Not Found
        }

        const review = await Review.findOneAndUpdate({reviewId: req.params.id}, {status: 'Disapproved'}, {runValidators: true});
        if(!review) {
            return res.status(404).json({message: "Review not found."});
        }

        const updatedReview = await Review.findOne({reviewId: req.params.id});

        res.status(200).json({message: "Review status successfully updated to 'Disapproved'!", updatedReview});
    }, 
    "Unable to disapprove review."
)

const deleteReview = controllerWrapper(
    async (req, res) => {
        // checking if country exists
        const country = await Country.findOne({countryId: req.params.countryId});
        if(!country) {
            return res.status(404).json({message: "Country not found."}) // Not Found
        }

        // checking if city exists
        const city = await City.findOne({cityId: req.params.cityId});
        if(!city) {
            return res.status(404).json({message: "City not found."}) // Not Found
        }

        // checking if ground exists
        const ground = await Ground.findOne({groundId: req.params.groundId}).populate('reviews');
        if(!ground) {
            return res.status(404).json({message: "Ground not found."}) // Not Found
        }

        const reviewIndex = ground.reviews.indexOf(ground.reviews.find(review => review.reviewId == req.params.id));
        if(reviewIndex === -1) {
            return res.status(404).json({message: 'Review not found.'});
        }

        ground.reviews.splice(reviewIndex, 1);
        await ground.save();

        const review = await Review.findOneAndDelete({reviewId: req.params.id});

        res.status(200).json({message: 'Review successfully deleted!', review});
    }, 
    "Unable to delete review."
)

module.exports={getAllReviews, getReview, approveReview, disapproveReview, deleteReview};
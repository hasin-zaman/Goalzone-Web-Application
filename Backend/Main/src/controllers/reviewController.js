const Country=require('../models/countryModel');
const City=require('../models/cityModel');
const Ground=require('../models/groundModel');
const Review=require('../models/reviewModel');
const User=require('../models/userModel');

const postReview = async (req, res) => {
    try {
        //checking if country exists
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
            return res.status(404).json({message: "Country not found."})//Not Found
        }

        //checking if city exists
        const city=await City.findOne({cityId: req.params.cityId});
        if(!city){
            return res.status(404).json({message: "City not found."})//Not Found
        }

        //checking if ground exists
        const ground=await Ground.findOne({groundId: req.params.groundId}).populate('reviews');
        if(!ground){
            return res.status(404).json({message: "Ground not found."})//Not Found
        }

        //checking if user exists
        const user=await User.findOne({userId: req.params.userId});
        if(!user){
            return res.status(404).json({message: "User not found."})//Not Found
        }

        //checking if review has already been posted
        if(ground.reviews && ground.reviews.some((review)=>review.user.equals(user._id))){
            return res.status(400).json({message: "Review already posted for this ground. You may edit your already-posted review."});
        }

        //getting id of last review to create new id for new review
        var lastId=0;
        const lastReview=await Review.find().sort({_id:-1}).limit(1);
        if(lastReview[0]!=null){
            const jsonString=JSON.stringify(lastReview[0]);
            const jsonObj=JSON.parse(jsonString);
            lastId=parseInt(jsonObj.reviewId[3]);
        }
        const reviewId=user.firstName[0].toLowerCase()+user.lastName[0].toLowerCase()+"-"+(lastId+1);
    
        const review=await Review.create({
            reviewId: reviewId,
            rating: req.body.rating,
            review: req.body.review,
            user: user._id,
            status: "Pending-approval"
        });

        ground.reviews.push(review._id);
        ground.save();
    
        res.status(200).json({message: "Review's request successfully sent!", review});
    } catch (error) {
        if(error.name==='ValidationError'){
            res.status(403).json({message: Object.values(error.errors).map(val => val.message)})
        }
        else{
            res.status(500).json({message: "Unable to create review."})
        }
    }
}

const getAllReviews = async (req, res) => {
    try { // checking if country exists
        const country = await Country.findOne({countryId: req.params.countryId});
        if (!country) {
            return res.status(404).json({message: "Country not found."}) // Not Found
        }

        // checking if city exists
        const city = await City.findOne({cityId: req.params.cityId});
        if (!city) {
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
        if (!ground) {
            return res.status(404).json({message: "Ground not found."}) // Not Found
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const reviews = ground.reviews.filter(review=>(review.status==='Approved' || review.status==='Pending-approval')).slice(skip, skip + limit);

        const totalReviews=await Review.countDocuments({status: 'Approved'});

        res.status(200).json({page, totalReviews, totalPages: Math.ceil(totalReviews/limit), reviews});
    } catch (error) {
        res.status(500).json({message: 'Unable to get reviews.'});
    }
}

const getReview = async (req, res) => {
    try {
      //checking if country exists
      const country=await Country.findOne({countryId: req.params.countryId});
      if(!country){
          return res.status(404).json({message: "Country not found."})//Not Found
      }

      //checking if city exists
      const city=await City.findOne({cityId: req.params.cityId});
      if(!city){
          return res.status(404).json({message: "City not found."})//Not Found
      }

      //checking if ground exists
      const ground=await Ground.findOne({groundId: req.params.groundId}).populate('reviews');
      if(!ground){
          return res.status(404).json({message: "Ground not found."})//Not Found
      }
  
      const review = ground.reviews.find((review) => review.reviewId == req.params.id && review.status==="Approved");
      if (!review) {
        return res.status(404).json({message: 'Review not found.'});
      }
  
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
}

const updateReview = async (req, res) => {
    try {
        //checking if country exists
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
            return res.status(404).json({message: "Country not found."})//Not Found
        }

        //checking if city exists
        const city=await City.findOne({cityId: req.params.cityId});
        if(!city){
            return res.status(404).json({message: "City not found."})//Not Found
        }

        //checking if ground exists
        const ground=await Ground.findOne({groundId: req.params.groundId}).populate('reviews');
        if(!ground){
            return res.status(404).json({message: "Ground not found."})//Not Found
        }

        const review = ground.reviews.find((review) => review.reviewId == req.params.id && review.status==="Approved");
        if(!review) {
            return res.status(404).json({message: 'Review not found.'});
        }

        // Checking if req.body has start and/or end times
        if((req.body.hasOwnProperty('reviewId') && review.reviewId!=req.body.reviewId) || req.body.hasOwnProperty('user') || req.body.hasOwnProperty('status')){
            return res.status(400).json({message: 'Review id, user, and status are not allowed to be changed.'});
        }

        if((req.body.hasOwnProperty('rating') && req.body.rating==review.rating) && (req.body.hasOwnProperty('review') && req.body.review==review.review)){
            return res.status(400).json({message: 'Identical review. Please edit your review in order to send update request.'});
        }

        review.rating=req.body.rating || review.rating;
        review.review=req.body.review || review.review;
        review.status='Pending-approval';

        const updatedReview=await review.save();

        res.status(200).json({message: "Review updation request successfully sent!", updatedReview});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteReview = async (req, res) => {
    try {
        //checking if country exists
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
            return res.status(404).json({message: "Country not found."})//Not Found
        }

        //checking if city exists
        const city=await City.findOne({cityId: req.params.cityId});
        if(!city){
            return res.status(404).json({message: "City not found."})//Not Found
        }

        //checking if ground exists
        const ground=await Ground.findOne({groundId: req.params.groundId}).populate('reviews');
        if(!ground){
            return res.status(404).json({message: "Ground not found."})//Not Found
        }

        const reviewIndex = ground.reviews.indexOf(ground.reviews.find(review => review.reviewId == req.params.id && review.status==="Approved"));
        if(reviewIndex === -1) {
            return res.status(404).json({message: 'Review not found.'});
        }

        ground.reviews.splice(reviewIndex, 1);
        await ground.save();

        const review=await Review.findOneAndDelete({reviewId: req.params.id});

        res.status(200).json({message: 'Review successfully deleted!', review});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports={
    postReview,
    getAllReviews,
    getReview,
    updateReview,
    deleteReview
};
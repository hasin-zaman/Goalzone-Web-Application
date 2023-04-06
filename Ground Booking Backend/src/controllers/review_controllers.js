import models from '../models/allModels.js'
const { City, Area, Ground, Review } = models;
import { verifyToken } from '../helpers/authHelpers.js';
import mongoose from 'mongoose';

// /cities/:cityID/areas/:areaID/grounds/:groundID/reviews
export async function addReview(req, res, next) {
    try {

        // retrieve user ID from authenticated user session
        const userID = new mongoose.Types.ObjectId(req.user.user._id);

        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID);

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        const areaID = req.params.areaID;

        // check if area ID request parameter is valid
        const area = await Area.findById(areaID);

        if (!area) {
            return res.status(404).json({ message: "Area not found" });
        }

        const groundID = req.params.groundID;

        // check if ground ID request parameter is valid
        const ground = await Ground.findById(groundID);

        if (!ground) {
            return res.status(404).json({ message: "Ground not found" });
        }

        // check if rating is an integer or not
        if (typeof req.body.rating !== 'number') {
            return res.status(400).json({ message: "Invalid rating" });
        }

        else if (!Number.isInteger(req.body.rating)) {
            return res.status(400).json({ message: "Enter a rating between 1 and 5" });
        }

        // create record of review in database
        const newReview = await Review.create({
            comment: req.body.comment,
            rating: req.body.rating,
            userID: userID
        });

        // add new review to the ground's reviews array
        ground.reviews.push(newReview._id);
        ground.save();

        res.status(200).json({ message: `Review added successfully`, newReview });

    } catch (error) {

        if (error instanceof Error && error.errors.rating) {
            return res.status(400).json({ message: "Invalid rating" });
        }

        res.status(500).json({ message: "Something went wrong" });
    }
}

// /cities/:cityID/areas/:areaID/grounds/:groundID/reviews
export async function getReviews(req, res, next) {
    try {

        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID);

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        const areaID = req.params.areaID;

        // check if area ID request parameter is valid
        const area = await Area.findById(areaID);

        if (!area) {
            return res.status(404).json({ message: "Area not found" });
        }

        const groundID = req.params.groundID;

        // check if ground ID request parameter is valid
        const ground = await Ground.findById(groundID).populate('reviews');

        if (!ground) {
            return res.status(404).json({ message: "Ground not found" });
        }

        // store all reviews of ground in variable
        const allReviews = ground.reviews;

        res.status(200).json({ allReviews });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

// /cities/:cityID/areas/:areaID/grounds/:groundID/reviews/:reviewID
export async function updateReview(req, res, next) {
    try {
        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID);

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        const areaID = req.params.areaID;

        // check if area ID request parameter is valid
        const area = await Area.findById(areaID);

        if (!area) {
            return res.status(404).json({ message: "Area not found" });
        }

        const groundID = req.params.groundID;

        // check if ground ID request parameter is valid
        const ground = await Ground.findById(groundID);

        if (!ground) {
            return res.status(404).json({ message: "Ground not found" });
        }

        // check if rating is an integer or not
        if (typeof req.body.rating !== 'number') {
            return res.status(400).json({ message: "Invalid rating" });
        }

        else if (!Number.isInteger(req.body.rating)) {
            return res.status(400).json({ message: "Enter a rating between 1 and 5" });
        }

        // update review
        const review = await Review.findByIdAndUpdate(req.params.reviewID, req.body, { new: true, runValidators: true });

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json({ message: 'Review details updated successfully', review });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// /cities/:cityID/areas/:areaID/grounds/:groundID/reviews/:reviewID
export async function deleteReview(req, res, next) {
    try {

        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID);

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        const areaID = req.params.areaID;

        // check if area ID request parameter is valid
        const area = await Area.findById(areaID);

        if (!area) {
            return res.status(404).json({ message: "Area not found" });
        }

        const groundID = req.params.groundID;

        // check if ground ID request parameter is valid
        const ground = await Ground.findById(groundID);

        if (!ground) {
            return res.status(404).json({ message: "Ground not found" });
        }

        // find index of review to be deleted
        const deletedIndex = ground.reviews.indexOf(req.params.reviewID);

        if (deletedIndex > -1) { // only splice array when item found 
            ground.reviews.splice(deletedIndex); // remove review from ground
            await ground.save();
            return res.status(200).json({ message: 'Review deleted successully', ground });
        } else {
            return res.status(404).json({ message: 'Review not found' });
        }

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

// /cities/:cityID/areas/:areaID/grounds/:groundID/reviews
export async function deleteAllReviews(req, res, next) {
    try {
        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID);

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        const areaID = req.params.areaID;

        // check if area ID request parameter is valid
        const area = await Area.findById(areaID);

        if (!area) {
            return res.status(404).json({ message: "Area not found" });
        }

        const groundID = req.params.groundID;

        // check if ground ID request parameter is valid
        const ground = await Ground.findById(groundID);

        if (!ground) {
            return res.status(404).json({ message: "Ground not found" });
        }

        // remove all reviews from the ground's reviews array
        ground.reviews.splice(0, ground.reviews.length);
        await ground.save();

        res.status(200).json({ message: "Reviews deleted successfully", ground });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
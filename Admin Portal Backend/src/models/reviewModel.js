const mongoose=require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        reviewId: {
            type: Number,
            required: true,
            unique: true
        },
        review: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        userId: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Review=mongoose.model('Review', reviewSchema, 'Reviews');

module.exports=Review;
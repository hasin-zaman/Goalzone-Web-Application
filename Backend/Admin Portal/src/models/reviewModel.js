const mongoose=require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        reviewId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        rating: {
            type: Number,
            required: [true, 'Rating is required'],
            trim: true,
            min: [1, 'Minimum rating of 1 is allowed.'],
            max: [10, 'Maximum rating of 10 is allowed.'],
            validate: {
                validator: function (value) {
                  return Number.isInteger(value);
                },
                message: 'Rating must be an integer number.',
              }
        },
        review: {
            type: String,
            required: [true, 'Review is required'],
            validate: {
                validator: function (value) {
                  const words = value.trim().split(/\s+/); 
                  return words.length <= 50;
                },
                message: 'Review should not exceed 50 words.',
              },
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']
        },
        status: {
            type: String,
            enum: ['Approved', 'Disapproved', 'Pending-approval'],
            required: [true, 'Status is required']
        }
    },
    {
        timestamps: true
    }
);

const Review=mongoose.model('Review', reviewSchema, 'Reviews');

module.exports=Review;
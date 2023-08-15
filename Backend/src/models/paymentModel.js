const mongoose=require('mongoose');

const paymentSchema = mongoose.Schema(
    {
        paymentId: {
            type: Number,
            required: true,
            unique: true
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'confirmed'],
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        ground: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ground'
        },
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        },
        paymentAmount: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Payment=mongoose.model('Payment', paymentSchema, 'Payments');

module.exports=Payment;
const mongoose=require('mongoose');

const bookingSchema = mongoose.Schema(
    {
        bookingId: {
            type: Number,
            required: true,
            unique: true
        },
        bookingStatus: {
            type: String,
            enum: ['pending', 'confirmed'],
            required: true
        },
        bookingDate: {
            type: date,
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
        slots: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Slot'
            }
        ],
        totalAmount: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Booking=mongoose.model('Booking', bookingSchema, 'Bookings');

module.exports=Booking;
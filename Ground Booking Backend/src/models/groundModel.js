const mongoose=require('mongoose');

const groundSchema = mongoose.Schema(
    {
        groundId:{
            type: Number,
            required: true,
            unique: true,
        },
        groundName: {
            type: String,
            required: true,
            min: 4
        },
        address: {
            type: String,
            required: true,
            min: 6
        },
        profileImage: {
            type: String,
            required: true
        },
        images: [
            {
                type: String,
            }
        ],
        information: {
            type: String
        },
        type: {
            type: String
        },
        slots: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Slot'
            }
        ],
        reviews: [
            {
                type: Number,
                required: true
            }
        ],
        inchargeID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

const Ground=mongoose.model('Ground', groundSchema, 'Grounds');

module.exports=Ground;
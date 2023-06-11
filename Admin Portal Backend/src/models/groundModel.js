const mongoose=require('mongoose');

const groundSchema = mongoose.Schema(
    {
        groundId:{
            type: String,
            required: true,
            unique: true,
        },
        groundName: {
            type: String,
            required: true,
            min: 2,
            trim: true
        },
        establishedInYear: {
            type: String,
            required: true,
            length: 4
        },
        type: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        mapLink: {
            type: String,
            trim: true
        },
        mapImage: {
            type: String,
            trim: true
        },
        additionalInfo: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        phoneStatus: {
            type: String,
            enum: ['Public', 'Private'],
            required: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        emailStatus: {
            type: String,
            enum: ['Public', 'Private'],
            required: true
        },
        webUrl: {
            type: String,
            trim: true
        },
        profileImage: {
            type: String,
            trim: true
        },
        coverImage: {
            type: String,
            trim: true
        },
        facebookHandle: {
            type: String,
            trim: true
        },
        instaHandle: {
            type: String,
            trim: true
        },
        // images: [
        //     {
        //         type: String,
        //         trim: true
        //     }
        // ],
        // slots: [
        //     { 
        //         slotId: {
        //             type: Number,
        //             required: true
        //         },
        //         startTime: {
        //             type: String,
        //             required: true
        //         },
        //         endTime: {
        //             type: String,
        //             required: true
        //         },
        //         bookingFee: {
        //             type: Number,
        //             required: true
        //         },
        //         slotStatus: {
        //             type: String,
        //             enum: ['Open', 'Closed', 'Selected'],
        //             required: true
        //         }
        //     }
        // ],
        // reviews: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Review'
        //     }
        // ],
        incharge: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            enum: ['Active', 'Inactive', 'Pending-approval'],
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Ground=mongoose.model('Ground', groundSchema, 'Grounds');

module.exports=Ground;
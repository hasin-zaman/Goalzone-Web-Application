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
            required: true
        },
        rating: {
            type: Number,
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
            min: 10,
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
        images: [
            {
                type: String,
                trim: true
            }
        ],
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review'
            }
        ],
        incharge:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
        days: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Day'
            }
        ],
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

groundSchema.pre('save', function (next) {
    if (this.createdAt && this.updatedAt) {
        const createdAt = new Date(this.createdAt);
        const updatedAt = new Date(this.updatedAt);
        createdAt.setHours(createdAt.getHours() + 5);
        updatedAt.setHours(updatedAt.getHours() + 5); 
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    next();
});

const Ground=mongoose.model('Ground', groundSchema, 'Grounds');

module.exports=Ground;
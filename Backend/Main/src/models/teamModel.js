const mongoose=require('mongoose');

const teamSchema = mongoose.Schema(
    {
        teamId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        teamName: {
            type: String,
            required: true,
            min: 2,
            trim: true
        },
        slogan: {
            type: String,
            trim: true
        },
        establishedInYear: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            unique: true,
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
            unique: true,
            trim: true
        },
        emailStatus: {
            type: String,
            enum: ['Public', 'Private'],
            required: true
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
        captain: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        players: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        requests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        status: {
            type: String,
            enum: ['Active', 'Inactive'],
            required: true
        }
    },
    {
        timestamps: true
    }
);

teamSchema.pre('save', function (next) {
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

const Team=mongoose.model('Team', teamSchema, 'Teams');

module.exports=Team;
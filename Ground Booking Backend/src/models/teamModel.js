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
            required: true,
            min: 1947,
            max: new Date().getFullYear
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            min: 10,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
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

const Team=mongoose.model('Team', teamSchema, 'Teams');

module.exports=Team;
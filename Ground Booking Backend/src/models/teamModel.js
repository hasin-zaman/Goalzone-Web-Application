const mongoose=require('mongoose');

const teamSchema = mongoose.Schema(
    {
        teamId: {
            type: Number,
            required: true,
            unique: true
        },
        teamName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            min: 11,
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            unique: [true, 'This email is already in use']
        },
        profileImage: {
            type: String,
            required: true
        },
        coverImage: {
            type: String
        },
        facebookHandle: {
            type: String
        },
        instaHandle: {
            type: String
        },
        captain: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        players: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        timestamps: true
    }
);

const Team=mongoose.model('Team', teamSchema, 'Teams');

module.exports=Team;
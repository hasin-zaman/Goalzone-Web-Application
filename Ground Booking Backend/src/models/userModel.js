const mongoose=require('mongoose');

const userSchema = mongoose.Schema(
    {
        userId: {
            type: Number,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        age:{
            type: Number,
            trim: true
        },
        gender:{
            type: String,
            enum: ['Male', 'Female'],
            required: true
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
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        profileImage:{
            type: String,
        },
        coverImage:{
            type: String,
        },
        role: {
            type: String,
            enum: ['Player', 'Captain', 'Ground-in-charge', 'Admin'],
            required: true
        },
        mostPreferredPosition: {
            type: String,
            trim: true
        },
        secondPreferredPosition: {
            type: String,
            trim: true
        },
        teams: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Team'
            }
        ],
        grounds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ground'
            }
        ]
    },
    {
        timestamps: true
    }
);

const User=mongoose.model('User', userSchema, 'Users');

module.exports=User;
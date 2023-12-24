const mongoose=require('mongoose');
const emailValidation = require('../utils/validations/emailValidation');
const establishedInYearValidation = require('../utils/validations/establishedInYearValidation');
const facebookHandleValidation = require('../utils/validations/facebookHandleValidation');
const imageValidation = require('../utils/validations/imageValidation');
const instaHandleValidation = require('../utils/validations/instaHandleValidation');
const nameValidation = require('../utils/validations/nameValidation');
const phoneValidation = require('../utils/validations/phoneValidation');

const teamSchema = mongoose.Schema(
    {
        teamId: {
            type: String,
            unique: true,
            required: [true, 'Team id is required.']
        },
        teamName: {
            type: String,
            trim: true,
            maxLength: [30, 'Team name can be max 30 characters.'],
            required: [true, 'Team name is required.'],
            validate: {
                validator: nameValidation,
                message: 'Invalid team name. Special characters not allowed.'
            }
        },
        slogan: {
            type: String,
            trim: true,
            maxLength: [50, 'Slogan can be max 50 characters.']
        },
        establishedInYear: {
            type: Number,
            required: [true, 'Established in year is required.'],
            validate: {
                validator: establishedInYearValidation,
                message: 'Year must be between 1947 and current year.'
            }
        },
        phone: {
            type: String,
            trim: true,
            required: [true, 'Phone is required.'],
            validate: {
                validator: phoneValidation,
                message: 'Invalid phone number.'
            }
        },
        phoneStatus: {
            type: String,
            enum: ['Public', 'Private'],
            required: [true, 'Phone status is required.']
        },
        email: {
            type: String,
            trim: true,
            required: [true, 'Email is required.'],
            validate: {
                validator: emailValidation,
                message: 'Invalid email format.'
            }
        },
        emailStatus: {
            type: String,
            enum: ['Public', 'Private'],
            required: [true, 'Email status is required.']
        },
        profileImage: {
            type: String,
            trim: true,
            validate: {
                validator: imageValidation,
                message: 'Invalid profile image format.'
            }
        },
        coverImage: {
            type: String,
            trim: true,
            validate: {
                validator: imageValidation,
                message: 'Invalid cover image format.'
            }
        },
        facebookHandle: {
            type: String,
            trim: true,
            validate: {
                validator: facebookHandleValidation,
                message: 'Invalid Facebook link.'
            }
        },
        instaHandle: {
            type: String,
            trim: true,
            validate: {
                validator: instaHandleValidation,
                message: 'Invalid Instagram link.'
            }
        },
        captain: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Captain is required.']
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
            required: [true, 'Status is required.']
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
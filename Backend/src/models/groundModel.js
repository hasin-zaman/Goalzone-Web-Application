const mongoose=require('mongoose');
const emailValidation = require('../utils/emailValidation');
const establishedInYearValidation = require('../utils/establishedInYearValidation');
const facebookHandleValidation = require('../utils/facebookHandleValidation');
const imageValidation = require('../utils/imageValidation');
const instaHandleValidation = require('../utils/instaHandleValidation');
const nameValidation = require('../utils/nameValidation');
const phoneValidation = require('../utils/phoneValidation');
const webUrlValidation = require('../utils/webUrlValidation');

const groundSchema = mongoose.Schema(
    {
        groundId:{
            type: String,
            unique: true,
            required: [true, 'Ground id is required.']
        },
        groundName: {
            type: String,
            trim: true,
            maxLength: [50, 'Ground name can be max 50 characters.'],
            required: [true, 'Ground name is required.'],
            validate: {
                validator: nameValidation,
                message: 'Invalid ground name. Special characters not allowed.'
            }
        },
        establishedInYear: {
            type: String,
            required: [true, 'Established in year is required.'],
            validate: {
                validator: establishedInYearValidation,
                message: 'Year must be between 1947 and current year.'
            }
        },
        facility: {
            type: String,
            enum: ['Football Ground', 'Futsal Court'],
            required: [true, 'Facility is required.']
        },
        surfaceType: {
            type: String,
            enum: ['Grass', 'Turf', 'Artificial Grass', 'EPDM', 'Acrylic', 'Clay', 'Wooden', 'Hard Court', 'Sand'],
            required: [true, 'Surface type is required.']
        },
        format: {
            type: String,
            enum: ['3v3', '4v4', '5v5', '6v6', '7v7', '8v8', '9v9', '10v10', '11v11'],
            required: [true, 'Format is required.']
        },
        footballProvided: {
            type: String,
            enum: ['Yes', 'No'],
            required: [true, 'Football provided must be defined.']
        },
        refProvided: {
            type: String,
            enum: ['Yes', 'No'],
            required: [true, 'Ref provided must be defined.']
        },
        address: {
            type: String,
            trim: true,
            maxLength: [100, 'Address can be max 100 characters.'],
            required: [true, 'Address is required.']
        },
        mapLink: {
            type: String,
            trim: true,
            validate: {
                validator: function (link) {
                    const regex = /^https:\/\/www\.google\.com\/maps\/place\/[^\s]+$/;
                    return regex.test(link);
                },
                message: 'Invalid map link.'
            }
        },
        mapImage: {
            type: String,
            trim: true,
            validate: {
                validator: imageValidation,
                message: 'Invalid map image format.'
            }
        },
        additionalInfo: {
            type: String,
            trim: true,
            validate: {
                validator: function (value) {
                  const words = value.trim().split(/\s+/); 
                  return words.length <= 50;
                },
                message: 'Additional info should not exceed 50 words.',
            }
        },
        rating: {
            type: Number,
            min: [1.0, 'Minimum rating can be 0.1'],
            max: [10.0, 'Maximum rating can be 10.0'],
            set: value => parseFloat(value).toFixed(1)
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
            required: true,
            trim: [true, 'Email is required.'],
            validate: {
                validator: emailValidation,
                message: 'Invalid email format.'
            }
        },
        emailStatus: {
            type: String,
            enum: ['Public', 'Private'],
            required: [true, 'Email is required.']
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
        webUrl: {
            type: String,
            trim: true,
            validate: {
                validator: webUrlValidation,
                message: 'Invalid web url.'
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
        images: [
            {
                type: String,
                trim: true,
                validate: {
                    validator: imageValidation,
                    message: 'Invalid image format.'
                }
            }
        ],
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review'
            }
        ],
        incharge: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: [true, 'Incharge is required.']
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
            required: [true, 'Status is required.']
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
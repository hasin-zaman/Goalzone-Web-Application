const mongoose=require('mongoose');
const ageValidation = require('../utils/validations/ageValidation');
const emailValidation = require('../utils/validations/emailValidation');
const imageValidation = require('../utils/validations/imageValidation');
const nameValidation = require('../utils/validations/nameValidation');
const phoneValidation = require('../utils/validations/phoneValidation');
const Positions = require('../utils/enums/positions');

const userSchema = mongoose.Schema(
    {
        userId: {
            type: Number,
            unique: true,
            required: [true, 'User id is required.'],
        },
        firstName: {
            type: String,
            trim: true,
            maxLength: [20, 'First name can be max 20 characters.'],
            required: [true, 'First name is required.'],
            validate: {
                validator: nameValidation,
                message: 'Invalid first name.'
            }
        },
        lastName: {
            type: String,
            trim: true,
            maxLength: [20, 'Last name can be max 20 characters.'],
            required: [true, 'Last name is required.'],
            validate: {
                validator: nameValidation,
                message: 'Invalid last name.'
            }
        },
        age: {
            type: String,
            trim: true,
            validate: {
                validator: ageValidation,
                message: 'Invalid age.'
            }
        },
        gender: {
            type: String,
            enum: ['Male', 'Female'],
            required: [true, 'Gender is required.']
        },
        phone: {
            type: String,
            unique: true,
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
            unique: true,
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
        password: {
            type: String,
            required: [true, 'Password is required.'],
        },
        bio: {
            type: String,
            validate: {
                validator: function (value) {
                  const words = value.trim().split(/\s+/); 
                  return words.length <= 50;
                },
                message: 'Bio should not exceed 50 words.',
            }
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
        role: {
            type: String,
            enum: ['Player', 'Captain', 'Ground-in-charge', 'Admin'],
            required: [true, 'Role is required.']
        },
        mostPreferredPosition: {
            type: String,
            enum: Positions
        },
        secondPreferredPosition: {
            type: String,
            enum: Positions
        },
        teams: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Team'
                },
                joinDate: {
                    type: Date,
                    required: true,
                    min: '1947-08-14',
                    max: new Date(), 
                    validate: {
                        validator: function (value) {
                            return !this.endDate || value <= this.endDate;
                        },
                        message: 'Join date must be before or equal to the end date.'
                    }
                },
                endDate: {
                    type: Date,
                    min: '1947-08-14',
                    max: new Date(), 
                    validate: {
                        validator: function (value) {
                            return !this.joinDate || value >= this.joinDate;
                        },
                        message: 'End date must be after or equal to the join date.'
                    }
                }
            }
        ],
        grounds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ground'
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

userSchema.pre('save', function (next) {
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

const User=mongoose.model('User', userSchema, 'Users');

module.exports=User;
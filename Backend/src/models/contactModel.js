const mongoose=require('mongoose');
const emailValidation = require('../utils/validations/emailValidation');
const nameValidation = require('../utils/validations/nameValidation');

const contactSchema = mongoose.Schema(
    {
        messageId: {
            type: Number,
            unique: true,
            required: [true, 'Message id is required.']
        },
        name: {
            type: String,
            trim: true,
            maxLength: [30, 'Name can be max 30 characters.'],
            required: [true, 'Name is required.'],
            validate: {
                validator: nameValidation,
                message: 'Invalid name.'
            }
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
        message: {
            type: String,
            trim: true,
            required: [true, 'Message is required.'],
        },
        status: {
            type: String,
            enum: ['Unread', 'Read', 'Responded'],
            required: [true, 'Status is required.']
        }
    },
    {
        timestamps: true
    }
);

contactSchema.pre('save', function (next) {
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

const Contact=mongoose.model('Contact', contactSchema, 'ContactMessages');

module.exports=Contact;

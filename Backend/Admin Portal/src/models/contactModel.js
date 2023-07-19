const mongoose=require('mongoose');

const contactSchema = mongoose.Schema(
    {
        messageId: {
            type: Number,
            required: [true, 'Message id is required']
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            trim: true
        },
        status: {
            type: String,
            enum: ['Unread', 'Read', 'Responded'],
            required: [true, 'Status is required']
        }
    },
    {
        timestamps: true
    }
);

const Contact=mongoose.model('Contact', contactSchema, 'ContactMessages');

module.exports=Contact;

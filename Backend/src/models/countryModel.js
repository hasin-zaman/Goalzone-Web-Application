const mongoose=require('mongoose');
const imageValidation = require('../utils/imageValidation');

const countrySchema = mongoose.Schema(
    {
        countryId: {
            type: String,
            unique: true,
            required: [true, 'Country id is required.']
        },
        countryName: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Country name is required.']
        },
        image:{
            type: String,
            trim: true,
            required: [true, 'Image is required.'],
            validate: {
                validator: imageValidation,
                message: 'Invalid image format.'
            }
        },
        cities: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'City'
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

countrySchema.pre('save', function (next) {
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

const Country=mongoose.model('Country', countrySchema, 'Countries');

module.exports=Country;

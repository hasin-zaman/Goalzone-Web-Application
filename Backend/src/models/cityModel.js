const mongoose=require('mongoose');
const cityIdValidation=require('../utils/cityIdValidation');
const imageValidation = require('../utils/imageValidation');

const citySchema = mongoose.Schema(
    {
        cityId: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'City id is required.'],
            validate: {
                validator: cityIdValidation,
                message: 'Invalid city id format.'
            }
        },
        cityName: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'City name is required.']
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

citySchema.pre('save', function (next) {
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

const City=mongoose.model('City', citySchema, 'Cities');

module.exports=City;

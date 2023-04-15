const mongoose=require('mongoose');

const citySchema = mongoose.Schema(
    {
        cityId: {
            type: Number,
            required: true,
            unique: true,
        },
        cityName: {
            type: String,
            required: true,
            unique: true
        },
        areas: [
            { 
                type: String,
                unique: true
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

const City=mongoose.model('City', citySchema, 'Cities');

module.exports=City;

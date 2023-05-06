const mongoose=require('mongoose');

const citySchema = mongoose.Schema(
    {
        cityId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        cityName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        image:{
            type: String,
            required:true,
            trim:true
        },
        areas: [
            { 
                type: String,
                trim: true
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

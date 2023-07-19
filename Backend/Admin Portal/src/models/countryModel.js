const mongoose=require('mongoose');

const countrySchema = mongoose.Schema(
    {
        countryId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        countryName: {
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
        cities: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'City'
            }
        ],
        status: {
            type: String,
            enum: ['Active', 'Inactive'],
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Country=mongoose.model('Country', countrySchema, 'Countries');

module.exports=Country;

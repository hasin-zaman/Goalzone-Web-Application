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

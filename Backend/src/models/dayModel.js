const mongoose=require('mongoose');

const daySchema = mongoose.Schema(
    {
        dayId: {
            type: String,
            unique: true,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: [true, 'Day id is required.']
        },
        slots: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Slot'
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

daySchema.pre('save', function (next) {
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

const Day=mongoose.model('Day', daySchema, 'Days');

module.exports=Day;
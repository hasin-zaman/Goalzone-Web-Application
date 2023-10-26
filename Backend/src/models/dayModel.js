const mongoose=require('mongoose');
const Slot=require('../models/slotModel');

const daySchema = mongoose.Schema(
    {
        dayId: {
            type: String,
            unique: true,
            required: [true, 'Day id is required.']
        },
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: [true, 'Day id is required.']
        },
        date: {
            type: Date,
            required: [true, 'Date is required.'],
            validate: {
              validator: function (value) {
                return value instanceof Date;
              },
              message: 'Invalid date format. Use a valid Date object.',
            },
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

daySchema.pre('findOneAndDelete', async function (next) {

    const day=await Day.findOne({ dayId: this._conditions.dayId }).populate('slots');

    for(let i=0; i<day.slots.length; i++) {
        await Slot.findOneAndDelete({ slotId: day.slots[i].slotId });
    }

});

const Day=mongoose.model('Day', daySchema, 'Days');

module.exports=Day;
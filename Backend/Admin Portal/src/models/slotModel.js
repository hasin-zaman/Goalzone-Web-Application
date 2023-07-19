const mongoose=require('mongoose');

const slotSchema = mongoose.Schema(
    {   
        slotId: {
            type: Number,
            required: true,
            unique: true
        },
        status: {
            type: String,
            enum: ['Available', 'Unavailable', 'Selected'],
            required: true
        },
        rate: {
            type: Number,
            required: true
        },
        startTime: {
            type: String,
            required: true,
            match: /^([01]\d|2[0-3]):[0-5]\d$/, // regular expression for hh:mm format
            validate: {
                validator: function (v) {
                    const endTime = this.endTime;
                    if (endTime && v >= endTime) {
                        return false;
                    }
                    return true;
                },
                message: props => `Start time (${props.value}) must be before end time`
            }
        },
        endTime: {
            type: String,
            required: true,
            match: /^([01]\d|2[0-3]):[0-5]\d$/, // regular expression for hh:mm format
            validate: {
                validator: function (v) {
                    const startTime = this.startTime;
                    if (startTime && v <= startTime) {
                        return false;
                    }
                    return true;
                },
                message: props => `End time (${props.value}) must be after start time`
            }
        }

    },
    {
        timestamps: true
    }
);


const Slot=mongoose.model('Slot', slotSchema, 'Slots');

module.exports=Slot;
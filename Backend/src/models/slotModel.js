const mongoose=require('mongoose');

const slotSchema = mongoose.Schema(
    {   
        slotId: {
            type: Number,
            required: true,
            unique: true
        },
        rate: {
            type: Number,
            required: [true, 'Rate is required'],
            trim: true,
            min: [0, 'Minimum rate can be 0.'],
            max: [20000, 'Maximum rate can be 20000.'],
            validate: {
              validator: function (value) {
                return Number.isInteger(value);
              },
              message: 'Rate must be an integer number.',
            }
        },
        startTime: {
            type: Date,
            required: [true, 'Start time is required.'],
            validate: {
              validator: function (value) {
                return value instanceof Date;
              },
              message: 'Invalid start time format. Use a valid Date object.',
            },
        },
        endTime: {
            type: Date,
            required: [true, 'End time is required.'],
            validate: {
              validator: function (value) {
                return value instanceof Date;
              },
              message: 'Invalid end time format. Use a valid Date object.',
            },
        },         
        status: {
            type: String,
            enum: ['Available', 'Unavailable', 'Selected'],
            required: [true, 'Status is required']
        }
    },
    {
        timestamps: true
    }
);

slotSchema.path('endTime').validate(value => value > this.startTime, 'End time must be greater than start time.')

slotSchema.path('startTime').validate(value => value.getDay() === this.startTime.getDay(), 'Start time must be on chosen date.')

slotSchema.path('startTime').validate(value => (this.endTime - value) >= (30 * 60* 1000) &&  (this.endTime - value) <= (2 * 60 * 60* 1000), 'Start time must be on chosen date.')

slotSchema.pre('save', function (next) {
  if (this.createdAt && this.updatedAt && this.startTime && this.endTime) {
      const createdAt = new Date(this.createdAt);
      const updatedAt = new Date(this.updatedAt);
      const startTime = new Date(this.startTime);
      const endTime = new Date(this.endTime);
      createdAt.setHours(createdAt.getHours() + 5);
      updatedAt.setHours(updatedAt.getHours() + 5); 
      startTime.setHours(startTime.getHours() + 5);
      endTime.setHours(endTime.getHours() + 5); 
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.startTime = startTime;
      this.endTime = endTime;
  }
  next();
});

const Slot=mongoose.model('Slot', slotSchema, 'Slots');

module.exports=Slot;
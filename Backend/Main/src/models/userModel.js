const mongoose=require('mongoose');

const userSchema = mongoose.Schema(
    {
        userId: {
            type: Number,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        age:{
            type: Number,
            trim: true
        },
        gender:{
            type: String,
            enum: ['Male', 'Female'],
            required: true
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            min: 10,
            trim: true
        },
        phoneStatus: {
            type: String,
            enum: ['Public', 'Private'],
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        emailStatus: {
            type: String,
            enum: ['Public', 'Private'],
            required: true
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        bio: {
            type: String
        },
        profileImage:{
            type: String,
        },
        coverImage:{
            type: String,
        },
        role: {
            type: String,
            enum: ['Player', 'Captain', 'Ground-in-charge', 'Admin'],
            required: true
        },
        mostPreferredPosition: {
            type: String,
            trim: true
        },
        secondPreferredPosition: {
            type: String,
            trim: true
        },
        teams: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Team'
                },
                joinDate: {
                    type: Date,
                    min: '2000-01-01',
                    max: new Date()
                },
                endDate: {
                    type: Date,
                    min: '2000-02-01',
                    max: new Date()
                }
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

userSchema.pre('save', function (next) {
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

const User=mongoose.model('User', userSchema, 'Users');

module.exports=User;
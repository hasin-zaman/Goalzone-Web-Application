const express=require('express');
const app=express();
require('dotenv').config();
const cors=require('cors');
const mongoose=require('mongoose');
const UserRoutes=require('./src/routes/userRoutes');
const TeamRoutes=require('./src/routes/teamRoutes');
const CountryRoutes=require('./src/routes/cityRoutes');
const CityRoutes=require('./src/routes/cityRoutes');
const GroundRoutes=require('./src/routes/groundRoutes');
// const SlotRoutes=require('./routes/slotRoutes');
// const {verifyToken}=require('./helpers/authHelpers');

app.use(express.json());

app.use(
    cors({
        origin: process.env.ORIGIN,
        methods: ['GET','POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type','Authorization'],
        credentials: true
    })
)

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_LINK).then(()=>{
    console.log("Connected to Mongodb...")
    const port = process.env.PORT || 3000;
    app.listen(port, ()=>{
        console.log("Node running on assigned port...");
    });
}).catch((error)=>{
    console.log(error);
});

//routes
app.get('/',(req,res)=>{
    res.send('Ground Booking System : Home');
});

app.use('/users', UserRoutes);

app.use('/teams', TeamRoutes);

app.use('/countries', CountryRoutes);

app.use('/', CityRoutes);

app.use('/', GroundRoutes);

// app.use('/', SlotRoutes);

// protected route
// app.get('/user/protected', verifyToken, function (req, res) {

//     jwt.verify(req.token, `${process.env.SECRET_ACCESS_KEY}`, function (err, data) {
//         if (err) {
//             res.status(403);
//         } else {
//             res.json({
//                 message: 'You do not have authorization to access this information',
//                 data: data
//             });
//         }
//     })

//     res.status(200).json({
//         message: 'This is a protected route'
//     });
// })
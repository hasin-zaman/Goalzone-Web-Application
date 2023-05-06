const express=require('express');
const app=express();
require('dotenv').config();
const cors=require('cors');

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ['GET','POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type','Authorization'],
        credentials: true
    })
)

const UserRoutes=require('./src/routes/userRoutes');
const TeamRoutes=require('./src/routes/teamRoutes');
const CityRoutes=require('./src/routes/cityRoutes');
const GroundRoutes=require('./src/routes/groundRoutes');
// const SlotRoutes=require('./routes/slotRoutes');
// const {verifyToken}=require('./helpers/authHelpers');
const mongoose=require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_LINK).then(()=>{
    console.log("Connected to Mongodb...")
    app.listen(3000, ()=>{
        console.log("Node running on port 3000");
    });
}).catch((error)=>{
    console.log(error);
});

app.use(express.json());

//routes
app.get('/',(req,res)=>{
    res.send('Ground Booking System : Home');
});

app.use('/users', UserRoutes);

app.use('/teams', TeamRoutes);

app.use('/cities', CityRoutes);

app.use('/cities/:id/grounds', GroundRoutes);

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
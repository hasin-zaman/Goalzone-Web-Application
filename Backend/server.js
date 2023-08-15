const express=require('express');
const app=express();
require('dotenv').config();
const cors=require('cors');
const helmet=require('helmet');
const mongoose=require('mongoose');
const UserRoutes=require('./src/routes/userRoutes');
const ContactRoutes=require('./src/routes/contactRoutes');
const TeamRoutes=require('./src/routes/teamRoutes');
const CountryRoutes=require('./src/routes/countryRoutes');
const CityRoutes=require('./src/routes/cityRoutes');
const GroundRoutes=require('./src/routes/groundRoutes');
const ReviewRoutes=require('./src/routes/reviewRoutes');
const DayRoutes=require('./src/routes/dayRoutes');
const SlotRoutes=require('./src/routes/slotRoutes');

app.use(express.json());

app.use(
    cors({
        origin: process.env.ORIGIN,
        methods: ['GET','POST','PUT','PATCH','DELETE'],
        allowedHeaders: ['Content-Type','Authorization'],
        credentials: true
    })
);

app.use(helmet());

app.disable('x-powered-by');

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
    res.send('Goalzone : Home');
});

app.get('/health', (req, res) => {
    const data = {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date()
    }
  
    res.status(200).send(data);
});

app.use('/', UserRoutes);

app.use('/', ContactRoutes);

app.use('/', TeamRoutes);

app.use('/', CountryRoutes);

app.use('/', CityRoutes);

app.use('/', GroundRoutes);

app.use('/', ReviewRoutes);

app.use('/', DayRoutes);

app.use('/', SlotRoutes);
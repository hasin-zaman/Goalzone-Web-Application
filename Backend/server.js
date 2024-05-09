const express=require('express');
require('dotenv').config();
const cors=require('cors');
const helmet=require('helmet');
const mongoose=require('mongoose');
const MainRoutes=require('./src/routes/mainRoutes');
const AdminRoutes=require('./src/routes/adminRoutes');
const authentication = require('./src/middlewares/authentication');
const authorization = require('./src/middlewares/authorization');
const Methods = require('./src/utils/enums/methods');

const app=express();

app.use(express.json());

app.use(
    cors({
        origin: process.env.ORIGIN,
        methods: [Methods.POST, Methods.GET, Methods.PUT, Methods.PATCH, Methods.DELETE],
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

app.get('/', (req, res)=>{
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

app.use(authentication);

app.use(authorization.checkRole);

// app.use(authorization.matchUser);

app.use('', MainRoutes);

app.use('/admin', AdminRoutes);

app.all('*', (req, res) => {
    res.status(404).send('404 | Route Not Found.')
});
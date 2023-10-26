const Country=require('../models/countryModel');
const City=require('../models/cityModel');
const Ground=require('../models/groundModel');
const Day=require('../models/dayModel');
const User=require('../models/userModel');
const getDayOfWeek=require('../utils/getDayOfWeek');

//main
const registerGround = async (req, res) => {
    try {
        //checking if country exists
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
            return res.status(404).json({message: "Country not found."})//Not Found
        }

        //checking if city exists
        const city=await City.findOne({cityId: req.params.cityId});
        if(!city){
            return res.status(404).json({message: "City not found."})//Not Found
        }

        //checking if user exists
        const user=await User.findOne({userId: req.params.userId});
        if(!user) {
            return res.status(404).json({message: "User not found."})//Not Found
        }

        var lastId=0;
        const lastGround=await Ground.find().sort({_id:-1}).limit(1);
        if(lastGround[0]!=null){
            const jsonString=JSON.stringify(lastGround[0]);
            const jsonObj=JSON.parse(jsonString);
            lastId=parseInt(jsonObj.groundId[3]);
        }
        const id=req.body.groundName[0].toLowerCase()+req.body.groundName[1].toLowerCase()+"-"+(lastId+1);

        const ground=await Ground.create({
            groundId: id,
            groundName: req.body.groundName,
            establishedInYear: req.body.establishedInYear,
            facility: req.body.facility,
            surfaceType: req.body.surfaceType,
            format: req.body.format,
            footballProvided: req.body.footballProvided,
            refProvided: req.body.refProvided,
            type: req.body.type,
            address: req.body.address,
            mapLink: req.body.mapLink,
            mapImage: req.body.mapImage,
            additionalInfo: req.body.additionalInfo,
            phone: user.phone,
            phoneStatus: req.body.phoneStatus || "Public",
            emailStatus: req.body.emailStatus || "Public",
            email: user.email,
            profileImage: req.body.profileImage,
            coverImage: req.body.coverImage,
            webUrl: req.body.webUrl,
            facebookHandle: req.body.facebookHandle,
            instaHandle: req.body.instaHandle,
            incharge: user._id,
            status: req.body.status || "Pending-approval",
            bookingDays: req.body.bookingDays || 14
        });

        city.grounds.push(ground._id);
        city.save();

        const currentDate=new Date();
        currentDate.setHours(0, 0, 0, 0);
        currentDate.setHours(currentDate.getHours()+5);

        let day=getDayOfWeek(currentDate.getDay());

        lastId=0;
        let lastDay=await Day.find().sort({_id:-1}).limit(1);
        if(lastDay[0]!=null){
            const jsonString=JSON.stringify(lastDay[0]);
            const jsonObj=JSON.parse(jsonString);
            if(jsonObj.dayId.length()==6) {
                lastId=parseInt(jsonObj.dayId[4]+jsonObj.dayId[5]);
            }
            else {
                lastId=parseInt(jsonObj.dayId[4]);
            }
        }
        let dayId=day[0].toLowerCase()+day[1]+day[2]+"-"+(lastId+1);

        const currentDay = await Day.create({
            dayId: dayId,
            day: day,
            date: currentDate,
            status: 'Inactive'
        });

        ground.days.push(currentDay._id);

        for(let i=1; i<=ground.bookingDays; i++) {
            const newDate = new Date(currentDate);
            newDate.setDate(newDate.getDate() + i);
            const newDay=getDayOfWeek(newDate.getDay());
            
            let lastId=0;
            let lastDay=await Day.find().sort({_id:-1}).limit(1);
            if(lastDay[0]!=null) {
                const jsonString=JSON.stringify(lastDay[0]);
                const jsonObj=JSON.parse(jsonString);
                if(jsonObj.dayId.length()==6) {
                    lastId=parseInt(jsonObj.dayId[4]+jsonObj.dayId[5]);
                }
                else {
                    lastId=parseInt(jsonObj.dayId[4]);
                }
            }
            const dayId=newDay[0].toLowerCase()+newDay[1]+newDay[2]+"-"+(lastId+1);
            
            const day=await Day.create({
                dayId: dayId,
                day: newDay,
                date: newDate,
                status: 'Inactive'
            });
            ground.days.push(day._id);
        }

        ground.save();
    
        res.status(200).json({message: "Ground registration request successfully sent!", ground});
    } catch (error) {
        if(error.name==='ValidationError'){
            return res.status(400).json({message: Object.values(error.errors)[0].message});
        }

        res.status(500).json({message: "Unable to send request."})
    }
}

const getActiveGrounds = async (req, res) => {
    try {
        //checking if country exists
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
            return res.status(404).json({message: "Country not found."})//Not Found
        }

        //checking if city exists
        const city=await City.findOne({cityId: req.params.cityId}).populate({path: 'grounds', populate: {path: 'incharge'}});
        if(!city){
            return res.status(404).json({message: "City not found."})//Not Found
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const grounds = city.grounds.filter((ground)=>ground.status==='Active').slice(skip, skip + limit);

        const totalGrounds=await Ground.countDocuments({status: 'Active'});
    
        res.status(200).json({page, totalGrounds, totalPages: Math.ceil(totalGrounds/limit), grounds});
    } catch (error) {
        res.status(500).json({message: 'Unable to get grounds.'});
    }
}

const getActiveGround = async (req, res, next) => {
    try {
      //checking if country exists
      const country=await Country.findOne({countryId: req.params.countryId});
      if(!country){
          return res.status(404).json({message: "Country not found."})//Not Found
      }

      const city = await City.findOne({ cityId: req.params.cityId }).populate({path: 'grounds', populate: {path: 'days'}});
      if(!city) {
        return res.status(404).json({message: 'City not found.'});
      }
  
      const ground = city.grounds.find(
        (ground) => ground.groundId === req.params.id && ground.status === 'Active'
      );
  
      if(!ground) {
        return res.status(404).json({message: 'Ground not found or not active.'});
      }
  
      res.status(200).json(ground);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
}

const updateMyGround = async (req, res) => {
    try {
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
              return res.status(404).json({message: "Country not found."})//Not Found
        }

        const city=await City.findOne({cityId: req.params.cityId}).populate('grounds');
        if (!city || city.grounds.length == 0) {
            return res.status(404).json({message: 'City not found or no grounds in the city.'});
        }

        let ground = city.grounds.find((ground) => ground.groundId === req.params.id && ground.status === 'Active');
        if (!ground) {
            return res.status(404).json({message: 'Ground not found.'});
        }

        let incharge;
        if (req.body.inchargeId != ground.incharge.userId) {
            incharge = await User.findOne({userId: req.body.inchargeId});
        }

        //disallowing updating groundId which are supposed to stay unique
        if(req.body.hasOwnProperty('groundId') && req.body.groundId!=ground.groundId){
            return res.status(400).json({message: "Changing ground id is not allowed."});
        }

        for (const field in req.body) {
            switch (field) {
                case 'groundName':
                    ground.groundName = req.body.groundName;
                    break;
                case 'establishedInYear':
                    ground.establishedInYear = req.body.establishedInYear;
                    break;
                case 'type':
                    ground.type = req.body.type;
                    break;
                case 'address':
                    ground.address = req.body.address;
                    break;
                case 'mapLink':
                    ground.mapLink = req.body.mapLink;
                    break;
                case 'mapImage':
                    ground.mapImage = req.body.mapImage;
                    break;
                case 'additionalInfo':
                    ground.additionalInfo = req.body.additionalInfo;
                    break;
                case 'webUrl':
                    ground.webUrl = req.body.webUrl;
                    break;
                case 'profileImage':
                    ground.profileImage = req.body.profileImage;
                    break;
                case 'coverImage':
                    ground.coverImage = req.body.coverImage;
                    break;
                case 'facebookHandle':
                    ground.facebookHandle = req.body.facebookHandle;
                    break;
                case 'instaHandle':
                    ground.instaHandle = req.body.instaHandle;
                    break;
                case 'phone':
                    ground.phone = req.body.phone;
                    break;
                case 'phoneStatus':
                    ground.phoneStatus = req.body.phoneStatus;
                    break;
                case 'email':
                    ground.email = req.body.email;
                    break;
                case 'emailStatus':
                    ground.emailStatus = req.body.emailStatus;
                    break;
                case 'incharge':
                    ground.incharge = incharge._id;
                    break;
                case 'status':
                    ground.status = req.body.status;
                    break;
            }
        }

        const updatedGround=await ground.save();

        res.status(200).json({message: "Ground successfully updated!", updatedGround});
    } catch (error) {
        if(error.name==='ValidationError'){
            return res.status(400).json({message: Object.values(error.errors)[0].message});
        }

        res.status(500).json({message: error.message});
    }
};

const deactivateGround = async (req, res) => {
    try {
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
            return res.status(404).json({message: "Country not found."});
        }

        const city = await City.findOne({ cityId: req.params.cityId }).populate('grounds');
        if (!city) {
          return res.status(404).json({message: 'City not found.'});
        }
  
        const ground = city.grounds.find((ground) => ground.groundId === req.params.id && ground.status === 'Active');
        if (!ground) {
          return res.status(404).json({message: 'Ground not found or not active.'});
        }

        ground.status='Inactive';
        ground.save();

        res.status(200).json({message: 'Ground deactivated successfully', ground});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//admin
const addGround = async (req, res) => {
    try { 
        //checking if country exists
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
            return res.status(404).json({message: "Country not found."})//Not Found
        }

        //checking if city exists
        const city=await City.findOne({cityId: req.params.cityId});
        if(!city){
            return res.status(404).json({message: "City not found."})//Not Found
        }

        //checking if incharge exists
        const incharge=await User.findOne({userId: req.params.inchargeId});
        if(!incharge){
            return res.status(404).json({message: "Incharge not found. Enter incharge's id in body."})//Not Found
        }

        const grounds=await Ground.find({}).countDocuments();
        const id=req.body.groundName[0].toLowerCase()+req.body.groundName[1].toLowerCase()+"-"+(grounds+1);

        const ground=await Ground.create({
            groundId: id,
            groundName: req.body.groundName,
            establishedInYear: req.body.establishedInYear,
            facility: req.body.facility,
            surfaceType: req.body.surfaceType,
            format: req.body.format,
            footballProvided: req.body.footballProvided,
            refProvided: req.body.refProvided,
            type: req.body.type,
            address: req.body.address,
            mapLink: req.body.mapLink,
            mapImage: req.body.mapImage,
            additionalInfo: req.body.additionalInfo,
            profileImage: req.body.profileImage,
            coverImage: req.body.coverImage,
            webUrl: req.body.webUrl,
            facebookHandle: req.body.facebookHandle,
            instaHandle: req.body.instaHandle,
            phone: incharge.phone,
            phoneStatus: req.body.phoneStatus || "Public",
            emailStatus: req.body.emailStatus || "Public",
            email: incharge.email,
            incharge: incharge._id,
            status: req.body.status || "Inactive",
            bookingDays: req.body.bookingDays || 14
        });

        city.grounds.push(ground._id);
        city.save();

        const days=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        
        for(i=0; i<7; i++){
            const day=await Day.create({
                dayId: days[i],
                status: "Inactive"
            });
            ground.days.push(day._id);
        }

        ground.save();

        res.status(200).json({message: "Ground successfully added!", ground});
    } catch (error) {
        if(error.name==='ValidationError'){
            return res.status(400).json({message: Object.values(error.errors)[0].message});
        }

        res.status(500).json({message: "Unable to add ground."})
    }
}

const getAllGrounds = async (req, res) => {
    try {
        //checking if country exists
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
            return res.status(404).json({message: "Country not found."})//Not Found
        }

        //checking if city exists
        const city=await City.findOne({cityId: req.params.cityId}).populate({path: 'grounds', populate: {path: 'incharge'}});
        if(!city){
            return res.status(404).json({message: "City not found."})//Not Found
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const grounds = city.grounds.slice(skip, skip + limit);
    
        res.status(200).json({page, totalGrounds: city.grounds.length, totalPages: Math.ceil(city.grounds.length/limit), grounds});
    } catch (error) {
        res.status(500).json({message: 'Unable to get grounds.'});
    }
}

const getGround = async (req, res) => {
    try {
      //checking if country exists
      const country=await Country.findOne({countryId: req.params.countryId});
      if(!country){
          return res.status(404).json({message: "Country not found."})//Not Found
      }

      const city = await City.findOne({ cityId: req.params.cityId }).populate({path: 'grounds', populate: [ {path: 'incharge'}, {path: 'days'} ]});
      if(!city) {
        return res.status(404).json({message: 'City not found.'});
      }
  
      const ground = city.grounds.find(
        (ground) => ground.groundId === req.params.id
      );
  
      if(!ground) {
        return res.status(404).json({message: 'Ground not found.'});
      }
  
      res.status(200).json(ground);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
}

const updateGround = async (req, res) => {
    try {
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
              return res.status(404).json({message: "Country not found."})//Not Found
        }

        const city=await City.findOne({cityId: req.params.cityId}).populate('grounds');
        if (!city || city.grounds.length == 0) {
            return res.status(404).json({message: 'City not found or no grounds in the city.'});
        }

        let ground = city.grounds.find((ground) => ground.groundId === req.params.id);
        if (!ground) {
            return res.status(404).json({message: 'Ground not found.'});
        }

        let incharge;
        if (req.body.inchargeId != ground.incharge.userId) {
            incharge = await User.findOne({userId: req.body.inchargeId});
        }

        for (const field in req.body) {
            switch (field) {
                case 'groundId':
                    ground.groundId = req.body.groundId;
                    break;
                case 'groundName':
                    ground.groundName = req.body.groundName;
                    break;
                case 'establishedInYear':
                    ground.establishedInYear = req.body.establishedInYear;
                    break;
                case 'type':
                    ground.type = req.body.type;
                    break;
                case 'address':
                    ground.address = req.body.address;
                    break;
                case 'mapLink':
                    ground.mapLink = req.body.mapLink;
                    break;
                case 'mapImage':
                    ground.mapImage = req.body.mapImage;
                    break;
                case 'additionalInfo':
                    ground.additionalInfo = req.body.additionalInfo;
                    break;
                case 'webUrl':
                    ground.webUrl = req.body.webUrl;
                    break;
                case 'profileImage':
                    ground.profileImage = req.body.profileImage;
                    break;
                case 'coverImage':
                    ground.coverImage = req.body.coverImage;
                    break;
                case 'facebookHandle':
                    ground.facebookHandle = req.body.facebookHandle;
                    break;
                case 'instaHandle':
                    ground.instaHandle = req.body.instaHandle;
                    break;
                case 'phone':
                    ground.phone = req.body.phone;
                    break;
                case 'phoneStatus':
                    ground.phoneStatus = req.body.phoneStatus;
                    break;
                case 'email':
                    ground.email = req.body.email;
                    break;
                case 'emailStatus':
                    ground.emailStatus = req.body.emailStatus;
                    break;
                case 'incharge':
                    ground.incharge = incharge._id;
                    break;
                case 'status':
                    ground.status = req.body.status;
                    break;
            }
        }

        await ground.save();

        const updatedGround = await Ground.findOne({groundId: req.params.id});

        res.status(200).json({message: "Ground successfully updated!", updatedGround});
    } catch (error) {
        if(error.name==='ValidationError'){
            return res.status(400).json({message: Object.values(error.errors)[0].message});
        }

        res.status(500).json({message: error.message});
    }
};


const deleteGround = async (req, res) => {
    try {
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
              return res.status(404).json({message: "Country not found."})
        }

        const city = await City.findOne({cityId: req.params.cityId}).populate('grounds');
        if (!city) {
            return res.status(404).json({message: 'City not found'});
        }

        const groundIndex = city.grounds.indexOf(city.grounds.find(ground => ground.groundId === req.params.id));
        if (groundIndex === -1) {
            return res.status(404).json({message: 'Ground not found in the city'});
        }

        city.grounds.splice(groundIndex, 1);
        await city.save();

        const ground=await Ground.findOneAndDelete({groundId: req.params.id});

        res.status(200).json({message: 'Ground deleted successfully', ground});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports={
    registerGround,
    getActiveGrounds,
    getActiveGround,
    updateMyGround,
    deactivateGround,
    addGround,
    getAllGrounds,
    getGround,
    updateGround,
    deleteGround
};
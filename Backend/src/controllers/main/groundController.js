const Country=require('../../models/countryModel');
const City=require('../../models/cityModel');
const Ground=require('../../models/groundModel');
const Day=require('../../models/dayModel');
const User=require('../../models/userModel');
const getDayOfWeek=require('../../utils/helpers/getDayOfWeek');
const controllerWrapper = require('../../utils/wrappers/controllerWrapper');

const registerGround = controllerWrapper(
    async (req, res) => {
        const city = req.city;

        const user=await User.findOne({userId: req.params.userId});
        if(!user) {
            return res.status(404).json({message: "User not found."})
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
    }, 
    "Unable to register ground."
)

const getActiveGrounds = controllerWrapper(
    async (req, res) => {
        const city = req.city;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const grounds = city.grounds.filter((ground)=>ground.status==='Active').slice(skip, skip + limit);

        const totalGrounds=await Ground.countDocuments({status: 'Active'});
    
        res.status(200).json({page, totalGrounds, totalPages: Math.ceil(totalGrounds/limit), grounds});
    }, 
    "Unable to get grounds."
)

const getActiveGround = controllerWrapper(
    async (req, res) => {
        const city = req.city;
  
        const ground = city.grounds.find(
            (ground) => ground.groundId === req.params.groundId && ground.status === 'Active'
        );
  
        if(!ground) {
            return res.status(404).json({message: 'Ground not found or not active.'});
        }
  
        res.status(200).json(ground);
    }, 
    "Unable to get ground."
)

const updateMyGround = controllerWrapper(
    async (req, res) => {
        const city = req.city;

        let ground = city.grounds.find((ground) => ground.groundId === req.params.groundId && ground.status === 'Active');
        if(!ground) {
            return res.status(404).json({message: 'Ground not found.'});
        }

        let incharge;
        if(req.body.inchargeId != ground.incharge.userId) {
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
    }, 
    "Unable to update ground."
)

const deactivateGround = controllerWrapper(
    async (req, res) => {
        const city = req.city;
  
        const ground = city.grounds.find((ground) => ground.groundId === req.params.groundId && ground.status === 'Active');
        if(!ground) {
          return res.status(404).json({message: 'Ground not found or not active.'});
        }

        ground.status='Inactive';
        ground.save();

        res.status(200).json({message: 'Ground deactivated successfully', ground});
    }, 
    "Unable to deactivate ground."
)

module.exports={registerGround, getActiveGrounds, getActiveGround, updateMyGround, deactivateGround};
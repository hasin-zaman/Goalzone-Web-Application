const Country=require('../../models/countryModel');
const City=require('../../models/cityModel');
const Ground=require('../../models/groundModel');
const Day=require('../../models/dayModel');
const User=require('../../models/userModel');
const controllerWrapper = require('../../utils/wrappers/controllerWrapper');

const addGround = controllerWrapper(
    async (req, res) => {
        const city = req.city;

        const incharge=await User.findOne({userId: req.params.inchargeId});
        if(!incharge){
            return res.status(404).json({message: "Incharge not found. Enter incharge's id in body."})
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
    }, 
    "Ground could not be added."
)

const getAllGrounds = controllerWrapper(
    async (req, res) => {
        const city = req.city;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const grounds = city.grounds.slice(skip, skip + limit);
    
        res.status(200).json({page, totalGrounds: city.grounds.length, totalPages: Math.ceil(city.grounds.length/limit), grounds});
    }, 
    "Unable to get grounds."
)

const getGround = controllerWrapper(
    async (req, res) => {
        const city = req.city
  
        const ground = city.grounds.find((ground) => ground.groundId === req.params.groundId);
        if(!ground) {
            return res.status(404).json({message: 'Ground not found.'});
        }
  
        res.status(200).json(ground);
    }, 
    "Unable to get ground."
)

const updateGround = controllerWrapper(
    async (req, res) => {
        const city = req.city

        let ground = city.grounds.find((ground) => ground.groundId === req.params.groundId);
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

        const updatedGround = await Ground.findOne({groundId: req.params.groundId});

        res.status(200).json({message: "Ground successfully updated!", updatedGround});
    }, 
    "Unable to update ground."
)

const deleteGround = controllerWrapper(
    async (req, res) => {
        const city = req.city

        const groundIndex = city.grounds.indexOf(city.grounds.find(ground => ground.groundId === req.params.groundId));
        if (groundIndex === -1) {
            return res.status(404).json({message: 'Ground not found in the city'});
        }

        city.grounds.splice(groundIndex, 1);
        await city.save();

        const ground=await Ground.findOneAndDelete({groundId: req.params.groundId});

        res.status(200).json({message: 'Ground deleted successfully', ground});
    }, 
    "Unable to delete ground."
)

module.exports={addGround, getAllGrounds, getGround, updateGround, deleteGround};
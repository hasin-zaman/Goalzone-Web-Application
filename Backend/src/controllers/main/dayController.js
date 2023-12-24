const Country=require('../../models/countryModel');
const City=require('../../models/cityModel');
const Ground=require('../../models/groundModel');
const controllerWrapper = require('../../utils/wrappers/controllerWrapper');

const getAllDays = controllerWrapper(
    async (req, res) => {
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
            return res.status(404).json({message: "Country not found."})
        }

        const city=await City.findOne({cityId: req.params.cityId});
        if(!city){
            return res.status(404).json({message: "City not found."})
        }

        const ground=await Ground.findOne({groundId: req.params.groundId}).populate('days');;
        if(!ground){
            return res.status(404).json({message: "Ground not found."})
        }

        const days = ground.days;
    
        res.status(200).json(days);
    }, 
    "Unable to get days."
)

const getDay = controllerWrapper(
    async (req, res) => {
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
            return res.status(404).json({message: "Country not found."})
        }

        const city=await City.findOne({cityId: req.params.cityId});
        if(!city){
            return res.status(404).json({message: "City not found."})
        }

        const ground=await Ground.findOne({groundId: req.params.groundId}).populate('days');
        if(!ground){
            return res.status(404).json({message: "Ground not found."})
        }
  
        const day = ground.days.find((day) => day.dayId == req.params.dayId);
        if(!day) {
            return res.status(404).json({message: 'Day not found.'});
        }
  
        res.status(200).json(day);
    }, 
    "Unable to get active countries."
)

module.exports={getAllDays, getDay};
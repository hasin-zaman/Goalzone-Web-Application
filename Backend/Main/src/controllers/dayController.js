const Country=require('../models/countryModel');
const City=require('../models/cityModel');
const Ground=require('../models/groundModel');
const Day=require('../models/dayModel');
// const Slot=require('../models/slotModel');
// const User=require('../models/userModel');

const getAllDays = async (req, res) => {
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

        //checking if ground exists
        const ground=await Ground.findOne({groundId: req.params.groundId}).populate('days');;
        if(!ground){
            return res.status(404).json({message: "Ground not found."})//Not Found
        }

        const days = ground.days;
    
        res.status(200).json(days);
    } catch (error) {
        res.status(500).json({message: 'Unable to get days.'});
    }
}

const getSlot = async (req, res, next) => {
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

      //checking if ground exists
      const ground=await Ground.findOne({groundId: req.params.groundId}).populate('slots');
      if(!ground){
          return res.status(404).json({message: "Ground not found."})//Not Found
      }
  
      const slot = ground.slots.find((slot) => slot.slotId == req.params.id);
  
      if (!slot) {
        return res.status(404).json({message: 'Slot not found.'});
      }
  
      res.status(200).json(slot);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
}

module.exports={
    getAllDays,
};
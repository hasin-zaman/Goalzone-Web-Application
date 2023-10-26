const Country=require('../models/countryModel');
const City=require('../models/cityModel');
const Ground=require('../models/groundModel');

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

const getDay = async (req, res, next) => {
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
      const ground=await Ground.findOne({groundId: req.params.groundId}).populate('days');
      if(!ground){
          return res.status(404).json({message: "Ground not found."})//Not Found
      }
  
      const day = ground.days.find((day) => day.dayId == req.params.dayId);
      if(!day) {
        return res.status(404).json({message: 'Day not found.'});
      }
  
      res.status(200).json(day);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
}

module.exports={
    getAllDays,
    getDay
};
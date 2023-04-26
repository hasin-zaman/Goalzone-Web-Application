const City=require('../models/cityModel');
const {validateCityId}=require('../helpers/authenticationHelpers');

const addCity = async (req, res, next) => {
    try {
        //checking if city id is in correct format
        if(!validateCityId(req.body.cityId)){
            return res.status(400).json({message: "City Id is invalid. Only 3 lettered ids are allowed. Example 'khi'."})
        }

        //checking if city id already exists
        const cityIdExists=await City.findOne({cityId: req.body.cityId});
        if(cityIdExists){
            return res.status(400).json({message: "City id already exists."});
        }

        //checking if city name already exists
        const cityNameExists=await City.findOne({cityName: req.body.cityName});
        if(cityNameExists){
            return res.status(400).json({message: "City name already exists."});
        }
    
        const city=await City.create(req.body);
        res.status(200).json({message: "City successfully added!", city});
    } catch (error) {
        res.status(500).json({message: "Unable to add city."})
    }
}

const getAllCities = async (req, res, next) => {
    try {
        //finding all cities
        const cities = await City.find({});
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ message: 'Unable to get cities.'});
    }
}

const getCity = async (req, res, next) => {
    try {
        //finding and checking if user exists
        const city=await City.findOne({cityId: req.params.id});
        if(!city){
            return res.status(404).json({message: "This city does not exist"});
        }

        res.status(200).json(city);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

const updateCity = async (req, res, next) => {
    try {
        //disallowing updating cityId which are supposed to stay unique
        if(req.body.hasOwnProperty('cityId') && req.body.cityId!=req.params.id){
            return res.status(400).json({message: "Changing city id is not allowed."});
        }

        const city = await City.findOneAndUpdate({cityId: req.params.id}, req.body, {runValidators: true});

        if (!city) {
            return res.status(404).json({ message: "This city does not exist."});
        }

        const updatedCity=await City.findOne({cityId: req.params.id});
        res.status(200).json({message: "City successfully updated!", updatedCity});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

const deleteCity = async (req, res, next) => {
    try {
        const city = await City.findOneAndDelete({cityId: req.params.id});
        
        if (!city) {
            return res.status(404).json({ message: "This city does not exist."});
        }

        res.status(200).json({message: "City successfully deleted!", city});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

module.exports={
    addCity,
    getAllCities,
    getCity,
    updateCity,
    deleteCity
};
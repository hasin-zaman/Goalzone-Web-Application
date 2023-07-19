const Country=require('../models/countryModel');
const City=require('../models/cityModel');

const addCity = async (req, res) => {
    try {
        // checking if countryId correct
        const country = await Country.findOne({countryId: req.params.countryId});
        if (!country) {
            return res.status(404).json({message: "Country not found."}) // Not Found
        }

        const city = await City.create({
            cityId: req.body.cityId,
            cityName: req.body.cityName,
            image: req.body.image,
            status: req.body.status || "Active"
        });

        country.cities.push(city._id);
        country.save();

        res.status(200).json({message: "City successfully added!", city});
    } catch (error) {
        res.status(500).json({message: "Unable to add city."})
    }
}

const getAllCities = async (req, res) => {
    try { // checking if countryId correct
        const country = await Country.findOne({countryId: req.params.countryId}).populate({path: 'cities', populate: {path: 'grounds', select: 'groundName'}});
        if (! country) {
            return res.status(404).json({message: "Country not found."}) // Not Found
        }

        const cities = country.cities;
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({message: 'Unable to get cities.'});
    }
}

const getCity = async (req, res) => {
    try {
        const country = await Country.findOne({countryId: req.params.countryId}).populate('cities');
        if (!country) {
            return res.status(404).json({message: 'Country not found.'});
        }

        const city = country.cities.find((city) => city.cityId === req.params.id);

        if (!city) {
            return res.status(404).json({message: 'City not found or not active.'});
        }

        res.status(200).json(city);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateCity = async (req, res) => {
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

const deleteCity = async (req, res) => {
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
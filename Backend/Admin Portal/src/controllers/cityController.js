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

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const cities = country.cities.slice(skip, skip + limit);
        res.status(200).json({page, totalCities: country.cities.length, totalPages: Math.ceil(country.cities.length/limit), cities});
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
            return res.status(404).json({message: 'City not found.'});
        }

        res.status(200).json(city);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateCity = async (req, res) => {
    try {
        const country = await Country.findOne({countryId: req.params.countryId}).populate('cities');
        if (!country) {
            return res.status(404).json({message: 'Country not found.'});
        }

        const city = country.cities.find((city) => city.cityId === req.params.id);
        if (!city) {
            return res.status(404).json({message: 'City not found.'});
        }

        //disallowing updating cityId which are supposed to stay unique
        if(req.body.hasOwnProperty('cityId') && req.body.cityId!=req.params.id){
            return res.status(400).json({message: "Changing city id is not allowed."});
        }

        city.cityName = req.body.cityName || city.cityName;
        city.image = req.body.image || city.image;
        city.status = req.body.status || city.status; 

        await city.save();

        const updatedCity=await City.findOne({cityId: req.params.id});
        res.status(200).json({message: "City successfully updated!", updatedCity});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

const deleteCity = async (req, res) => {
    try {
        const country=await Country.findOne({countryId: req.params.countryId}).populate('cities');
        if(!country){
              return res.status(404).json({message: "Country not found."})
        }

        const cityIndex = country.cities.indexOf(country.cities.find(city => city.cityId === req.params.id));
        if (cityIndex === -1) {
            return res.status(404).json({message: 'City not found in this country.'});
        }

        country.cities.splice(cityIndex, 1);
        await country.save()

        const city=await City.findOneAndDelete({cityId: req.params.id});

        res.status(200).json({message: 'City deleted successfully', city});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports={
    addCity,
    getAllCities,
    getCity,
    updateCity,
    deleteCity
};
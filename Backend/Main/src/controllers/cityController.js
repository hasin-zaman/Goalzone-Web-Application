const Country = require('../models/countryModel');
const City = require('../models/cityModel');

const getAllCities = async (req, res) => {
    try { // checking if countryId correct
        const country = await Country.findOne({countryId: req.params.countryId}).populate('cities');
        if (!country) {
            return res.status(404).json({message: "Country not found."}) // Not Found
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const cities = country.cities.filter((city=>city.status==="Active")).slice(skip, skip + limit);

        const totalCities=await City.countDocuments({status: 'Active'})
        
        res.status(200).json({page, totalCities, totalPages: Math.ceil(totalCities/limit), cities});
    } catch (error) {
        res.status(500).json({message: 'Unable to get cities.'});
    }
}

const getCity = async (req, res, next) => {
    try {
        const country = await Country.findOne({countryId: req.params.countryId}).populate('cities');
        if (!country) {
            return res.status(404).json({message: 'Country not found.'});
        }

        const city = country.cities.find((city) => city.cityId === req.params.id && city.status === 'Active');

        if (!city) {
            return res.status(404).json({message: 'City not found or not active.'});
        }

        res.status(200).json(city);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getAllCities,
    getCity
};

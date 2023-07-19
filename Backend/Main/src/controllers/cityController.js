const Country = require('../models/countryModel');

const getAllCities = async (req, res, next) => {
    try { // checking if countryId correct
        const country = await Country.findOne({countryId: req.params.countryId}).populate('cities');
        if (!country) {
            return res.status(404).json({message: "Country not found."}) // Not Found
        }

        const cities = country.cities.filter((city=>city.status==="Active"));
        res.status(200).json(cities);
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

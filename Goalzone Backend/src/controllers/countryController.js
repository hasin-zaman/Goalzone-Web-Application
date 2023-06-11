const Country=require('../models/countryModel');

const getAllCountries = async (req, res, next) => {
    try {
        //finding all active countries
        const countries = await Country.find({status: "Active"});
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ message: 'Unable to get countries.'});
    }
}

const getCountry = async (req, res) => {
    try {
        //finding and checking if country exists
        const country=await Country.findOne({countryId: req.params.id, status: "Active"});
        if(!country){
            return res.status(404).json({message: "This country does not exist"});
        }

        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

module.exports={
    getAllCountries,
    getCountry
};
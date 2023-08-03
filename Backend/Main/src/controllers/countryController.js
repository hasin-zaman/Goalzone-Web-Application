const Country=require('../models/countryModel');

const getAllCountries = async (req, res) => {
    try {
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 10;

        const skip=(page-1) * limit;

        const countries = await Country.find({status: 'Active'}).sort({createdAt: -1}).skip(skip).limit(limit).populate('cities');

        const totalCountries = await Country.countDocuments({status: 'Active'});
        const totalPages = Math.ceil(totalCountries/limit);

        res.status(200).json({page, totalCountries, totalPages, countries});
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
const Country=require('../models/countryModel');

const addCountry = async (req, res, next) => {
    try {
        //checking if country already exists
        const countryId=await Country.findOne({countryId: req.body.countryId});
        if(countryId){
            return res.status(400).json({message: "Country already exists."});
        }

        //checking if country name already exists
        const countryName=await Country.findOne({countryName: req.body.countryName});
        if(countryName){
            return res.status(400).json({message: "Country already exists."});
        }
    
        const country=await Country.create(req.body);
        res.status(200).json({message: "Country successfully added!", country});
    } catch (error) {
        res.status(500).json({message: "Unable to add country."})
    }
}

const getAllCountries = async (req, res) => {
    try {
        //finding all countries
        const countries = await Country.find({}).populate('cities');
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ message: 'Unable to get countries.'});
    }
}

const getCountry = async (req, res) => {
    try {
        //finding and checking if country exists
        const country=await Country.findOne({countryId: req.params.id});
        if(!country){
            return res.status(404).json({message: "This country does not exist."});
        }

        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({ message: "Unable to get specified country."});
    }
}

const updateCountry = async (req, res, next) => {
    try {
        //disallowing updating cityId which are supposed to stay unique
        if(req.body.hasOwnProperty('countryId') && req.body.countryId!=req.params.id){
            return res.status(400).json({message: "Changing country id is not allowed."});
        }

        const country = await Country.findOneAndUpdate({countryId: req.params.id}, req.body, {runValidators: true});

        if (!country) {
            return res.status(404).json({ message: "This country does not exist."});
        }

        const updatedCountry=await Country.findOne({countryId: req.params.id});
        res.status(200).json({message: "Country successfully updated!", updatedCountry});
    } catch (error) {
        res.status(500).json({ message: "Country could not be updated."});
    }
}

const deleteCountry = async (req, res, next) => {
    try {
        const country = await Country.findOneAndDelete({countryId: req.params.id});
        
        if (!country) {
            return res.status(404).json({ message: "This country does not exist."});
        }

        res.status(200).json({message: "Country successfully deleted!", country});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

module.exports={
    addCountry,
    getAllCountries,
    getCountry,
    updateCountry,
    deleteCountry
};
const Country=require('../models/countryModel');


//main
const getActiveCountries = async (req, res) => {
    try {
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 5;

        const skip=(page-1) * limit;

        const countries = await Country.find({status: 'Active'}).sort({createdAt: -1}).skip(skip).limit(limit);

        const totalCountries = await Country.countDocuments({status: 'Active'});
        const totalPages = Math.ceil(totalCountries/limit);

        res.status(200).json({page, totalCountries, totalPages, countries});
    } catch (error) {
        res.status(500).json({ message: 'Unable to get active countries.'});
    }
}


//admin
const addCountry = async (req, res) => {
    try {
        req.body.countryId=req.body.countryId || (req.body.countryName[0]+req.body.countryName[1]+req.body.countryName[2]).toLowerCase();
        req.body.status=req.body.status || 'Inactive';
        const country=await Country.create(req.body);

        res.status(200).json({message: "Country successfully added!", country});
    } catch (error) {
        if(error.name==='ValidationError'){
            return res.status(400).json({message: Object.values(error.errors)[0].message});
        }
        else if (error.name==='MongoServerError' && error.code===11000) {
            return res.status(409).json({ message: 'Country already exists.' });
        }

        res.status(500).json({message: "Unable to add country."})
    }
}

const getAllCountries = async (req, res) => {
    try {
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 10;

        const skip=(page-1) * limit;

        const countries = await Country.find().sort({createdAt: -1}).skip(skip).limit(limit).populate('cities');

        const totalCountries = await Country.countDocuments();
        const totalPages = Math.ceil(totalCountries/limit);

        res.status(200).json({page, totalCountries, totalPages, countries});
    } catch (error) {
        res.status(500).json({ message: 'Unable to get countries.'});
    }
}

const getCountry = async (req, res) => {
    try {
        //finding and checking if country exists
        const country=await Country.findOne({countryId: req.params.id}).populate('cities');
        if(!country){
            return res.status(404).json({message: "This country does not exist."});
        }

        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({ message: "Unable to get country."});
    }
}

const updateCountry = async (req, res) => {
    try {
        const country=await Country.findOne({countryId: req.params.id});
        if(!country){
            return res.status(404).json({message: "This country does not exist."});
        }

        for (const field in req.body) {
            switch (field) {
                case 'countryId':
                    country.countryId = req.body.countryId;
                    break;
                case 'countryName':
                    country.countryName = req.body.countryName;
                    break;
                case 'image':
                    country.image = req.body.image;
                    break;
                case 'status':
                    country.status = req.body.status;
                    break;
            }
        }

        const updatedCountry=await country.save();
        res.status(200).json({message: "Country successfully updated!", updatedCountry});
    } catch (error) {
        if(error.name==='ValidationError'){
            return res.status(400).json({message: Object.values(error.errors)[0].message});
        }
        else if (error.name==='MongoServerError' && error.code===11000) {
            return res.status(409).json({ message: 'Country already exists.' });
        }

        res.status(500).json({ message: "Country could not be updated."});
    }
}

const deleteCountry = async (req, res, next) => {
    try {
        //finding and checking if country exists
        const country=await Country.findOne({countryId: req.params.id});
        if(!country){
            return res.status(404).json({message: "This country does not exist."});
        }

        await Country.findOneAndDelete({countryId: req.params.id});

        res.status(200).json({message: "Country successfully deleted!", country});
    } catch (error) {
        res.status(500).json({ message: "Country could not be deleted."});
    }
}

module.exports={
    getActiveCountries,
    addCountry,
    getAllCountries,
    getCountry,
    updateCountry,
    deleteCountry
};
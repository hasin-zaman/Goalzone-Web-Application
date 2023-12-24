const Country=require('../../models/countryModel');
const controllerWrapper = require('../../utils/wrappers/controllerWrapper');

const getActiveCountries = controllerWrapper(
    async (req, res) => {
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 5;

        const skip=(page-1) * limit;

        const countries = await Country.find({status: 'Active'}).sort({createdAt: -1}).skip(skip).limit(limit);

        const totalCountries = await Country.countDocuments({status: 'Active'});
        const totalPages = Math.ceil(totalCountries/limit);

        res.status(200).json({page, totalCountries, totalPages, countries});
    }, 
    "Unable to get active countries."
)

module.exports={getActiveCountries};
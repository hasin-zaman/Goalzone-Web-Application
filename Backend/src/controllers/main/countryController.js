const Country=require('../../models/countryModel');
const paginationParams = require('../../utils/helpers/paginationParams');
const controllerWrapper = require('../../utils/wrappers/controllerWrapper');

const getActiveCountries = controllerWrapper(
    async (req, res) => {
        const { page, limit, skip } = paginationParams(req.query);

        const countries = await Country.find({status: 'Active'}).sort({createdAt: -1}).skip(skip).limit(limit);

        const totalCountries = await Country.countDocuments({status: 'Active'});
        const totalPages = Math.ceil(totalCountries/limit);

        res.status(200).json({page, totalCountries, totalPages, countries});
    }, 
    "Unable to get active countries."
)

module.exports={getActiveCountries};
const City = require('../../models/cityModel');
const paginationParams = require('../../utils/helpers/paginationParams');
const controllerWrapper = require('../../utils/wrappers/controllerWrapper');

const getActiveCities = controllerWrapper(
    async (req, res) => {
        const country = req.country
        const { page, limit, skip } = paginationParams(req.query);

        const cities = country.cities.filter((city=>city.status==="Active")).slice(skip, skip + limit);

        const totalCities=await City.countDocuments({status: 'Active'})
        
        res.status(200).json({page, totalCities, totalPages: Math.ceil(totalCities/limit), cities});
    }, 
    "Unable to get active cities."
)

module.exports={getActiveCities};

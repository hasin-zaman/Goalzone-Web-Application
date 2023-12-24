const Country = require('../../models/countryModel');
const City = require('../../models/cityModel');
const controllerWrapper = require('../../utils/wrappers/controllerWrapper');

const getActiveCities = controllerWrapper(
    async (req, res) => {
        const country = await Country.findOne({countryId: req.params.countryId}).populate('cities');
        if (!country) {
            return res.status(404).json({message: "Country not found."}) // Not Found
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const cities = country.cities.filter((city=>city.status==="Active")).slice(skip, skip + limit);

        const totalCities=await City.countDocuments({status: 'Active'})
        
        res.status(200).json({page, totalCities, totalPages: Math.ceil(totalCities/limit), cities});
    }, 
    "Unable to get active cities."
)

module.exports={getActiveCities};

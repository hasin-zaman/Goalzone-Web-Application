const Country = require('../../models/countryModel');
const City = require('../../models/cityModel');
const controllerWrapper = require('../../utils/wrappers/controllerWrapper');

const addCity = controllerWrapper(
    async (req, res) => {
        const country = await Country.findOne({countryId: req.params.countryId});
        if (!country) {
            return res.status(404).json({message: "Country not found."})
        }

        const city = await City.create({
            cityId: req.body.cityId,
            cityName: req.body.cityName,
            image: req.body.image,
            status: req.body.status || "Inactive"
        });

        country.cities.push(city._id);
        country.save();

        res.status(200).json({message: "City successfully added!", city});
    }, 
    "Unable to add city."
)

const getAllCities = controllerWrapper(
    async (req, res) => {
        const country = await Country.findOne({countryId: req.params.countryId}).populate({path: 'cities', populate: {path: 'grounds', select: 'groundName'}});
        if (!country) {
            return res.status(404).json({message: "Country not found."})
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const cities = country.cities.slice(skip, skip + limit);
        res.status(200).json({page, totalCities: country.cities.length, totalPages: Math.ceil(country.cities.length/limit), cities});
    }, 
    "Unable to get cities."
)

const getCity = controllerWrapper(
    async (req, res) => {
        const country = await Country.findOne({countryId: req.params.countryId}).populate('cities');
        if (!country) {
            return res.status(404).json({message: 'Country not found.'});
        }

        const city = country.cities.find((city) => city.cityId === req.params.id);
        if (!city) {
            return res.status(404).json({message: 'City not found.'});
        }

        res.status(200).json(city);
    }, 
    "Unable to get city."
)

const updateCity = controllerWrapper(
    async (req, res) => {
        const country = await Country.findOne({countryId: req.params.countryId}).populate('cities');
        if (!country) {
            return res.status(404).json({message: 'Country not found.'});
        }

        const city = country.cities.find((city) => city.cityId === req.params.id);
        if (!city) {
            return res.status(404).json({message: 'City not found.'});
        }

        for (const field in req.body) {
            switch (field) {
                case 'cityId':
                    city.cityId = req.body.cityId;
                    break;
                case 'cityName':
                    city.cityName = req.body.cityName;
                    break;
                case 'image':
                    city.image = req.body.image;
                    break;
                case 'status':
                    city.status = req.body.status;
                    break;
            }
        }

        const updatedCity=await city.save();
        res.status(200).json({message: "City successfully updated!", updatedCity});
    }, 
    "Unable to update city."
)

const deleteCity = controllerWrapper(
    async (req, res) => {
        const country=await Country.findOne({countryId: req.params.countryId}).populate('cities');
        if(!country){
              return res.status(404).json({message: "Country not found."})
        }

        const cityIndex = country.cities.indexOf(country.cities.find(city => city.cityId === req.params.id));
        if (cityIndex === -1) {
            return res.status(404).json({message: 'City not found in this country.'});
        }

        country.cities.splice(cityIndex, 1);
        await country.save()

        const city=await City.findOneAndDelete({cityId: req.params.id});

        res.status(200).json({message: 'City deleted successfully', city});
    }, 
    "Unable to delete city."
)

module.exports={addCity, getAllCities, getCity, updateCity, deleteCity};

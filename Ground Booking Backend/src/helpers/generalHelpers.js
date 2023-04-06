import models from '../models/userModels.js'
const { City, Area } = models;

export async function cityExists(req, res, next, cityID) {

    // check if city ID request parameter is valid
    const cityExists = await City.findById(cityID);

    if (!cityExists) {
        return res.status(404).json({ message: "City not found" });
    }
}
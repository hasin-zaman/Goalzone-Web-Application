import models from '../models/allModels.js'
const { City, Area } = models;

export async function addArea(req, res, next) {
    try {

        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const cityExists = await City.findById(cityID);

        if (!cityExists) {
            return res.status(404).json({ message: "City not found" });
        }

        // check if area does not exist, add it to the database
        let area = await Area.findOne({ areaName: req.body.areaName });

        if (!area) {
            area = await Area.create(req.body);
        }

        const city = await City.findById(cityID);

        // if city includes area, return error message
        if (city.areas.includes(area._id)) {
            return res.status(400).json({ message: "This area has already been added" });
        }

        city.areas.push(area._id);
        city.save();

        res.status(201).json({ message: 'Area added successfully', area })

    } catch (error) {
        res.status(500).json({ message: 'Unable to add area' })
    }
}

export async function getArea(req, res, next) {
    try {
        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const cityExists = await City.findById(cityID);

        if (!cityExists) {
            return res.status(404).json({ message: "City not found" });
        }
        // populate the "areas" array in the city schema with all the areas documents
        const city = await City.findById(cityID).populate('areas');

        // from the array, find the ID of the area that has been passed in the request parameter
        const area = city.areas.find(a => a._id.equals(req.params.areaID));

        if (!area) {
            return res.status(404).json({ message: 'Area not found' });
        }

        res.status(200).json(area);
    } catch (error) {
        res.status(500).send('Something went wrong');
    }
}

export async function getAllAreas(req, res, next) {
    try {
        const cityID = req.params.cityID;

        // find the city to which the area belongs to 
        const city = await City.findById(cityID).populate('areas');

        // if city not found, return error message
        if (!city) {
            return res.status(404).json({ message: 'City not found' })
        }

        res.status(200).json(city.areas);

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export async function updateArea(req, res, next) {
    try {

        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const cityExists = await City.findById(cityID);

        if (!cityExists) {
            return res.status(404).json({ message: "City not found" });
        }

        const areaID = req.params.areaID;

        // update area details and return updated area
        const area = await Area.findByIdAndUpdate(areaID, req.body, { new: true });

        if (!area) {
            return res.status(404).json({ message: `Cannot find area with ID: ${areaID}` });
        }

        res.status(200).json({ message: `Area updated successfully`, area });

    } catch (error) {
        res.status(500).send('Something went wrong');
    }
}

export async function deleteArea(req, res, next) {
    try {

        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID);

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        // find index of area to be deleted
        const deletedIndex = city.areas.indexOf(req.params.areaID);

        if (deletedIndex > -1) { // only splice array when item found 
            city.areas.splice(deletedIndex); // remove area from city
            await city.save();
        }

        res.status(200).json({ message: 'Area deleted successully', city });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' })
    }
}


import models from '../models/allModels.js'
const { City, Area, Ground } = models;

// /cities/:cityID/areas/:areaID/grounds
export async function addGround(req, res, next) {
    try {
        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID);

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        const areaID = req.params.areaID;

        // check if area ID request parameter is valid
        const area = await Area.findById(areaID);

        if (!area) {
            return res.status(404).json({ message: "Area not found" });
        }

        let ground = await Ground.findOne({ groundName: req.body.groundName });

        // if ground does not exist in database, create it
        if (!ground) {
            ground = await Ground.create(req.body)
        }

        // if area already contains ground, return error message
        if (area.grounds.includes(ground._id)) {
            return res.status(400).json({ message: "Ground already exists in this area" });
        }

        // else push ground ID to area and save
        area.grounds.push(ground._id);
        area.save();

        res.status(201).json({ message: 'Ground created successfully', ground })

    } catch (error) {
        if (error.name === 'ValidationError' && error.errors.groundName) {
            return res.status(400).json({ message: 'Enter ground name' })
        }

        if (error.name === 'ValidationError' && error.errors.address) {
            return res.status(400).json({ message: 'Enter ground address' })
        }

        if (error.name === 'MongooseError' && error.code === 11000) {
            return res.status(400).json({ message: 'This ground already exists in the system' })
        }

        res.status(500).json({ message: "Something went wrong" });
    }
}

// /cities/:cityID/areas/:areaID/grounds
export async function viewGrounds(req, res, next) {
    try {
        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID);

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        const areaID = req.params.areaID;

        // check if area ID request parameter is valid
        const area = await Area.findById(areaID).populate('grounds');

        if (!area) {
            return res.status(404).json({ message: "Area not found" });
        }

        res.status(200).json(area.grounds)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// /cities/:cityID/areas/:areaID/grounds
// view particular ground by name (regex not working properly)
export async function viewGround(req, res, next) {
    try {
        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID);

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        const areaID = req.params.areaID;

        // check if area ID request parameter is valid
        const area = await Area.findById(areaID);

        if (!area) {
            return res.status(404).json({ message: "Area not found" });
        }

        // const ground = await Area.find({ groundName: req.body.groundName });
        const regex = /Madhu/;
        // const regex = new RegExp(groundName, "i"); // "i" flag makes the search case-insensitive

        const ground = await Ground.find({ groundName: { $regex: regex } });

        if (!ground) {
            return res.status(404).json({ message: "Ground not found" });
        }

        res.status(200).json(ground)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// /cities/:cityID/areas/:areaID/grounds/:groundID
export async function updateGround(req, res, next) {
    try {
        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID);

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        const areaID = req.params.areaID;

        // check if area ID request parameter is valid
        const area = await Area.findById(areaID);

        if (!area) {
            return res.status(404).json({ message: "Area not found" });
        }

        const ground = await Ground.findByIdAndUpdate(req.params.groundID, req.body, { new: true });

        if (!ground) {
            return res.status(404).json({ message: "Ground not found" });
        }

        res.status(200).json({ message: 'Ground details updated successfully', ground });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export async function deleteGround(req, res, next) {
    try {
        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID);

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        const areaID = req.params.areaID;

        // check if area ID request parameter is valid
        const area = await Area.findById(areaID);

        if (!area) {
            return res.status(404).json({ message: "Area not found" });
        }

        // find index of area to be deleted
        const deletedIndex = area.grounds.indexOf(req.params.groundID);

        if (deletedIndex > -1) { // only splice array when item found 
            area.grounds.splice(deletedIndex); // remove area from city
            await area.save();
            return res.status(200).json({ message: 'Ground deleted successully', area });
        }

        else {
            return res.status(404).json({ message: 'Ground not found in this area' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}



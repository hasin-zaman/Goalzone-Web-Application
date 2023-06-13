const User = require('../models/userModel');
const Country = require('../models/countryModel');
const City = require('../models/cityModel');
const Ground = require('../models/groundModel');

const addGround = async (req, res) => {
    try { 
        //checking if country exists
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
            return res.status(404).json({message: "Country not found."})//Not Found
        }

        //checking if city exists
        const city=await City.findOne({cityId: req.params.cityId});
        if(!city){
            return res.status(404).json({message: "City not found."})//Not Found
        }

        //checking if user exists
        const user=await User.findOne({userId: req.body.inchargeId});
        if(!user){
            return res.status(404).json({message: "Incharge not found. Enter incharge's id in body."})//Not Found
        }

        //confirming user's role
        if(user.role=="Player" || user.role=="Captain"){
            return res.status(403).json({message: "Invalid role."})//Forbidden
        }

        const grounds=await Ground.find({}).countDocuments();
        const id=req.body.groundName[0].toLowerCase()+req.body.groundName[1].toLowerCase()+"-"+(grounds+1);

        const ground=await Ground.create({
            groundId: id,
            groundName: req.body.groundName,
            establishedInYear: req.body.establishedInYear,
            type: req.body.type,
            address: req.body.address,
            mapLink: req.body.mapLink,
            mapImage: req.body.mapImage,
            additionalInfo: req.body.additionalInfo,
            webUrl: req.body.webUrl,
            profileImage: req.body.profileImage,
            coverImage: req.body.coverImage,
            facebookHandle: req.body.facebookHandle,
            instaHandle: req.body.instaHandle,
            phone: user.phone,
            phoneStatus: req.body.phoneStatus || "Public",
            emailStatus: req.body.emailStatus || "Public",
            email: user.email,
            incharge: user._id,
            status: req.body.status || "Active"
        });

        city.grounds.push(ground._id);
        city.save();

        res.status(200).json({message: "Ground successfully added!", ground});
    } catch (error) {
        res.status(500).json({message: "Unable to add ground."})
    }
}

const getAllGrounds = async (req, res) => {
    try {
        //checking if country exists
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
            return res.status(404).json({message: "Country not found."})//Not Found
        }

        //checking if city exists
        const city=await City.findOne({cityId: req.params.cityId}).populate({path: 'grounds', populate: {path: 'incharge'}});
        if(!city){
            return res.status(404).json({message: "City not found."})//Not Found
        }

        const grounds = city.grounds;
    
        res.status(200).json(grounds);
    } catch (error) {
        res.status(500).json({message: 'Unable to get grounds.'});
    }
}

const getGround = async (req, res) => {
    try {
      //checking if country exists
      const country=await Country.findOne({countryId: req.params.countryId});
      if(!country){
          return res.status(404).json({message: "Country not found."})//Not Found
      }

      const city = await City.findOne({ cityId: req.params.cityId }).populate({path: 'grounds', populate: {path: 'incharge'}});
      if(!city) {
        return res.status(404).json({message: 'City not found.'});
      }
  
      const ground = city.grounds.find(
        (ground) => ground.groundId === req.params.id
      );
  
      if(!ground) {
        return res.status(404).json({message: 'Ground not found.'});
      }
  
      res.status(200).json(ground);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
}

const updateGround = async (req, res) => {
    try {
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
              return res.status(404).json({message: "Country not found."})//Not Found
        }

        const city=await City.findOne({cityId: req.params.cityId}).populate('grounds');
        if (!city || city.grounds.length == 0) {
            return res.status(404).json({message: 'City not found or no grounds in the city.'});
        }

        let ground = city.grounds.find((ground) => ground.groundId === req.params.id);
        if (!ground) {
            return res.status(404).json({message: 'Ground not found.'});
        }

        let incharge;
        if (req.body.inchargeId != ground.incharge.userId) {
            incharge = await User.findOne({userId: req.body.inchargeId});
        }

        ground.groundName = req.body.groundName || ground.groundName;
        ground.establishedInYear = req.body.establishedInYear || ground.establishedInYear;
        ground.type = req.body.type || ground.type;
        ground.address = req.body.address || ground.address;
        ground.mapLink = req.body.mapLink || ground.mapLink;
        ground.mapImage = req.body.mapImage || ground.mapImage;
        ground.additionalInfo = req.body.additionalInfo || ground.additionalInfo;
        ground.webUrl = req.body.webUrl || ground.webUrl;
        ground.profileImage = req.body.profileImage || ground.profileImage;
        ground.coverImage = req.body.coverImage || ground.coverImage;
        ground.facebookHandle = req.body.facebookHandle || ground.facebookHandle;
        ground.instaHandle = req.body.instaHandle || ground.instaHandle;
        ground.phone = req.body.phone || ground.phone;
        ground.phoneStatus = req.body.phoneStatus || "Public";
        ground.email = req.body.email || ground.email;
        ground.emailStatus = req.body.emailStatus || "Public";
        ground.incharge = incharge != null ? incharge._id : ground.incharge;
        ground.status = req.body.status || "Active";

        await ground.save();

        const updatedGround = await Ground.findOne({groundId: req.params.id});

        res.status(200).json({message: "Ground successfully updated!", updatedGround});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


const deleteGround = async (req, res) => {
    try {
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
              return res.status(404).json({message: "Country not found."})
        }

        const city = await City.findOne({cityId: req.params.cityId}).populate('grounds');
        if (!city) {
            return res.status(404).json({message: 'City not found'});
        }

        const groundIndex = city.grounds.indexOf(city.grounds.find(ground => ground.groundId === req.params.id));
        if (groundIndex === -1) {
            return res.status(404).json({message: 'Ground not found in the city'});
        }

        city.grounds.splice(groundIndex, 1);
        await city.save();

        const ground=await Ground.findOneAndDelete({groundId: req.params.id});

        res.status(200).json({message: 'Ground deleted successfully', ground});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


module.exports = {
    addGround,
    getAllGrounds,
    getGround,
    updateGround,
    deleteGround
};

const Country=require('../models/cityModel');
const City=require('../models/cityModel');
const Ground=require('../models/groundModel');
const User=require('../models/userModel');
const { validateEmail }=require('../helpers/authenticationHelpers.js');
const { groundAuthSchema }=require('../helpers/groundAuthSchema');

const registerGround = async (req, res) => {
    try {
        //checking if country exists
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
            return res.status(404).json({message: "Country not found."})//Not Found
        }

        //checking if cityId correct
        const city=await City.findOne({cityId: req.params.cityId});
        if(!city){
            return res.status(404).json({message: "City not found."})//Not Found
        }

        //checking if user exists
        const user=await User.findOne({userId: req.params.userId});
        if(!user){
            return res.status(404).json({message: "User not found."})//Not Found
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
            additionalInfo: req.body.additionalInfo,
            phone: user.phone,
            phoneStatus: "Public",
            emailStatus: "Public",
            email: user.email,
            incharge: user._id,
            status: "Pending-approval"
        });

        city.grounds.push(ground._id);
        city.save();
    
        res.status(200).json({message: "Ground registration request successfully sent!", ground});
    } catch (error) {
        res.status(500).json({message: "Unable to send request."})
    }
}

const getAllGrounds = async (req, res, next) => {
    try {
        //checking if country exists
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
            return res.status(404).json({message: "Country not found."})//Not Found
        }

        //checking if city exists
        const city=await City.findOne({cityId: req.params.cityId}).populate('grounds');
        if(!city){
            return res.status(404).json({message: "City not found."})//Not Found
        }

        const grounds = city.grounds;
    
        res.status(200).json(grounds);
    } catch (error) {
        res.status(500).json({ message: 'Unable to get grounds.'});
    }
}

const getGround = async (req, res, next) => {
    try {
      //checking if country exists
      const country=await Country.findOne({countryId: req.params.countryId});
      if(!country){
          return res.status(404).json({message: "Country not found."})//Not Found
      }

      const city = await City.findOne({ cityId: req.params.cityId }).populate('grounds');
      if (!city) {
        return res.status(404).json({ message: 'City not found.' });
      }
  
      const ground = city.grounds.find(
        (ground) => ground.groundId === req.params.id && ground.status === 'Active'
      );
  
      if (!ground) {
        return res.status(404).json({ message: 'Ground not found or not active.' });
      }
  
      res.status(200).json(ground);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

const updateGround = async (req, res) => {
    try {
      const groundId = req.params.groundId;
      const updatedField = req.body.updatedField;
  
      const ground = await Ground.findOneAndUpdate({ groundId, status: 'Active' });
      if (!ground) {
        return res.status(404).json({ message: 'Ground not found or not active.' });
      }
  
      ground.fieldToBeUpdated = updatedField; 
  
      await ground.save();
  
      res.status(200).json({ message: 'Ground updated successfully.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const deleteGround = async (req, res, next) => {
    try {
        const city = await City.findOneAndDelete({cityId: req.params.id});
        
        if (!city) {
            return res.status(404).json({ message: "This city does not exist."});
        }

        res.status(200).json({message: "City successfully deleted!", city});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

module.exports={
    registerGround,
    getAllGrounds,
    getGround,
    updateGround,
    deleteGround
};
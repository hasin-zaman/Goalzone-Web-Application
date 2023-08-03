const Country=require('../models/countryModel');
const City=require('../models/cityModel');
const Ground=require('../models/groundModel');
const Slot=require('../models/slotModel');
const User=require('../models/userModel');

const createSlot = async (req, res) => {
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

        //checking if ground exists
        const ground=await Ground.findOne({groundId: req.params.groundId}).populate('slots');
        if(!ground){
            return res.status(404).json({message: "Ground not found."})//Not Found
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

        // Validating start and end time
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;

        const isValidTimeFormat = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(startTime) && /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(endTime);
        if (!isValidTimeFormat) {
            return res.status(400).json({ message: 'Invalid time format. Use hh:mm format.' });
        }

        const startTimeObj = new Date(startTime);
        const endTimeObj = new Date(endTime);

        const slots=ground.slots;
        // for(let i=0; i<slots.length; i++){
        //     const existingSlot = slots[i];

        //     const existingStartTimeObj = new Date(`2023-01-01T${existingSlot.startTime}:00Z`);
        //     const existingEndTimeObj = new Date(`2023-01-01T${existingSlot.endTime}:00Z`);

        //     console.log("Start time: " + startTimeObj)
        //     console.log("Existing Start time: " + existingStartTimeObj)
        //     console.log("End time: " + endTimeObj)
        //     console.log("Existing End time: " + existingEndTimeObj)
        //     console.log(startTimeObj==existingStartTimeObj)
        //     console.log(startTimeObj==existingEndTimeObj)

        //     // Check for time conflicts
        //     // if (
        //     //     (startTimeObj >= existingStartTimeObj && startTimeObj < existingEndTimeObj) || // New slot starts within existing slot
        //     //     (endTimeObj > existingStartTimeObj && endTimeObj <= existingEndTimeObj) || // New slot ends within existing slot
        //     //     (startTimeObj <= existingStartTimeObj && endTimeObj >= existingEndTimeObj) // New slot completely encompasses existing slot
        //     // ) {
        //     //     return res.status(400).json({ message: 'Time conflict with existing slots.' });
        //     // }

        //     if (
        //         (startTimeObj == existingStartTimeObj || (startTimeObj>existingStartTimeObj && startTimeObj<existingEndTimeObj)) || 
        //         (endTimeObj > existingStartTimeObj && endTimeObj <= existingEndTimeObj)
        //     ) {
        //         return res.status(400).json({ message: 'Time conflict with existing slots.' });
        //     }
        // }
    
        const slot=await Slot.create({
            slotId: slots.length+1,
            rate: req.body.rate,
            startTime: startTimeObj,
            endTime: endTimeObj,
            status: "Available"
        });

        ground.slots.push(slot._id);
        ground.save();
    
        res.status(200).json({message: "Slot successfully created!", slot});
    } catch (error) {
        if(error.name==='ValidationError'){
            res.status(403).json({message: Object.values(error.errors).map(val => val.message)})
        }
        else{
            res.status(500).json({message: "Unable to create slot."})
        }
    }
}

const getAllSlots = async (req, res, next) => {
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

        //checking if ground exists
        const ground=await Ground.findOne({groundId: req.params.groundId}).populate('slots');;
        if(!ground){
            return res.status(404).json({message: "Ground not found."})//Not Found
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const slots = ground.slots.slice(skip, skip + limit);
    
        res.status(200).json({page, totalSlots: ground.slots.length, totalPages: Math.ceil(ground.slots.length/limit), slots});
    } catch (error) {
        res.status(500).json({message: 'Unable to get slots.'});
    }
}

const getSlot = async (req, res, next) => {
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

      //checking if ground exists
      const ground=await Ground.findOne({groundId: req.params.groundId}).populate('slots');
      if(!ground){
          return res.status(404).json({message: "Ground not found."})//Not Found
      }
  
      const slot = ground.slots.find((slot) => slot.slotId == req.params.id);
  
      if (!slot) {
        return res.status(404).json({message: 'Slot not found.'});
      }
  
      res.status(200).json(slot);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
}

const updateSlot = async (req, res) => {
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

        //checking if ground exists
        const ground=await Ground.findOne({groundId: req.params.groundId}).populate('slots');
        if(!ground){
          return res.status(404).json({message: "Ground not found."})//Not Found
        }

        let slot = ground.slots.find((slot) => slot.slotId == req.params.id);
        if (!slot) {
            return res.status(404).json({message: 'Slot not found.'});
        }

        //Validating booking rate
        if(req.body.hasOwnProperty('rate') && (req.body.rate<0 || req.body.rate>20000)){
            return res.status(400).json({ message: 'Booking rate can be between 0 and 20000.' });
        }

        // Checking if req.body has start and/or end times
        if(req.body.hasOwnProperty('slotId') && slot.slotId!=req.body.slotId){
            return res.status(400).json({message: 'Slot id is not allowed to be changed.'});
        }
        
        // Checking if req.body has start and/or end times
        let startTime=slot.startTime;
        if(req.body.hasOwnProperty('startTime')){
            startTime = req.body.startTime;
        }

        let endTime=slot.endTime;
        if(req.body.hasOwnProperty('endTime')){
            endTime = req.body.endTime;
        }

        const isValidTimeFormat = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(startTime) && /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(endTime);
        if (!isValidTimeFormat) {
            return res.status(400).json({ message: 'Invalid time format. Use hh:mm format.' });
        }

        const startTimeObj = new Date(`1970-01-01T${startTime}:00Z`);
        const endTimeObj = new Date(`1970-01-01T${endTime}:00Z`);

        if (endTimeObj < startTimeObj) {
            endTimeObj.setDate(endTimeObj.getDate() + 1);
        }

        if (startTimeObj >= endTimeObj) {
            return res.status(400).json({ message: 'End time must be after start time.' });
        }

        const timeDifferenceInMinutes = (endTimeObj - startTimeObj) / 60000; // Convert milliseconds to minutes
        if (timeDifferenceInMinutes < 30) {
            return res.status(400).json({ message: 'Minimum allowed gap between start and end time is 30 minutes.' });
        }
        if (timeDifferenceInMinutes > 120) {
            return res.status(400).json({ message: 'Maximum allowed gap between start and end time is 2 hours.' });
        }

        const slots=ground.slots;
        for(let i=0; i<slots.length; i++){
            const existingSlot = slots[i];

            const existingStartTimeObj = new Date(`1970-01-01T${existingSlot.startTime}:00Z`);
            const existingEndTimeObj = new Date(`1970-01-01T${existingSlot.endTime}:00Z`);

            // Check for time conflicts
            if (
                (startTimeObj >= existingStartTimeObj && startTimeObj < existingEndTimeObj) || // New slot starts within existing slot
                (endTimeObj > existingStartTimeObj && endTimeObj <= existingEndTimeObj) || // New slot ends within existing slot
                (startTimeObj <= existingStartTimeObj && endTimeObj >= existingEndTimeObj) // New slot completely encompasses existing slot
            ) {
                return res.status(400).json({ message: 'Time conflict with existing slots.' });
            }
        }

        slot.rate=req.body.rate || slot.rate;
        slot.startTime=startTime;
        slot.endTime=endTime;
        slot.status = req.body.status || "Available";

        const updatedSlot=await slot.save();

        res.status(200).json({message: "Slot successfully updated!", updatedSlot});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteSlot = async (req, res) => {
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

        //checking if ground exists
        const ground=await Ground.findOne({groundId: req.params.groundId}).populate('slots');
        if(!ground){
          return res.status(404).json({message: "Ground not found."})//Not Found
        }

        const slotIndex = ground.slots.indexOf(ground.slots.find(slot => slot.slotId == req.params.id));
        if (slotIndex === -1) {
            return res.status(404).json({message: 'Slot not found in this ground'});
        }

        ground.slots.splice(slotIndex, 1);
        await ground.save();

        const slot=await Slot.findOneAndDelete({slotId: req.params.id});

        res.status(200).json({message: 'Slot successfully deleted!', slot});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports={
    createSlot,
    getAllSlots,
    getSlot,
    updateSlot,
    deleteSlot
};
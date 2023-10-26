const Country=require('../models/countryModel');
const City=require('../models/cityModel');
const Ground=require('../models/groundModel');
const Day=require('../models/dayModel');
const Slot=require('../models/slotModel');
const User=require('../models/userModel');
const { isValidTimeFormat, isValidTimeGap, isSlotClashing }=require('../utils/slotValidation');

//main
const createSlot = async (req, res) => {
    try {
        //checking if country exists
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
            return res.status(404).json({message: "Country not found."});
        }

        //checking if city exists
        const city=await City.findOne({cityId: req.params.cityId});
        if(!city){
            return res.status(404).json({message: "City not found."});
        }

        //checking if ground exists
        const ground=await Ground.findOne({groundId: req.params.groundId});
        if(!ground){
            return res.status(404).json({message: "Ground not found."});
        }

        //checking if day exists
        const day=await Day.findOne({dayId: req.params.dayId}).populate('slots');
        if(!day){
            return res.status(404).json({message: "Day not found."});
        }

        //checking if ground incharge exists
        const incharge=await User.findOne({userId: req.params.userId});
        if(!incharge){
            return res.status(404).json({message: "Ground incharge not found."});
        }

        const currentTime=new Date();
        currentTime.setHours(currentTime.getHours()+5);
        const currentDay=currentTime.getDay();
        const currentDayIndex=currentDay-1;

        const days=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        let dayIndex=-1;
        for(let i=0; i<7; i++){
            if(days[i]===day.dayId){
                dayIndex=i;
                break;
            }
        }

        let daysDifference=dayIndex-currentDayIndex;
        if(daysDifference<0){
            daysDifference+=7;
        }

        if(!isValidTimeFormat(req.body.startTime)){
            return res.status(400).json({message: "Invalid start time."});
        }

        if(!isValidTimeFormat(req.body.endTime)){
            return res.status(400).json({message: "Invalid end time."});
        }

        if(!isValidTimeGap(req.body.startTime, req.body.endTime)){
            return res.status(400).json({message: "Invalid time gap. Must be 30 to 120 minutes."});
        }

        const startTimeObj = new Date();

        startTimeObj.setDate(startTimeObj.getDate()+daysDifference);
        const [startTimeHours, startTimeMinutes]=req.body.startTime.split(':');
        startTimeObj.setHours(0, 0, 0);
        startTimeObj.setHours(startTimeObj.getHours() + 5 + parseInt(startTimeHours), startTimeObj.getMinutes() + parseInt(startTimeMinutes));

        const endTimeObj = new Date();
        endTimeObj.setDate(endTimeObj.getDate()+daysDifference);
        const [endTimeHours, endTimeMinutes]=req.body.endTime.split(':');
        endTimeObj.setHours(0, 0, 0);
        endTimeObj.setHours(endTimeObj.getHours() + 5 + parseInt(endTimeHours), endTimeObj.getMinutes() + parseInt(endTimeMinutes));

        if(endTimeObj < startTimeObj){
            endTimeObj.setDate(endTimeObj.getDate()+1);
        }

        const slots=day.slots;

        if(isSlotClashing(startTimeObj, endTimeObj, slots)){
            return res.status(400).json({message: "The slot is clashing with existing slot."});
        }

        const lastSlot = await Slot.findOne().sort({ _id: -1 }).select('slotId').lean();
        const lastId = lastSlot ? parseInt(lastSlot.slotId[4]) : 0;
        const id=(day.dayId[0]+day.dayId[1]+day.dayId[2]+'-'+(lastId+1)).toLowerCase();
    
        const slot=await Slot.create({
            slotId: id,
            rate: req.body.rate,
            startTime: startTimeObj,
            endTime: endTimeObj,
            status: "Available"
        });

        day.slots.push(slot._id);
        day.save();
    
        res.status(200).json({message: "Slot successfully created!", slot});
    } catch (error) {
        if(error.name==='ValidationError'){
            return res.status(400).json({message: Object.values(error.errors)[0].message});
        }
        else if(error.name==='MongoServerError' && error.code===11000) {
            return res.status(409).json({ message: 'Slot already exists.' });
        }
        
        res.status(500).json({message: "Unable to create slot."})
        
    }
}

const getAllSlots = async (req, res) => {
    try {
        //checking if country exists
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
            return res.status(404).json({message: "Country not found."});
        }

        //checking if city exists
        const city=await City.findOne({cityId: req.params.cityId});
        if(!city){
            return res.status(404).json({message: "City not found."});
        }

        //checking if ground exists
        const ground=await Ground.findOne({groundId: req.params.groundId});
        if(!ground){
            return res.status(404).json({message: "Ground not found."});
        }

        //checking if day exists
        const day=await Day.findOne({dayId: req.params.dayId}).populate('slots');
        if(!day){
            return res.status(404).json({message: "Day not found."})
        }

        const slots = day.slots;

        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({message: 'Unable to get slots.'});
    }
}

const getSlot = async (req, res) => {
    try {
      //checking if country exists
      const country=await Country.findOne({countryId: req.params.countryId});
      if(!country){
          return res.status(404).json({message: "Country not found."});
      }

      //checking if city exists
      const city=await City.findOne({cityId: req.params.cityId});
      if(!city){
          return res.status(404).json({message: "City not found."});
      }

      //checking if ground exists
      const ground=await Ground.findOne({groundId: req.params.groundId});
      if(!ground){
          return res.status(404).json({message: "Ground not found."});
      }

      //checking if day exists
      const day=await Day.findOne({dayId: req.params.dayId}).populate('slots');
      if(!day){
          return res.status(404).json({message: "Day not found."});
      }
  
      const slot = day.slots.find((slot) => slot.slotId == req.params.id);
  
      if(!slot) {
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
        if(error.name==='ValidationError'){
            return res.status(400).json({message: Object.values(error.errors)[0].message});
        }
        else if (error.name==='MongoServerError' && error.code===11000) {
            return res.status(409).json({ message: 'Slot already exists.' });
        }

        res.status(500).json({message: error.message});
    }
};

const deleteSlot = async (req, res) => {
    try {
        //checking if country exists
        const country=await Country.findOne({countryId: req.params.countryId});
        if(!country){
          return res.status(404).json({message: "Country not found."});
        }

        //checking if city exists
        const city=await City.findOne({cityId: req.params.cityId});
        if(!city){
          return res.status(404).json({message: "City not found."});
        }

        //checking if ground exists
        const ground=await Ground.findOne({groundId: req.params.groundId});
        if(!ground){
          return res.status(404).json({message: "Ground not found."});
        }

        //checking if day exists
        const day=await Day.findOne({dayId: req.params.dayId}).populate('slots');
        if(!day){
            return res.status(404).json({message: "Day not found."});
        }

        const slotIndex = day.slots.indexOf(day.slots.find(slot => slot.slotId == req.params.id));
        if(slotIndex===-1) {
            return res.status(404).json({message: 'Slot not found in this ground'});
        }

        day.slots.splice(slotIndex, 1);
        await day.save();

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
const Country=require('../../models/countryModel');
const City=require('../../models/cityModel');
const Ground=require('../../models/groundModel');
const Day=require('../../models/dayModel');
const Slot=require('../../models/slotModel');
const User=require('../../models/userModel');
const { isValidTimeFormat, isValidTimeGap, isSlotClashing }=require('../../utils/validations/slotValidation');
const controllerWrapper = require('../../utils/wrappers/controllerWrapper');

const createSlot = controllerWrapper(
    async (req, res) => {
        const day = req.day;

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
    }, 
    "Unable to create slot."
)

const getAllSlots = controllerWrapper(
    async (req, res) => {
        const day = req.day;

        const slots = day.slots;

        res.status(200).json(slots);
    }, 
    "Unable to get slots."
)

const getSlot = controllerWrapper(
    async (req, res) => {
        const day = req.day;
  
        const slot = day.slots.find((slot) => slot.slotId == req.params.slotId);
  
        if(!slot) {
            return res.status(404).json({message: 'Slot not found.'});
        }
  
        res.status(200).json(slot);
    }, 
    "Unable to get slot."
)

const updateSlot = controllerWrapper(
    async (req, res) => {
        const day = req.day;

        let slot = day.slots.find((slot) => slot.slotId == req.params.slotId);
        if(!slot) {
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
        if(!isValidTimeFormat) {
            return res.status(400).json({ message: 'Invalid time format. Use hh:mm format.' });
        }

        const startTimeObj = new Date(`1970-01-01T${startTime}:00Z`);
        const endTimeObj = new Date(`1970-01-01T${endTime}:00Z`);

        if(endTimeObj < startTimeObj) {
            endTimeObj.setDate(endTimeObj.getDate() + 1);
        }

        if(startTimeObj >= endTimeObj) {
            return res.status(400).json({ message: 'End time must be after start time.' });
        }

        const timeDifferenceInMinutes = (endTimeObj - startTimeObj) / 60000; // Convert milliseconds to minutes
        if(timeDifferenceInMinutes < 30) {
            return res.status(400).json({ message: 'Minimum allowed gap between start and end time is 30 minutes.' });
        }
        if(timeDifferenceInMinutes > 120) {
            return res.status(400).json({ message: 'Maximum allowed gap between start and end time is 2 hours.' });
        }

        const slots=day.slots;
        for(let i=0; i<slots.length; i++){
            const existingSlot = slots[i];

            const existingStartTimeObj = new Date(`1970-01-01T${existingSlot.startTime}:00Z`);
            const existingEndTimeObj = new Date(`1970-01-01T${existingSlot.endTime}:00Z`);

            // Check for time conflicts
            if(
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
    }, 
    "Unable to update slot."
)

const deleteSlot = controllerWrapper(
    async (req, res) => {
        const day = req.day;

        const slotIndex = day.slots.indexOf(day.slots.find(slot => slot.slotId == req.params.slotId));
        if(slotIndex===-1) {
            return res.status(404).json({message: 'Slot not found in this ground'});
        }

        day.slots.splice(slotIndex, 1);
        await day.save();

        const slot=await Slot.findOneAndDelete({slotId: req.params.slotId});

        res.status(200).json({message: 'Slot successfully deleted!', slot});
    }, 
    "Unable to delete slot."
)

module.exports={createSlot, getAllSlots, getSlot, updateSlot, deleteSlot};
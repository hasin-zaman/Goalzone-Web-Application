import express from 'express'
const slotRouter = express.Router();
import { addSlot, getSlots, updateSlot, deleteSlot } from "../controllers/slot_controllers.js"

// CREATE new slot in a particular ground
slotRouter.post('/cities/:cityID/areas/:areaID/grounds/:groundID/slots', addSlot);

// GET all slots of a particular ground
slotRouter.get('/cities/:cityID/areas/:areaID/grounds/:groundID/slots', getSlots)

// UPDATE a particular slot of a particular ground
slotRouter.put('/cities/:cityID/areas/:areaID/grounds/:groundID/slots/:slotID', updateSlot);

// DELETE a particular slot of a particular ground
slotRouter.delete('/cities/:cityID/areas/:areaID/grounds/:groundID/slots/:slotID', deleteSlot);

export { slotRouter }
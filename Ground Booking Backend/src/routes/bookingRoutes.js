import express from 'express'
const bookingRouter = express.Router();
import { createBooking } from "../controllers/booking_controllers.js"

// CREATE new booking in a particular ground
bookingRouter.post('/cities/:cityID/areas/:areaID/grounds/:groundID/bookings', createBooking);

// // GET all slots of a particular ground
// slotRouter.get('/cities/:cityID/areas/:areaID/grounds/:groundID/slots', getSlots)

// // UPDATE a particular slot of a particular ground
// slotRouter.put('/cities/:cityID/areas/:areaID/grounds/:groundID/slots/:slotID', updateSlot);

// // DELETE a particular slot of a particular ground
// slotRouter.delete('/cities/:cityID/areas/:areaID/grounds/:groundID/slots/:slotID', deleteSlot);

export { bookingRouter }
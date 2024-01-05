const controllerWrapper = require('../../utils/wrappers/controllerWrapper');

const getAllDays = controllerWrapper(
    async (req, res) => {
        const days = req.ground.days;
        res.status(200).json(days);
    }, 
    "Unable to get days."
)

const getDay = controllerWrapper(
    async (req, res) => {
        const ground = req.ground;
  
        const day = ground.days.find((day) => day.dayId == req.params.dayId);
        if(!day) {
            return res.status(404).json({message: 'Day not found.'});
        }
  
        res.status(200).json(day);
    }, 
    "Unable to get active countries."
)

module.exports={getAllDays, getDay};
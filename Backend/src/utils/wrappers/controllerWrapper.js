const controllerWrapper = (controller, messageFailure) => {
    return async (req, res) => {
        try {
            await controller(req, res);
        } catch (error) {
            if(error.name==='ValidationError'){
                return res.status(400).json({message: Object.values(error.errors)[0].message});
            }
            else if (error.name==='MongoServerError' && error.code===11000) {
                return res.status(409).json({ message: 'Already exists.' });
            }
            else {
                res.status(500).json({message: messageFailure})
            }
        }
    }
};

module.exports = controllerWrapper;
const Contact=require('../../models/contactModel');
const controllerWrapper = require('../../utils/wrappers/controllerWrapper');

const getAllMessages = controllerWrapper(
    async (req, res) => {
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 10;

        const skip=(page-1) * limit;

        const messages = await Contact.find().sort({createdAt: -1}).skip(skip).limit(limit);

        const totalMessages = await Contact.countDocuments();
        const totalPages = Math.ceil(totalMessages/limit);

        res.status(200).json({page, totalMessages, totalPages, messages});
    }, 
    "Unable to get contact messages."
)

const getMessage = controllerWrapper(
    async (req, res) => {
        const message = req.message;
        res.status(200).json(message);
    }, 
    "Unable to get contact message."
)

const updateStatusToRead = controllerWrapper(
    async (req, res) => {
        if(Object.keys(req.body).length!==0) {
            return res.status(400).json({ message: "Request body is not allowed." });
        }

        const message=await Contact.findOneAndUpdate({messageId: req.params.messageId}, {status: 'Read'}, {runValidators: true});
        if(!message) {
            return res.status(404).json({ message: "This message does not exist."});
        }

        const updatedMessage=await Contact.findOne({ messageId: req.params.messageId });

        res.status(200).json({message: "Message status successfully updated to 'Read'!", updatedMessage});
    }, 
    "Unable to update status of message to read."
)

const updateStatusToResponded = controllerWrapper(
    async (req, res) => {
        if(Object.keys(req.body).length!==0) {
            return res.status(400).json({ message: "Request body is not allowed." });
        }

        const message=await Contact.findOneAndUpdate({messageId: req.params.messageId}, {status: 'Responded'}, {runValidators: true});
        if(!message) {
            return res.status(404).json({ message: "This message does not exist."});
        }
        
        const updatedMessage=await Contact.findOne({ messageId: req.params.messageId });

        res.status(200).json({message: "Message status successfully updated to 'Responded'!", updatedMessage});
    }, 
    "Unable to update status of message to responded."
)

const deleteMessage = controllerWrapper(
    async (req, res) => {
        const message = await Contact.findOneAndDelete({messageId: req.params.messageId});
        if(!message) {
            return res.status(404).json({ message: "This message does not exist."});
        }

        res.status(200).json({message: "Message successfully deleted!", message});
    }, 
    "Unable to delete message."
)

module.exports={getAllMessages, getMessage, updateStatusToRead, updateStatusToResponded, deleteMessage};
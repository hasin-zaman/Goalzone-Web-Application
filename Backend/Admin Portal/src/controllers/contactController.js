const Contact=require('../models/contactModel');

const getAllMessages = async (req, res) => {
    try {
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 10;

        const skip=(page-1) * limit;

        const messages = await Contact.find().sort({createdAt: -1}).skip(skip).limit(limit);

        const totalMessages = await Contact.countDocuments();
        const totalPages = Math.ceil(totalMessages/limit);

        res.status(200).json({page, totalMessages, totalPages, messages});
    } catch (error) {
        res.status(500).json({message: 'Unable to get contact messages.'});
    }
}

const getMessage = async (req, res) => {
    try {
        const message=await Contact.findOne({ messageId: req.params.id });
        if(!message){
            return res.status(404).json({message: "This contact message does not exist"});
        }

        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateMessageStatusToRead = async (req, res) => {
    try {
        if (Object.keys(req.body).length!==0) {
            return res.status(400).json({ message: "Request body is not allowed." });
        }

        const message=await Contact.findOneAndUpdate({messageId: req.params.id}, {status: 'Read'}, {runValidators: true});
        
        if (!message) {
            return res.status(404).json({ message: "This message does not exist."});
        }

        const updatedMessage=await Contact.findOne({ messageId: req.params.id });

        res.status(200).json({message: "Message status successfully updated to 'Read'!", updatedMessage});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateMessageStatusToResponded = async (req, res) => {
    try {
        if (Object.keys(req.body).length!==0) {
            return res.status(400).json({ message: "Request body is not allowed." });
        }

        const message=await Contact.findOneAndUpdate({messageId: req.params.id}, {status: 'Responded'}, {runValidators: true});
        
        if (!message) {
            return res.status(404).json({ message: "This message does not exist."});
        }
        
        const updatedMessage=await Contact.findOne({ messageId: req.params.id });

        res.status(200).json({message: "Message status successfully updated to 'Responded'!", updatedMessage});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteMessage = async (req, res) => {
    try {
        const message = await Contact.findOneAndDelete({messageId: req.params.id});
        
        if (!message) {
            return res.status(404).json({ message: "This message does not exist."});
        }

        res.status(200).json({message: "Message successfully deleted!", message});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports={
    getAllMessages,
    getMessage,
    updateMessageStatusToRead,
    updateMessageStatusToResponded,
    deleteMessage
};
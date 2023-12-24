const Contact=require('../../models/contactModel');
const controllerWrapper = require('../../utils/wrappers/controllerWrapper');

const sendMessage = controllerWrapper(
    async (req, res) => {
        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({message: "Please fill the form."});
        }

        //getting id of last message to create new id for new message
        var lastId=0;
        const lastMessage=await Contact.find().sort({_id:-1}).limit(1);
        if(lastMessage[0]!=null){
            const jsonString=JSON.stringify(lastMessage[0]);
            const jsonObj=JSON.parse(jsonString);
            lastId=jsonObj.messageId;
        }

        const contactMessage=await Contact.create({
            messageId: lastId+1,
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            status: "Unread"
        });

        res.status(200).json({message: "Message successfully sent!", contactMessage});
    }, 
    "Unable to send message."
)

module.exports={sendMessage};
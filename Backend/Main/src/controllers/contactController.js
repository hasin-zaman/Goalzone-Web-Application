const Contact=require('../models/contactModel');
const validateEmail=require('../helpers/emailValidation.js');

const addMessage = async (req, res) => {
    try {
        if (req.body.name=='' && req.body.email=='' && req.body.message=='') {
            return res.status(400).json({ message: "Please fill the form." });
        }

        if (req.body.name=='') {
            return res.status(400).json({ message: "Name is required." });
        }

        if (req.body.email=='') {
            return res.status(400).json({ message: "Email is required." });
        }

        const isValidEmail = await validateEmail(req.body.email);
        if (!isValidEmail) {
            return res.status(400).json({ message: "Invalid email."});
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
    } catch (error) {
        if(error.name==='ValidationError'){
            res.status(403).json({message: Object.values(error.errors).map(val => val.message)})
        }
        else{
            res.status(500).json({message: "Unable to send message."})
        }
    }
}

module.exports={
    addMessage
};
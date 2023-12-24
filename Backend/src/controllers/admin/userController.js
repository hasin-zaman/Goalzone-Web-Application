const bcrypt=require('bcrypt');
const User=require('../../models/userModel');
const passwordValidation=require('../../utils/validations/passwordValidation');
const controllerWrapper = require('../../utils/wrappers/controllerWrapper');

const addUser = controllerWrapper(
    async (req, res) => {
        const isValidPassword=passwordValidation(req.body.password);
        if(!isValidPassword) {
            return res.status(400).json({ message: 'Invalid Password. Minimum 8 characters long with a lowercase letter, an uppercase letter, and a digit.' });
        }

        //hashing password to store through bcrypt
        const hashedPassword=await bcrypt.hash(req.body.password, 10);

        //getting id of last User registered to create new id for new user
        var lastId=0;
        const lastUser=await User.find().sort({_id:-1}).limit(1);
        if(lastUser[0]!=null){
            const jsonString=JSON.stringify(lastUser[0]);
            const jsonObj=JSON.parse(jsonString);
            lastId=jsonObj.userId;
        }

        const user=await User.create({
            userId: lastId+1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            phone: req.body.phone,
            phoneStatus: req.body.phoneStatus || "Private",
            email: req.body.email,
            emailStatus: req.body.emailStatus || "Private",
            password: hashedPassword,
            role: req.body.role,
            bio: req.body.bio,
            profileImage: req.body.profileImage,
            coverImage: req.body.coverImage,
            mostPreferredPosition: req.body.mostPreferredPosition,
            secondPreferredPosition: req.body.secondPreferredPosition,
            status: req.body.status || "Inactive"
        });

        res.status(200).send({message: "User successfully added!", user});
    }, 
    "Unable to add user."
)

const getAllUsers = controllerWrapper(
    async (req, res) => {
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 10;

        const skip=(page-1) * limit;

        const users = await User.find({}).sort({createdAt: -1}).skip(skip).limit(limit);

        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers/limit);

        res.status(200).json({page, totalUsers, totalPages, users});
    }, 
    "Unable to get users."
)

const getUser = controllerWrapper(
    async (req, res) => {
       //parsing string req.params to int as userId is stored as int
       const userId=parseInt(req.params.userId);

       const user=await User.findOne({userId: userId}).populate("teams._id", "teamId teamName profileImage captain");
       if(!user){
           return res.status(404).json({message: "User with id " + userId + " does not exist"})
       }

       res.status(200).json(user); 
    }, 
    "Unable to get user."
)

const updateUser = controllerWrapper(
    async (req, res) => {
        //parsing string req.params to int as userId is stored as int
        const userId=parseInt(req.params.userId);

        let user=await User.findOne({userId: userId});
        if(!user){
            return res.status(404).json({message: "User with id " + userId + " does not exist"});//Not Found
        }

        const isValidPassword=passwordValidation(req.body.password);
        if(!isValidPassword) {
            return res.status(400).json({ message: 'Invalid Password. Minimum 8 characters long with a lowercase letter, an uppercase letter, and a digit.' });
        }

        //hashing password if password field needs to be updated
        if (req.body.hasOwnProperty('password')) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        user=await User.findOneAndUpdate({userId: userId}, req.body, {runValidators: true});

        const updatedUser = await User.findOne({userId: userId});
        res.status(200).json({message: "User successfully updated!", updatedUser});
    }, 
    "Unable to update user."
)

const deleteUser = controllerWrapper(
    async (req, res) => {
        //parsing string req.params to int as userId is stored as int
        const userId=parseInt(req.params.userId);

        const user = await User.findOneAndDelete({userId: userId});

        if(!user) {
            return res.status(404).json({message: "User with id " + userId + " was not found."});
        }

        res.status(200).json({message: "User successfully deleted!", user});
    }, 
    "Unable to delete user."
)

module.exports={addUser, getAllUsers, getUser, updateUser, deleteUser}
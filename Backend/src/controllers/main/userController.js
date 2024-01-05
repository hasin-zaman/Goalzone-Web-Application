const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const User=require('../../models/userModel');
const passwordValidation=require('../../utils/validations/passwordValidation');
const controllerWrapper = require('../../utils/wrappers/controllerWrapper');

const signup = controllerWrapper(
    async (req, res) => {
        if(req.body.hasOwnProperty('role') && req.body.role==='Admin') {
            return res.status(403).json({ message: 'Signing up as Admin is not allowed.' });
        }

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
            gender: req.body.gender,
            age: req.body.age,
            mostPreferredPosition: req.body.mostPreferredPosition,
            secondPreferredPosition: req.body.secondPreferredPosition,
            phone: req.body.phone,
            phoneStatus: req.body.phoneStatus || "Private",
            email: req.body.email,
            emailStatus: req.body.emailStatus || "Private",
            password: hashedPassword,
            role: req.body.role,
            status: req.body.status || "Inactive"
        });

        //generating tokens
        const accessToken=jwt.sign({userId: user.userId, role: user.role}, process.env.SECRET_ACCESS_TOKEN, {expiresIn: "30h"});
        const refreshToken=jwt.sign({userId: user.userId}, process.env.SECRET_REFRESH_TOKEN);

        res.status(200).send({message: "Account successfully registered!", user, accessToken, refreshToken});
    }, 
    "Unable to create account."
)

const login = controllerWrapper(
    async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            return res.status(404).json({message: "Incorrect email or user does not exist."});
        }

        //checking if passwords match
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Incorrect password.'});
        }

        //generating tokens
        const accessToken=jwt.sign({userId: user.userId, role: user.role}, process.env.SECRET_ACCESS_TOKEN, {expiresIn: "30h"});
        const refreshToken=jwt.sign({userId: user.userId}, process.env.SECRET_REFRESH_TOKEN);

        res.status(200).send({message: "Successfully logged in!", user, accessToken, refreshToken});
    }, 
    "Unable to login."
)

const getProfile = controllerWrapper(
    async (req, res) => {
        const user = req.user;

        res.status(200).json(user);
    }, 
    "Unable to get profile."
)

const updateMyProfile = controllerWrapper(
    async (req, res) => {
        const user=req.user;

        if(req.body.hasOwnProperty('role') && req.body.role!==user.role) {
            return res.status(403).json({ message: 'Changing role is not allowed.' });
        }

        //disallowing updating userId which are supposed to stay unique
        if(req.body.hasOwnProperty('userId') && req.body.userId!=req.params.id){
            return res.status(403).json({message: "Changing user id is not allowed."});
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
    "Unable to update profile."
)

const deleteMyProfile = controllerWrapper(
    async (req, res) => {
        //parsing string req.params to int as userId is stored as int
        const userId=parseInt(req.params.userId);

        const user = await User.findOneAndDelete({userId: userId});

        if(!user) {
            return res.status(404).json({message: "User with id " + userId + " was not found."});
        }

        res.status(200).json(user);
    }, 
    "Unable to delete profile."
)

module.exports={signup, login, getProfile, updateMyProfile, deleteMyProfile}
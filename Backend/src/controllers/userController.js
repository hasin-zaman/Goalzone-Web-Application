const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const User=require('../models/userModel');
const passwordValidation=require('../utils/passwordValidation');

//main
async function signup(req, res){
    try {
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

        //creating new user
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
    } catch (error) {
        if(error.name==='ValidationError'){
            return res.status(400).json({message: Object.values(error.errors)[0].message});
        }
        else if (error.name==='MongoServerError' && error.code===11000) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        res.status(500).json({message: "Unable to create your account."});
    }
}

async function login(req, res) {
    try {
        //checking if user exists
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            return res.status(404).json({message: "Incorrect email or user does not exist."});//Not Found
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
    } catch (error) {
        res.status(500).json({message: 'Unable to login.'})
    }
}

const getProfile = async(req, res)=>{
    try {
        //parsing string req.params to int as userId is stored as int
        const userId=parseInt(req.params.userId);

        //finding and checking if user exists
        const user=await User.findOne({userId: userId}).populate("teams._id", "teamId teamName profileImage captain");
        if(!user){
            return res.status(404).json({message: "User with id " + userId + " does not exist"})
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

async function updateMyProfile(req, res) {
    try {
        //parsing string req.params to int as userId is stored as int
        const userId=parseInt(req.params.userId);

        //checking if user exists
        let user=await User.findOne({userId: userId});
        if(!user){
            return res.status(404).json({message: "User with id " + userId + " does not exist"});//Not Found
        }

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

        //updating user
        user=await User.findOneAndUpdate({userId: userId}, req.body, {runValidators: true});

        const updatedUser = await User.findOne({userId: userId});
        res.status(200).json({message: "User successfully updated!", updatedUser});
    } catch (error) {
        if(error.name==='ValidationError'){
            return res.status(400).json({message: Object.values(error.errors)[0].message});
        }
        else if (error.name==='MongoServerError' && error.code===11000) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        res.status(500).json({message: error.message })
    }
}

async function deleteMyProfile(req, res) {
    try {
        //parsing string req.params to int as userId is stored as int
        const userId=parseInt(req.params.userId);

        const user = await User.findOneAndDelete({userId: userId});

        if(!user) {
            return res.status(404).json({message: "User with id " + userId + " was not found."});
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//admin
async function addUser(req, res){
    try {
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

        //creating new user
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
    } catch (error) {
        if(error.name==='ValidationError'){
            return res.status(400).json({message: Object.values(error.errors)[0].message});
        }
        else if (error.name==='MongoServerError' && error.code===11000) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        res.status(500).json({message: "Unable to add user."});
    }
}

async function adminLogin(req, res) {
    try {
        //checking if user exists
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            return res.status(404).json({message: "Incorrect email or user does not exist."});//Not Found
        }

        //checking if user is admin
        if (user.role!="Admin") {
            return res.status(403).json({message: 'Denied Access.'});
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
    } catch (error) {
        res.status(500).json({message: 'Unable to login.'})
    }
}

async function getAllUsers(req, res) {
    try {
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 10;

        const skip=(page-1) * limit;

        //finding all users
        const users = await User.find({}).sort({createdAt: -1}).skip(skip).limit(limit);

        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers/limit);

        res.status(200).json({page, totalUsers, totalPages, users});
    } catch (error) {
        res.status(500).json({message: 'Unable to find users'})
    }
}

const getUser = async(req, res)=>{
    try {
        //parsing string req.params to int as userId is stored as int
        const userId=parseInt(req.params.userId);

        //finding and checking if user exists
        const user=await User.findOne({userId: userId}).populate("teams._id", "teamId teamName profileImage captain");
        if(!user){
            return res.status(404).json({message: "User with id " + userId + " does not exist"})
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

async function updateUser(req, res) {
    try {
        //parsing string req.params to int as userId is stored as int
        const userId=parseInt(req.params.userId);

        //checking if user exists
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

        //updating user
        user=await User.findOneAndUpdate({userId: userId}, req.body, {runValidators: true});

        const updatedUser = await User.findOne({userId: userId});
        res.status(200).json({message: "User successfully updated!", updatedUser});
    } catch (error) {
        if(error.name==='ValidationError'){
            return res.status(400).json({message: Object.values(error.errors)[0].message});
        }
        else if (error.name==='MongoServerError' && error.code===11000) {
            return res.status(409).json({ message: 'User already exists.' });
        }
        
        res.status(500).json({message: error.message })
    }
}

async function deleteUser(req, res) {
    try {
        //parsing string req.params to int as userId is stored as int
        const userId=parseInt(req.params.userId);

        const user = await User.findOneAndDelete({userId: userId});

        if (!user) {
            return res.status(404).json({message: "User with id " + userId + " was not found."});
        }

        res.status(200).json({message: "User successfully deleted!", user});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports={
    signup,
    login,
    getProfile,
    updateMyProfile,
    deleteMyProfile,
    addUser,
    adminLogin,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}
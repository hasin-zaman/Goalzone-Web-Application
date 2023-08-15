const User=require('../models/userModel');
const Team=require('../models/teamModel');
const { validateEmail }=require('../utils/emailValidation.js');

//main
const registerTeam = async (req, res) => {
    try {
        //checking if user exists
        const user=await User.findOne({userId: req.params.userId});
        if(!user){
            return res.status(404).json({message: "User not found."})//Not Found
        }

        var lastId=0;
        const lastTeam=await Team.find().sort({_id:-1}).limit(1);
        if(lastTeam[0]!=null){
            const jsonString=JSON.stringify(lastTeam[0]);
            const jsonObj=JSON.parse(jsonString);
            lastId=parseInt(jsonObj.teamId[3]);
        }
        const id=req.body.teamName[0].toLowerCase()+req.body.teamName[1].toLowerCase()+"-"+(lastId+1);

        //creating new team
        const team=await Team.create({
            teamId: id,
            teamName: req.body.teamName,
            establishedInYear: req.body.establishedInYear,
            phone: req.body.phone,
            phoneStatus: req.body.phoneStatus || "Public",
            email: req.body.email,
            emailStatus: req.body.emailStatus || "Public",
            profileImage: req.body.profileImage,
            coverImage: req.body.coverImage,
            facebookHandle: req.body.facebookHandle,
            instaHandle: req.body.instaHandle,
            captain: user._id,
            status: req.body.status || "Active"
        });
    
        res.status(200).json({message: "Team successfully added!", team});
    } catch (error) {
        if(error.name==='ValidationError'){
            return res.status(400).json({message: Object.values(error.errors)[0].message});
        }

        res.status(500).json({message: "Unable to add team."})
    }
}

const getActiveTeams = async (req, res) => {
    try {
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 10;

        const skip=(page-1) * limit;

        const teams = await Team.find({status: 'Active'}).sort({createdAt: -1}).skip(skip).limit(limit).populate('captain', 'userId firstName lastName');

        const totalTeams = await Team.countDocuments({status: 'Active'});
        const totalPages = Math.ceil(totalTeams/limit);

        res.status(200).json({page, totalTeams, totalPages, teams});
    } catch (error) {
        res.status(500).json({ message: 'Unable to get teams.'});
    }
}


const getActiveTeam = async (req, res) => {
    try {
        //finding and checking if team exists
        const team=await Team.findOne({teamId: req.params.id, status: "Active"}).populate("captain", "userId firstName lastName profileImage mostPreferredPosition secondPreferredPosition age").populate("players", "userId firstName lastName profileImage mostPreferredPosition secondPreferredPosition age").populate("requests", "userId firstName lastName profileImage mostPreferredPosition secondPreferredPosition age");
        if(!team){
            return res.status(404).json({message: "This Team does not exist"});
        }

        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


const updateMyTeam = async (req, res) => {
    try {
        //checking if team exists
        let team=await Team.findOne({teamId: req.params.id});
        if(!team){
            return res.status(404).json({message: "Team does not exist."});//Not Found
        }

        //checking if user exists
        const user=await User.findOne({userId: req.params.userId});
        if(!user){
            return res.status(404).json({message: "User not found."});//Not Found
        }

        //disallowing updating teamId which are supposed to stay unique
        if(req.body.hasOwnProperty('teamId') && req.body.teamId!=req.params.id){
            return res.status(400).json({message: "Changing team id is not allowed."});
        }

        //disallowing updating captain, players, requests properties
        if(req.body.hasOwnProperty('players') || req.body.hasOwnProperty('captain') || req.body.hasOwnProperty('requests')){
            return res.status(400).json({message: "Captain, Players, and Requests properties cannot be updated like this."});
        }

        team=await Team.findOneAndUpdate({teamId: req.params.id}, req.body, {runValidators: true});

        const updatedTeam=await Team.findOne({teamId: req.params.id});
        res.status(200).json({message: "Team successfully updated!", updatedTeam});
    } catch (error) {
        if(error.name==='ValidationError'){
            return res.status(400).json({message: Object.values(error.errors)[0].message});
        }

        res.status(500).json({message: error.message});
    }
}

const deleteMyTeam = async (req, res) => {
    try {
        const team = await Team.findOneAndDelete({teamId: req.params.id});
        if (!team) {
            return res.status(404).json({ message: "This team does not exist."});
        }

        res.status(200).json({message: "Team successfully deleted!", team});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const sendRequest=async (req, res)=>{
    try {
        //checking if team exists
        let team=await Team.findOne({teamId: req.params.id});
        if(!team){
            return res.status(404).json({message: "Team does not exist."});//Not Found
        }

        //checking if user exists
        const user=await User.findOne({userId: req.params.userId});
        if(!user){
            return res.status(404).json({message: "User not found."});//Not Found
        }

        //checking if user is already part of the team
        if(team.captain.equals(user._id) || (team.players && team.players.some((player)=>player.equals(user._id)))){
            return res.status(409).json({message: "User is already part of the team."});//Conflict
        }

        //checking if request already sent earlier
        if(team.requests && team.requests.some((request)=>request.equals(user._id))){
            return res.status(409).json({message: "Request to join team has already been sent."});//Conflict
        }

        //adding request to join
        team=await Team.findOneAndUpdate({teamId: req.params.id}, {$addToSet:{requests: user._id}});

        const updatedTeam=await Team.findOne({teamId: req.params.id});
        res.status(200).json({message: "Request to join team has been submitted.", updatedTeam});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const unsendRequest=async (req, res)=>{
    try {
        //checking if team exists
        let team=await Team.findOne({teamId: req.params.id});
        if(!team){
            return res.status(404).json({message: "Team does not exist."});//Not Found
        }

        //checking if user exists
        const user=await User.findOne({userId: req.params.userId});
        if(!user){
            return res.status(404).json({message: "User not found."});//Not Found
        }

        //checking if request does not exists
        if(team.requests && !team.requests.some((request)=>request.equals(user._id))){
            return res.status(404).json({message: "Request already does not exist."});//Conflict
        }

        //deleting request to join
        team=await Team.findOneAndUpdate({teamId: req.params.id}, {$pull:{requests: user._id}});

        const updatedTeam=await Team.findOne({teamId: req.params.id});
        res.status(200).json({message: "Request to join team has been cancelled.", updatedTeam});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const approveRequest=async (req, res)=>{
    try {
        //checking if team and request exist
        let team=await Team.findOne({teamId: req.params.id});
        let user=await User.findOne({userId: req.params.requestId});
        if(team && team.requests && !team.requests.some((request=>request.equals(user._id)))){
            return res.status(404).json({message: "Request not found."});//Not Found
        }

        //checking if request being approved by team's captain only
        const captain=await User.findOne({userId: req.params.userId})
        if(!team.captain.equals(captain._id)){
            return res.status(401).json({message: "Unauthorized access."});//Unauthorized
        }

        //checking if player used to be part of the team
        if(user.teams && user.teams.some((teamUser)=>teamUser._id.equals(team._id))){
            //updating team in user
            user=await User.findOneAndUpdate({userId: req.params.requestId, 'teams._id': team._id}, {$set:{'teams.$.joinDate': new Date(), 'teams.$.endDate': null}});
        }
        else{
            //adding team to user
            user=await User.findOneAndUpdate({userId: req.params.requestId}, {$addToSet:{teams: {_id: team._id, joinDate: new Date()}}});
        }

        //removing request to join
        team=await Team.findOneAndUpdate({teamId: req.params.id}, {$pull:{requests: user._id}});

        //approving request by adding user to players
        team=await Team.findOneAndUpdate({teamId: req.params.id}, {$addToSet:{players: user._id}});

        const updatedTeam=await Team.findOne({teamId: req.params.id}).populate("requests", "userId firstName lastName profileImage mostPreferredPosition secondPreferredPosition age");
        res.status(200).json({message: "Request to join team has been approved.", updatedTeam});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const declineRequest=async (req, res)=>{
    try {
        //checking if team and request exist
        let team=await Team.findOne({teamId: req.params.id});
        const user=await User.findOne({userId: req.params.requestId});
        if(team && team.requests && !team.requests.some((request=>request.equals(user._id)))){
            return res.status(404).json({message: "Request not found."});//Not Found
        }

        //check if request being declined by team's captain only
        const captain=await User.findOne({userId: req.params.userId})
        if(!team.captain.equals(captain._id)){
            return res.status(401).json({message: "Unauthorized access."});//Unauthorized
        }

        //declining request by removing it from requests
        team=await Team.findOneAndUpdate({teamId: req.params.id}, {$pull:{requests: user._id}});

        const updatedTeam=await Team.findOne({teamId: req.params.id}).populate("requests", "userId firstName lastName profileImage mostPreferredPosition secondPreferredPosition age");
        res.status(200).json({message: "Request to join team has been declined.", updatedTeam});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const leaveTeam=async (req, res)=>{
    try {
        //checking if team exists
        let team=await Team.findOne({teamId: req.params.id});
        if(!team){
            return res.status(404).json({message: "Team does not exist."});//Not Found
        }

        //checking if user exists
        let user=await User.findOne({userId: req.params.userId});
        if(!user){
            return res.status(404).json({message: "User not found."});//Not Found
        }

        //checking if user is part of the team and team stored inside user details
        if((team.players && !team.players.some((player)=>player.equals(user._id))) || (user.teams && !user.teams.some((teamUser)=>teamUser._id.equals(team._id)))){
            return res.status(404).json({message: "User is not part of team."});//Conflict
        }

        //removing user from players
        team=await Team.findOneAndUpdate({teamId: req.params.id}, {$pull:{players: user._id}});

        //updating team in user
        user=await User.findOneAndUpdate({userId: req.params.userId, 'teams._id': team._id}, {$set:{'teams.$.endDate': new Date()}});

        const updatedTeam=await Team.findOne({teamId: req.params.id}).populate("requests", "userId firstName lastName profileImage mostPreferredPosition secondPreferredPosition age");
        const updatedUser=await User.findOne({userId: req.params.userId})
        res.status(200).json({message: "Request to leave team has been processed.", updatedTeam, updatedUser});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//admin
const addTeam = async (req, res) => {
    try {
        //checking if captain exists
        const captain=await User.findOne({userId: req.params.captainId});
        if(!captain){
            return res.status(404).json({message: "Captain not found."})//Not Found
        }

        if(captain.role!=='Captain') {
            return res.status(400).json({message: "Invalid role."})//Not Found
        }

        var lastId=0;
        const lastTeam=await Team.find().sort({_id:-1}).limit(1);
        if(lastTeam[0]!=null){
            const jsonString=JSON.stringify(lastTeam[0]);
            const jsonObj=JSON.parse(jsonString);
            lastId=parseInt(jsonObj.teamId[3]);
        }
        const id=req.body.teamName[0].toLowerCase()+req.body.teamName[1].toLowerCase()+"-"+(lastId+1);

        //creating new team
        const team=await Team.create({
            teamId: id,
            teamName: req.body.teamName,
            slogan: req.body.slogan,
            establishedInYear: req.body.establishedInYear,
            phone: req.body.phone,
            phoneStatus: req.body.phoneStatus || "Private",
            email: req.body.email,
            emailStatus: req.body.emailStatus || "Private",
            profileImage: req.body.profileImage,
            coverImage: req.body.coverImage,
            facebookHandle: req.body.facebookHandle,
            instaHandle: req.body.instaHandle,
            captain: captain._id,
            status: req.body.status || "Inactive"
        });
    
        res.status(200).json({message: "Team successfully added!", team});
    } catch (error) {
        if(error.name==='ValidationError'){
            return res.status(400).json({message: Object.values(error.errors)[0].message});
        }

        res.status(500).json({message: "Unable to add team."})
    }
}

const getAllTeams = async (req, res) => {
    try {
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 10;

        const skip=(page-1) * limit;

        const teams = await Team.find().sort({createdAt: -1}).skip(skip).limit(limit).populate('captain', 'userId firstName lastName');

        const totalTeams = await Team.countDocuments();
        const totalPages = Math.ceil(totalTeams/limit);

        res.status(200).json({page, totalTeams, totalPages, teams});
    } catch (error) {
        res.status(500).json({ message: 'Unable to get teams.'});
    }
}

const getTeam = async (req, res) => {
    try {
        //finding and checking if team exists
        const team=await Team.findOne({teamId: req.params.id}).populate("captain", "userId firstName lastName profileImage mostPreferredPosition secondPreferredPosition age").populate("players", "userId firstName lastName profileImage mostPreferredPosition secondPreferredPosition age").populate("requests", "userId firstName lastName profileImage mostPreferredPosition secondPreferredPosition age");
        if(!team){
            return res.status(404).json({message: "This Team does not exist"});
        }

        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateTeam = async (req, res) => {
    try {
        //checking if team exists
        let team=await Team.findOne({teamId: req.params.id});
        if(!team){
            return res.status(404).json({message: "Team does not exist."});//Not Found
        }
        
        team=await Team.findOneAndUpdate({teamId: req.params.id}, req.body, {runValidators: true});

        const updatedTeam=await Team.findOne({teamId: req.params.id});
        res.status(200).json({message: "Team successfully updated!", updatedTeam});
    } catch (error) {
        if(error.name==='ValidationError'){
            return res.status(400).json({message: Object.values(error.errors)[0].message});
        }
        
        res.status(500).json({message: error.message});
    }
}

const deleteTeam = async (req, res) => {
    try {
        const team = await Team.findOneAndDelete({teamId: req.params.id});
        if (!team) {
            return res.status(404).json({ message: "This team does not exist."});
        }

        res.status(200).json({message: "Team successfully deleted!", team});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports={
    registerTeam,
    getActiveTeams,
    getActiveTeam,
    updateMyTeam,
    deleteMyTeam,
    sendRequest,
    unsendRequest,
    approveRequest,
    declineRequest,
    leaveTeam,
    addTeam,
    getAllTeams,
    getTeam,
    updateTeam,
    deleteTeam
};
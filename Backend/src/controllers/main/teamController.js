const User=require('../../models/userModel');
const Team=require('../../models/teamModel');
const controllerWrapper = require('../../utils/wrappers/controllerWrapper');

const registerTeam = controllerWrapper(
    async (req, res) => {
        const user=await User.findOne({userId: req.params.userId});
        if(!user){
            return res.status(404).json({message: "User not found."})
        }

        var lastId=0;
        const lastTeam=await Team.find().sort({_id:-1}).limit(1);
        if(lastTeam[0]!=null){
            const jsonString=JSON.stringify(lastTeam[0]);
            const jsonObj=JSON.parse(jsonString);
            lastId=parseInt(jsonObj.teamId[3]);
        }
        const id=req.body.teamName[0].toLowerCase()+req.body.teamName[1].toLowerCase()+"-"+(lastId+1);

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
    }, 
    "Unable to register team."
)

const getActiveTeams = controllerWrapper(
    async (req, res) => {
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 10;

        const skip=(page-1) * limit;

        const teams = await Team.find({status: 'Active'}).sort({createdAt: -1}).skip(skip).limit(limit).populate('captain', 'userId firstName lastName');

        const totalTeams = await Team.countDocuments({status: 'Active'});
        const totalPages = Math.ceil(totalTeams/limit);

        res.status(200).json({page, totalTeams, totalPages, teams});
    }, 
    "Unable to get teams."
)

const getActiveTeam = controllerWrapper(
    async (req, res) => {
        const team = req.team;
        res.status(200).json(team);
    }, 
    "Unable to get team."
)

const updateMyTeam = controllerWrapper(
    async (req, res) => {    
        const user=await User.findOne({userId: req.params.userId});
        if(!user){
            return res.status(404).json({message: "User not found."});
        }

        //disallowing updating teamId which are supposed to stay unique
        if(req.body.hasOwnProperty('teamId') && req.body.teamId!=req.params.teamId){
            return res.status(400).json({message: "Changing team id is not allowed."});
        }

        //disallowing updating captain, players, requests properties
        if(req.body.hasOwnProperty('players') || req.body.hasOwnProperty('captain') || req.body.hasOwnProperty('requests')){
            return res.status(400).json({message: "Captain, Players, and Requests properties cannot be updated like this."});
        }

        await Team.findOneAndUpdate({teamId: req.params.teamId}, req.body, {runValidators: true});

        const updatedTeam=await Team.findOne({teamId: req.params.teamId});
        res.status(200).json({message: "Team successfully updated!", updatedTeam});
    }, 
    "Unable to update team."
)

const deleteMyTeam = controllerWrapper(
    async (req, res) => {
        const team = await Team.findOneAndDelete({teamId: req.params.teamId});
        if (!team) {
            return res.status(404).json({ message: "This team does not exist."});
        }

        res.status(200).json({message: "Team successfully deleted!", team});
    }, 
    "Unable to delete team."
)

const sendRequest = controllerWrapper(
    async (req, res) => {
        let team = req.team;

        const user=await User.findOne({userId: req.params.userId});
        if(!user){
            return res.status(404).json({message: "User not found."});
        }

        //checking if user is already part of the team
        if(team.captain.equals(user._id) || (team.players && team.players.some((player)=>player.equals(user._id)))){
            return res.status(409).json({message: "User is already part of the team."});
        }

        //checking if request already sent earlier
        if(team.requests && team.requests.some((request)=>request.equals(user._id))){
            return res.status(409).json({message: "Request to join team has already been sent."});
        }

        //adding request to join
        team=await Team.findOneAndUpdate({teamId: req.params.teamId}, {$addToSet:{requests: user._id}});

        const updatedTeam=await Team.findOne({teamId: req.params.teamId});
        res.status(200).json({message: "Request to join team has been submitted.", updatedTeam});
    }, 
    "Unable to send request."
)

const unsendRequest = controllerWrapper(
    async (req, res) => {
        let team = req.team;

        const user=await User.findOne({userId: req.params.userId});
        if(!user){
            return res.status(404).json({message: "User not found."});
        }

        //checking if request does not exists
        if(team.requests && !team.requests.some((request)=>request.equals(user._id))){
            return res.status(404).json({message: "Request already does not exist."});
        }

        //deleting request to join
        team=await Team.findOneAndUpdate({teamId: req.params.teamId}, {$pull:{requests: user._id}});

        const updatedTeam=await Team.findOne({teamId: req.params.teamId});
        res.status(200).json({message: "Request to join team has been cancelled.", updatedTeam});
    }, 
    "Unable to unsend request."
)

const approveRequest = controllerWrapper(
    async (req, res) => {
        let team = req.team;
        let user=await User.findOne({userId: req.params.requestId});
        if(team && team.requests && !team.requests.some((request=>request.equals(user._id)))){
            return res.status(404).json({message: "Request not found."});
        }

        //checking if request being approved by team's captain only
        const captain=await User.findOne({userId: req.params.userId})
        if(!team.captain.equals(captain._id)){
            return res.status(401).json({message: "Unauthorized access."});
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
        team=await Team.findOneAndUpdate({teamId: req.params.teamId}, {$pull:{requests: user._id}});

        //approving request by adding user to players
        team=await Team.findOneAndUpdate({teamId: req.params.teamId}, {$addToSet:{players: user._id}});

        const updatedTeam=await Team.findOne({teamId: req.params.teamId}).populate("requests", "userId firstName lastName profileImage mostPreferredPosition secondPreferredPosition age");
        res.status(200).json({message: "Request to join team has been approved.", updatedTeam});
    }, 
    "Unable to approve request."
)

const declineRequest = controllerWrapper(
    async (req, res) => {
        let team = req.team;
        const user=await User.findOne({userId: req.params.requestId});
        if(team && team.requests && !team.requests.some((request=>request.equals(user._id)))){
            return res.status(404).json({message: "Request not found."});
        }

        //check if request being declined by team's captain only
        const captain=await User.findOne({userId: req.params.userId})
        if(!team.captain.equals(captain._id)){
            return res.status(401).json({message: "Unauthorized access."});
        }

        //declining request by removing it from requests
        team=await Team.findOneAndUpdate({teamId: req.params.teamId}, {$pull:{requests: user._id}});

        const updatedTeam=await Team.findOne({teamId: req.params.teamId}).populate("requests", "userId firstName lastName profileImage mostPreferredPosition secondPreferredPosition age");
        res.status(200).json({message: "Request to join team has been declined.", updatedTeam});
    }, 
    "Unable to decline request."
)

const leaveTeam = controllerWrapper(
    async (req, res) => {
        let team = req.team;

        let user=await User.findOne({userId: req.params.userId});
        if(!user){
            return res.status(404).json({message: "User not found."});
        }

        //checking if user is part of the team and team stored inside user details
        if((team.players && !team.players.some((player)=>player.equals(user._id))) || (user.teams && !user.teams.some((teamUser)=>teamUser._id.equals(team._id)))){
            return res.status(404).json({message: "User is not part of team."});
        }

        //removing user from players
        team=await Team.findOneAndUpdate({teamId: req.params.id}, {$pull:{players: user._id}});

        //updating team in user
        user=await User.findOneAndUpdate({userId: req.params.userId, 'teams._id': team._id}, {$set:{'teams.$.endDate': new Date()}});

        const updatedTeam=await Team.findOne({teamId: req.params.teamId}).populate("requests", "userId firstName lastName profileImage mostPreferredPosition secondPreferredPosition age");
        const updatedUser=await User.findOne({userId: req.params.userId})
        res.status(200).json({message: "Request to leave team has been processed.", updatedTeam, updatedUser});
    }, 
    "Unable to leave team."
)

module.exports={registerTeam, getActiveTeams, getActiveTeam, updateMyTeam, deleteMyTeam, sendRequest, unsendRequest, approveRequest, declineRequest, leaveTeam};
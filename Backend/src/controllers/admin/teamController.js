const User=require('../../models/userModel');
const Team=require('../../models/teamModel');
const controllerWrapper = require('../../utils/wrappers/controllerWrapper');

const addTeam = controllerWrapper(
    async (req, res) => {
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
    }, 
    "Unable to add team."
)

const getAllTeams = controllerWrapper(
    async (req, res) => {
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 10;

        const skip=(page-1) * limit;

        const teams = await Team.find().sort({createdAt: -1}).skip(skip).limit(limit).populate('captain', 'userId firstName lastName');

        const totalTeams = await Team.countDocuments();
        const totalPages = Math.ceil(totalTeams/limit);

        res.status(200).json({page, totalTeams, totalPages, teams});
    }, 
    "Unable to get teams."
)

const getTeam = controllerWrapper(
    async (req, res) => {
        const team = req.team;
        res.status(200).json(team);
    }, 
    "Unable to get team."
)

const updateTeam = controllerWrapper(
    async (req, res) => {
        await Team.findOneAndUpdate({teamId: req.params.teamId}, req.body, {runValidators: true});

        const updatedTeam=await Team.findOne({teamId: req.params.teamId});
        res.status(200).json({message: "Team successfully updated!", updatedTeam});
    }, 
    "Unable to update team."
)

const deleteTeam = controllerWrapper(
    async (req, res) => {
        const team = await Team.findOneAndDelete({teamId: req.params.teamId});
        if(!team) {
            return res.status(404).json({ message: "This team does not exist."});
        }

        res.status(200).json({message: "Team successfully deleted!", team});
    }, 
    "Unable to delete team."
)

module.exports={addTeam, getAllTeams, getTeam, updateTeam, deleteTeam};
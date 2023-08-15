const express = require('express');
const router = express.Router();
const authentication=require('../middlewares/authentication.js');
const { checkRole, matchUser }=require('../middlewares/authorization.js');
const {registerTeam, getActiveTeams, getActiveTeam, updateMyTeam, deleteMyTeam, sendRequest, unsendRequest, approveRequest, declineRequest, leaveTeam, addTeam, getAllTeams, getTeam, updateTeam, deleteTeam}=require('../controllers/teamController');

//main
router.post('/teams/:userId', registerTeam);

router.get('/teams/', getActiveTeams);

router.get('/teams/:id', getActiveTeam);

router.patch('/teams/:id/:userId', updateMyTeam);

router.patch('/teams/:id/send/:userId', sendRequest);

router.patch('/teams/:id/unsend/:userId', unsendRequest);

router.patch('/teams/:id/approve/:requestId/:userId', approveRequest);

router.patch('/teams/:id/decline/:requestId/:userId', declineRequest);

router.patch('/teams/:id/leaveTeam/:userId', leaveTeam);

router.delete('/teams/:id', deleteMyTeam);

//admin
router.post('/admin/teams/:captainId', addTeam);

router.get('/admin/teams', getAllTeams);

router.get('/admin/teams/:id', getTeam);

router.patch('/admin/teams/:id', updateTeam);

router.delete('/admin/teams/:id', deleteTeam);

module.exports=router;
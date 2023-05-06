const express = require('express');
const router = express.Router();
const { verifyAccessToken }=require('../helpers/authenticationHelpers.js');
const {addTeam, getAllTeams, getAllTeamsAdmin, getTeam, getTeamAdmin, updateTeam, deleteTeam, deleteAllTeams, sendRequest, unsendRequest, approveRequest, declineRequest, leaveTeam}=require('../controllers/teamController');

// router.post('/:userId', verifyAccessToken(["Admin","Captain"]), addTeam);

// router.get('/', verifyAccessToken(), getAllTeams);

// router.get('/admin', verifyAccessToken(["Admin"]), getAllTeamsAdmin);

// router.get('/:id', verifyAccessToken(), getTeam);

// router.get('/:id/admin', verifyAccessToken(["Admin"]), getTeamAdmin);

// router.put('/:id/:userId', verifyAccessToken(["Admin", "Captain"]), updateTeam);

// router.put('/:id/send/:userId', verifyAccessToken(), sendRequest);

// router.put('/:id/unsend/:userId', verifyAccessToken(), unsendRequest);

// router.put('/:id/approve/:requestId', verifyAccessToken(["Admin", "Captain"]), approveRequest);

// router.put('/:id/decline/:requestId', verifyAccessToken(["Admin", "Captain"]), declineRequest);

// router.put('/:id/leaveTeam/:userId', verifyAccessToken(), leaveTeam);

// router.delete('/:id', verifyAccessToken(["Admin"]), deleteTeam);

// router.delete('/', verifyAccessToken(["Admin"]), deleteAllTeams);

router.post('/:userId', addTeam);

router.get('/', getAllTeams);

router.get('/admin', getAllTeamsAdmin);

router.get('/:id', getTeam);

router.get('/:id/admin', getTeamAdmin);

router.put('/:id/:userId', updateTeam);

router.put('/:id/send/:userId', sendRequest);

router.put('/:id/unsend/:userId', unsendRequest);

router.put('/:id/approve/:requestId/:userId', approveRequest);

router.put('/:id/decline/:requestId/:userId', declineRequest);

router.put('/:id/leaveTeam/:userId', leaveTeam);

router.delete('/:id', deleteTeam);

router.delete('/', deleteAllTeams);

module.exports=router;
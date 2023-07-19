const express = require('express');
const router = express.Router();
const { verifyAccessToken }=require('../helpers/authenticationHelpers.js');
const {addTeam, getAllTeams, getTeam, updateTeam, deleteTeam, deleteAllTeams, sendRequest, unsendRequest, approveRequest, declineRequest, leaveTeam}=require('../controllers/teamController');

router.post('/', verifyAccessToken(["Admin"]), addTeam);

router.get('/', verifyAccessToken(["Admin"]), getAllTeams);

router.get('/:id', verifyAccessToken(["Admin"]), getTeam);

router.put('/:id', verifyAccessToken(["Admin"]), updateTeam);

router.put('/:id/send/:userId', verifyAccessToken(["Admin"]), sendRequest);

router.put('/:id/unsend/:userId', verifyAccessToken(["Admin"]), unsendRequest);

router.put('/:id/approve/:requestId/:userId', verifyAccessToken(["Admin"]), approveRequest);

router.put('/:id/decline/:requestId/:userId', verifyAccessToken(["Admin"]), declineRequest);

router.put('/:id/leaveTeam/:userId', verifyAccessToken(["Admin"]), leaveTeam);

router.delete('/:id', verifyAccessToken(["Admin"]), deleteTeam);

router.delete('/', verifyAccessToken(["Admin"]), deleteAllTeams);

module.exports=router;
const jwt=require('jsonwebtoken');

function checkRole(role) {
    return function (req, res, next) {
        const user = req.user;

        if (user && user.role === role) {
            next();
        } 
        else {
            res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
    };
}

function matchUser() {
    return function (req, res, next) {
        if (req.user && req.user.userId==req.params.userId) {
            next();
        } 
        else {
            res.status(403).json({ message: 'Access denied. Action not allowed for the user.' });
        }
    };
}

module.exports={
    checkRole,
    matchUser
};


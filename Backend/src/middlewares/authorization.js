const isAdminRoute = require("../utils/helpers/isAdminRoute");
const isAuthorizedRoute = require("../utils/helpers/isAuthorizedRoute");
const isUserSpecificRoute = require("../utils/helpers/isUserSpecificRoute");

const checkRole = (req, res, next) => {
    const { isAuthorized, roles } = isAuthorizedRoute(req.path, req.method);

    if(isAuthorized) {
        if(roles.includes(req.user.role)) {
            next();
        }
        else {
            res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
    }
    else if(isAdminRoute(req.path)) {
        if(req.user.role=='Admin') {
            next();
        }
        else {
            res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
    }
    else {
        next();
    }
}

const matchUser = (req, res, next) => {
    if(isUserSpecificRoute(req.path, req.method) || isAdminRoute(req.path)) {
        console.log(req.user.userId, req.params)
        if (req.user.userId==req.params.userId) {
            next();
        } 
        else {
            res.status(403).json({ message: 'Access denied. Action not allowed for the user.' });
        }
    } 
}

module.exports={
    checkRole,
    matchUser
};


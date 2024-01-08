const checkRole = (req, res, next) => {
    const role = req.user.role;

    const adminRouteRegex = /^\/admin/;

    console.log(adminRouteRegex.test(req.path))
    if(adminRouteRegex.test(req.path)) {
        if(role!='Admin') {
            res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
    } 
    next();
}

// function checkRole(role) {
//     return function (req, res, next) {
        


//         if (user && user.role === role) {
//             next();
//         } 
//         else {
//             res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
//         }
//     };
// }

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


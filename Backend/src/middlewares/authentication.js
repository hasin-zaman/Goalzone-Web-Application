const jwt=require('jsonwebtoken');
const isPrivateRoute = require('../utils/helpers/isPrivateRoute');
const isAdminRoute = require('../utils/helpers/isAdminRoute');

const authentication = (req, res, next) => {

    if(isPrivateRoute(req.path, req.method) || isAdminRoute(req.path)) {
        const authHeader=req.headers['authorization'];
        const token=authHeader && authHeader.split(' ')[1];//Header is made up of 'Bearer Token'

        if(token==null){
            return res.status(401).send({ message: "Unauthorized. No token passed." })//Unauthorized
        }

        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (error, user)=>{
            if(error) {
                return res.status(401).send({ message: "Unauthorized. Invalid token." });
            }
            req.user=user;
            next();
        });
    }
    else {
        next();
    }
}

module.exports=authentication;


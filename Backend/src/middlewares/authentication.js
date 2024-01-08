const jwt=require('jsonwebtoken');
const isPublicRoute = require('../utils/helpers/isPublicRoute');

const authentication = (req, res, next) => {

    if(isPublicRoute(req.path, req.method)) {
        next();
    }
    else {
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
}

module.exports=authentication;


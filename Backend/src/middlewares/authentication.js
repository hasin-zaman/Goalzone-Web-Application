const jwt=require('jsonwebtoken');

function authentication(){
    
    return (req,res,next)=>{

    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];//Header is made up of 'Bearer Token'

    if(token==null){
        return res.sendStatus(401);//Unauthorized
    }

    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (error, user)=>{

        if(error) {
            return res.sendStatus(401);
        }
        req.user=user;
        next();
    });
}}

module.exports=authentication;


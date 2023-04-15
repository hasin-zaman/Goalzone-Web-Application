const jwt=require('jsonwebtoken');

async function validateEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

// middleware function
const verifyAccessToken=(req,res,next)=>{

    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];//Header is made up of 'Bearer Token'
    
    if(token==null){
        return res.sendStatus(401);//Unauthorized
    }

    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (error, user)=>{
        if(error){
            return res.sendStatus(403);//Forbidden
        }
        req.user=user;
        next()
    });
};

module.exports={
    validateEmail,
    verifyAccessToken
};


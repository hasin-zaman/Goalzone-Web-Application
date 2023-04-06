import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config() // load environment variables from .env file

export async function validateEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

// middleware function
export async function verifyToken(req, res, next) {
    console.log('verifyToken middleware called');
    // checks if authorization header exists
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;

        jwt.verify(req.token, `${process.env.JWT_SECRET_KEY}`, function (err, data) {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            } else {
                // res.status(200).json({
                //     message: 'Profile accessed',
                //     data: data
                // });
                console.log(data);
                if(data.newUser.role!="Captain"){
                    return res.status(403).json({message: "Forbidden"});
                }
                // Attach the authenticated user data to the request object
                req.user = data;
                //console.log(`Req.user is ${req.user.user._id}`)
                next();
            }
        })
    } else {
        res.status(403).json({ message: 'Invalid token' });
    }
}

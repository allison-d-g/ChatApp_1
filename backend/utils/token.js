import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) =>{
    // embed info in jwt token using jwt.sign
    //JWT_SECRET used to assign token
    //we verify token using the payload "userId"
    // send payload and secret to token
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '20d'
    })
    res.cookie("jwt", token, {
        maxAge: 20*24*60*60*1000, //ms
        //this token is accessible http only
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict" //CSRF attacks cross-site request forgery attacks
    })
}

export default generateTokenAndSetCookie;
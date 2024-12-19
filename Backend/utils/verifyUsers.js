const { errorHandler } = require("./error");
const jwt = require('jsonwebtoken');

exports.verifyToken = (req,res,next) =>{
    const token = req.cookies.access_token;

    if(!token) return next(errorHandler(401,'you are a unauthorized person'));

    jwt.verify(token,process.env.JWT_SECRET, (error,user) =>{
        if(error) return next(errorHandler(403,'error in token'));

        req.user = user;
        next();
    })
};
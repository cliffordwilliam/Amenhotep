const Helper = require('./helper.js')
const {User} = require("./models");


module.exports = class Middleware {
    // send err
    static handleError(err, req, res, next) {
        console.log(err);
    
        switch (err.name) {
            case "SequelizeValidationError":
                return res.status(400).json({ error: { msg: err.errors[0].message, status: 400 } });
            case "SequelizeUniqueConstraintError":
                return res.status(400).json({ error: { msg: err.errors[0].message, status: 400 } });
            case "JsonWebTokenError":
                return res.status(401).json({ error: { msg: err.message, status: 401 } });
            case "CustomError":
                return res.status(err.status).json({ error: { msg: err.msg, status: err.status } });
            default:
                return res.status(500).json({ error: { msg: "Internal Server Error.", status: 500 } });
        }
    }
    
    // no token? throw
    static async tokenGuard(req,res,next){
        try {
            // no token? throw
            if (!req.headers.authorization) Helper.customError("Unauthorized. A valid bearer token is required for access.",401);
            // grab token
            const token = req.headers.authorization.split(" ")[1];
            // token -> payload
            const payload = await Helper.tokenToPayload(token);
            console.log(payload);
            // payload owner dont exists? throw
            const user = await Helper.findOne(User,{username:payload.username},"Unauthorized. Your access token is invalid.",401);
            // grab user data (excluding password)
            const {id,username,email,profile_picture,bio,credit} = user;
            // add user data to req.loggedInUser
            req.loggedInUser = {id,username,email,profile_picture,bio,credit};
            next()
        } catch (error) {
            next(error);
        }
    }
    // under 50 creds? throw
    static checkCredit(req,res,next){
        if (req.loggedInUser.credit < 50) Helper.customError("Insufficient credit. Access forbidden.",403);
        next();
    }
}

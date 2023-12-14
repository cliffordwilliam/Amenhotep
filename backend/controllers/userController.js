const {User} = require("../models");
const Helper = require("../helper");
const Utils = require("../utils");
const {Op} = require("sequelize");
const { OAuth2Client } = require('google-auth-library');


module.exports = class UserController {
    static async post(req,res,next) {
        try {
            // get body
            const {username:bodyUsername,password,email:bodyEmail} = req.body;
            // empty args? auto throw
            const addedUser = await User.create({username:bodyUsername,password,email:bodyEmail});
            // exclude password before sending
            const userWihoutPassword = Helper.sanitizeUser(addedUser)
            // res status
            res.status(201).json({
                status: 201,
                msg: `User successfully registered.`,
                user: userWihoutPassword,
            });
        } catch (error) {
            next(error);
        }
    }
    static async login(req,res,next) {
        try {
            // unpack body
            const {email:bodyEmail,password} = req.body;
            // empty body? throw
            if (!bodyEmail) Helper.customError('Email is required.',400);
            if (!password) Helper.customError('Password is required.',400);
            // received email has no associated user? throw
            const foundUser = await Helper.findOne(User,{email:bodyEmail}, 'User not found. Please check your email or register.',401);
            if (!await Helper.comparePassword(password,foundUser.password)) Helper.customError('Wrong password. Please try again.',401);
            // exclude password before sending
            const userWihoutPassword = Helper.sanitizeUser(foundUser)
            // unpack userWihoutPassword
            const {id,username,email,profile_picture,bio,credit} = userWihoutPassword;
            // create payload
            const payload = {id,username,email,profile_picture,bio,credit};
            // payload -> token
            const token = await Helper.payloadToToken(payload);
            // res status
            res.status(200).json({
                status: 200,
                msg: `User successfully logged in.`, 
                token, 
                user: userWihoutPassword,
            });
        } catch (error) {
            next(error);
        }
    }
    static async googleLogin(req,res,next) {
        try {
            const { token } = req.headers;
            const client = new OAuth2Client();
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: {
                    username: payload.name
                },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: "password_google"
                },
                hooks: false
            })
            const access_token = Helper.payloadToToken({
                id: user.id,
                username: user.username,
            })
            const foundUser = await Helper.findOne(User,{email:payload.email}, 'User not found. Please check your email or register.',401);
            const userWihoutPassword = Helper.sanitizeUser(foundUser)
            res.status(200).json({
                status: 200,
                msg: `User successfully logged in.`, 
                token: access_token, 
                user: userWihoutPassword,
            });
        } catch (error) {
            next(error);
        }
    }
    static async get(req,res,next) {
        try {
            // grab req query
            let {username,limit,page,sort,sortField} = req.query; // user/?username=
            // limit & page -> offset
            limit = Math.max(parseInt(limit, 10),1)||10; // default 10 if null or not a number (min 1)
            page = Math.max(parseInt(page, 10),1)||1; // default 1 if null or not a number (min 1)
            const offset = (page-1)*limit;
            // sort -> order
            const order = [[sortField || 'id', sort || 'asc']]; // sortField and sort default values
            const allowedSortFields = ['username','email','credit','id']; //check sortField is valid
            if (!allowedSortFields.includes(order[0][0])) Helper.customError("Invalid sortField. Please use 'username', 'email', 'credit', or 'id'.", 400);
            const allowedSort = ['asc','desc']; // check sort is valid
            if (!allowedSort.includes(order[0][1])) Helper.customError("Invalid sort. Please use 'asc' or 'desc'.", 400);
            // search by name -> query
            let query = {};
            if (username) query.username = {[Op.iLike]: `%${username}%`};
            // findAll - using (limit,offset,order,query)
            const users = await User.findAll({attributes:{exclude:['password']},limit,offset,order,where:query});
            // res status
            res.status(200).json({
                status: 200,
                msg: `Users successfully retrieved.`,
                users,
            });
        } catch (error) {
            next(error);
        }
    }
    static async getId(req,res,next) {
        try {
            // grab req params
            const {id:paramsId} = req.params; // user/id
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(paramsId,"User ID")
            // findById
            const foundUser = await Helper.findById(paramsId,User,`User not found. No user with the ID ${paramsId} exists.`,404);
            // exclude password before sending
            const userWihoutPassword = Helper.sanitizeUser(foundUser)
            // res status
            res.status(200).json({
                status: 200,
                msg: `User successfully retrieved.`,
                user: userWihoutPassword,
            });
        } catch (error) {
            next(error);
        }
    }
    static async put(req,res,next) {
        try {
            // get id from the loggedInUser
            const {id} = req.loggedInUser;
            // unpack the body
            const {username,password,profile_picture,bio,credit} = req.body;
            if (!password) Helper.customError("Password cannot be empty.",400)
            if (password.length < 3 || password.length > 255) Helper.customError("Password must be between 3 and 255 characters.",400)
            // hash first before storing to db
            const hashedPassword = await Helper.hashPassword(password)
            // use body to update the user data
            const [rowsUpdated, [updatedUser]] = await User.update({username,password:hashedPassword,profile_picture,bio,credit},{where:{id},returning:true});
            // res status
            res.status(200).json({
                status: 200,
                msg: `User successfully updated.`,
                user: updatedUser,
            });
        } catch (error) {
            next(error);
        }
    }
    static async patch(req,res,next) {
        try {
            // get id from the loggedInUser
            const {id} = req.loggedInUser;
            // no file in body? throw (need middleware to have req.file)
            console.log(req.file);
            if (!req.file) Helper.customError('Profile picture image file is required.',400);
            // req.file -> base64
            const imgBase64 = req.file.buffer.toString("base64");
            // upload and get the url
            const result = await Utils.imagekit.upload({file:imgBase64,fileName:req.file.originalname,tags:[`${req.file.originalname}`]});
            // get the url
            const url = result.url;
            // patch
            const [count, [patchedUser]] = await User.update({profile_picture:url},{where:{id},returning:true});
            // res status
            res.status(200).json({
                status: 200,
                msg: "User profile picture successfully updated.",
                user: patchedUser,
            })
        } catch (error) {
            next(error);
        }
    }
    static async delete(req,res,next) {
        try {
            // get id from the loggedInUser (the other stuff is to be sent back)
            const {id,username,email,profile_picture,bio,credit} = req.loggedInUser;
            // use body to update the user data
            await User.destroy({where:{id}});
            // clear session / token
            res.clearCookie('jwtToken');
            // pack the deleted user to be sent
            const deletedUser = {id,username,email,profile_picture,bio,credit}
            // res status
            res.status(200).json({
                status: 200,
                msg: `User successfully deleted.`,
                user: deletedUser,
            });
        } catch (error) {
            next(error);
        }
    }
}
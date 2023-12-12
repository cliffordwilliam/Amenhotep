const Helper = require("../helper");
const {Profile,User,Drink} = require("../models");


module.exports = class ProfileController {
    static async post(req,res,next) {
        try {
            // get body
            const {age,location} = req.body;
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(age,"Age")
            if (age < 1) Helper.customError("Age must be a minimum of 1.",400)
            // location not string? throw - sequelize auto validation is weird
            Helper.checkStr(location,"Location")
            // get loggedin user id (for profile's owner, user_id fk)
            const user_id = req.loggedInUser.id;
            // user already made a profile?
            const existingProfile = await Profile.findOne({where:{user_id}});
            if (existingProfile) Helper.customError("Profile already exists for this user.",400)
            // create
            const addedProfile = await Profile.create({age,location,user_id});
            const profileWithUser = await Profile.findOne({where:{id:addedProfile.id},include:[{ model:User,attributes:{exclude:['password']},},{model: Drink,},],});
            res.status(201).json({
                status: 201,
                msg: `Profile successfully added.`,
                profile: profileWithUser,
            });
        } catch (error) {
            next(error);
        }
    }
    static async get(req,res,next) { // get own (cannot find all, what for?)
        try {
            // get loggedin user id
            const user_id = req.loggedInUser.id;
            const foundProfile = await Helper.findOne(Profile,{user_id},"You have not made your profile yet",404);
            const profileWithUser = await Profile.findOne({where:{id:foundProfile.id},include:[{ model:User,attributes:{exclude:['password']},},{model: Drink,},],});
            res.status(200).json({
                status: 200,
                msg: `Profile successfully retrieved.`,
                profile: profileWithUser,
            });
        } catch (error) {
            next(error);
        }
    }
    static async put(req,res,next) {
        try {
            // get loggedin user id
            const user_id = req.loggedInUser.id;
            // unpack the body
            const {age,location} = req.body;
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(age,"Age")
            // location not string? throw - sequelize auto validation is weird
            Helper.checkStr(location,"Location")
            // use body to update the profile data
            const [rowsUpdated,[updatedProfile]] = await Profile.update({age,location},{where:{user_id},returning:true});
            const profileWithUser = await Profile.findOne({where:{id:updatedProfile.id},include:[{ model:User,attributes:{exclude:['password']},},{model: Drink,},],});
            // res status
            res.status(200).json({
                status: 200,
                msg: `Profile successfully updated.`,
                profile: profileWithUser,
            });
        } catch (error) {
            next(error);
        }
    }
    static async patch(req,res,next) {
        try {
            // get loggedin user id
            const user_id = req.loggedInUser.id;
            // unpack the body
            let {attached_drink} = req.body;
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(attached_drink,"Attached drink")
            // number of drinks are fixed, 21 drinks
            attached_drink = Math.min(Math.max(attached_drink, 1), 21);
            // use body to update the profile data
            const [rowsUpdated,[updatedProfile]] = await Profile.update({attached_drink},{where:{user_id},returning:true});
            const profileWithUser = await Profile.findOne({where:{id:updatedProfile.id},include:[{ model:User,attributes:{exclude:['password']},},{model: Drink,},],});
            // res status
            res.status(200).json({
                status: 200,
                msg: `Profile's drink successfully updated.`,
                profile: profileWithUser,
            });
        } catch (error) {
            next(error);
        }
    }
    static async delete(req,res,next) {
        try {
            // get loggedin user id
            const user_id = req.loggedInUser.id;
            // grab the to be deleted drink to be sent to res
            const foundProfile = await Helper.findOne(Profile,{user_id},"You have not made your profile yet",404);
            const profileWithUser = await Profile.findOne({where:{id:foundProfile.id},include:[{ model:User,attributes:{exclude:['password']},},{model: Drink,},],});
            // use body to update the user data
            await Profile.destroy({where:{user_id}});
            // res status
            res.status(200).json({
                status: 200,
                msg: `Profile successfully deleted.`,
                profile: profileWithUser,
            });
        } catch (error) {
            next(error);
        }
    }
}
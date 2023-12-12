const Helper = require("../helper");
const {Gift,User,Drink} = require("../models");


module.exports = class GiftController {
    static async post(req,res,next) {
        try {
            // get user_id from the loggedInUser
            const sender_id = req.loggedInUser.id;
            // unpack the body
            let {recipient_id,drink_id} = req.body;
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(recipient_id,"Recipient ID")
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(drink_id,"Drink ID")
            // findById, exists?
            const foundRecipientUser = await Helper.findById(recipient_id,User,`Recipient user not found. No user with the ID ${recipient_id} exists.`,404);
            // findById, exists?
            const foundDrink = await Helper.findById(drink_id,Drink,`Drink not found. No drink with the ID ${drink_id} exists.`,404);
            // user send to themselves? throw
            if (sender_id === +recipient_id) Helper.customError("You cannot send gift to yourself!",400)
            // create
            const addedGift = await Gift.create({sender_id,recipient_id,drink_id:foundDrink.id});
            const giftWithUser = await Gift.findOne({where:{id:addedGift.id},include:[{model:User,attributes:{exclude:['password']},},{model:Drink,},],});
            // res status
            res.status(201).json({
                status: 201,
                msg: `Gift successfully created.`,
                gift: giftWithUser,
            });
        } catch (error) {
            next(error);
        }
    }
    static async get(req,res,next) { // get all sent gift for 1 user (user id from params)
        try {
            // grab req params
            let {sender_id} = req.params; // gift/sender_id
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(sender_id,"User ID")
            // findById, exists?
            const foundUser = await Helper.findById(sender_id,User,`User sender not found. No user sender with the ID ${sender_id} exists.`,404);
            // find all gifts with the sender_id
            const allGifts = await Gift.findAll({where:{sender_id},include:[{model:User,attributes:{exclude:['password']},},{model:Drink,},],});
            // res status
            res.status(200).json({
                status: 200,
                msg: `Sent Gifts successfully retrieved.`,
                gifts: allGifts,
            });
        } catch (error) {
            next(error);
        }
    }
    static async getUsers(req,res,next) { // get all received gift for 1 user (user id from params)
        try {
            // grab req params
            let {recipient_id} = req.params; // receiver/recipient_id
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(recipient_id,"User ID")
            // findById, exists?
            const foundUser = await Helper.findById(recipient_id,User,`User recipient not found. No user recipient with the ID ${recipient_id} exists.`,404);
            // find all gifts with the recipient_id
            const allGifts = await Gift.findAll({where:{recipient_id},include:[{model:User,attributes:{exclude:['password']},},{model:Drink,},],});
            // res status
            res.status(200).json({
                status: 200,
                msg: `Received gifts successfully retrieved.`,
                gifts: allGifts,
            });
        } catch (error) {
            next(error);
        }
    }
    static async delete(req,res,next) {
        try {
            // grab req params
            let {id} = req.params; // gift/id
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(id,"User Gift ID")
            // findById, exists?
            const foundGift = await Helper.findById(id,Gift,`Gift not found. No gift with the ID ${id} exists.`,404);
            const giftWithUser = await Gift.findOne({where:{id:foundGift.id},include:[{model:User,attributes:{exclude:['password']},},{model:Drink,},],});
            // use body to update the user data
            await Gift.destroy({where:{id}});
            // res status
            res.status(200).json({
                status: 200,
                msg: `Gift successfully deleted.`,
                gift: giftWithUser,
            });
        } catch (error) {
            next(error);
        }
    }
}
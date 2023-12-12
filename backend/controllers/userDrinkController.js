const Helper = require("../helper");
const {User_Drink,User,Drink} = require("../models");


module.exports = class UserDrinkController {
    static async post(req,res,next) {
        try {
            // get user_id from the loggedInUser
            const user_id = req.loggedInUser.id;
            // unpack the body
            let {drink_id} = req.body;
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(drink_id,"Drink ID")
            // findById, exists?
            const foundDrink = await Helper.findById(drink_id,Drink,`Drink not found. No drink with the ID ${drink_id} exists.`,404);
            // create
            const addedUserDrink = await User_Drink.create({user_id,drink_id});
            const userDrinkWithUser = await User_Drink.findOne({where:{id:addedUserDrink.id},include:[{model:User,attributes:{exclude:['password']},},{model:Drink,},],});
            // res status
            res.status(201).json({
                status: 201,
                msg: `User drink successfully created.`,
                userDrink: userDrinkWithUser,
            });
        } catch (error) {
            next(error);
        }
    }
    static async get(req,res,next) { // get all sent gift for 1 user (user id from params)
        try {
            // get user_id from the loggedInUser
            const user_id = req.loggedInUser.id;
            // find all userDrink with the user_id
            const allUserDrinks = await User_Drink.findAll({where:{user_id},include:[{model:User,attributes:{exclude:['password']},},{model:Drink,},],});
            // res status
            res.status(200).json({
                status: 200,
                msg: `User drinks successfully retrieved.`,
                userDrinks: allUserDrinks,
            });
        } catch (error) {
            next(error);
        }
    }
    static async delete(req,res,next) {
        try {
            // grab req params
            let {id} = req.params; // userDrink/id
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(id,"User drink ID")
            // findById, exists?
            const foundUserDrink = await Helper.findById(id,User_Drink,`User drink not found. No user drink with the ID ${id} exists.`,404);
            const giftWithUser = await User_Drink.findOne({where:{id:foundUserDrink.id},include:[{model:User,attributes:{exclude:['password']},},{model:Drink,},],});
            // use body to update the user data
            await User_Drink.destroy({where:{id}});
            // res status
            res.status(200).json({
                status: 200,
                msg: `User drink successfully deleted.`,
                userDrink: giftWithUser,
            });
        } catch (error) {
            next(error);
        }
    }
}
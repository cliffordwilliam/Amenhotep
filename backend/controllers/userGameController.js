const Helper = require("../helper");
const {User_Game,User,Game} = require("../models");


module.exports = class UserGameController {
    static async post(req,res,next) {
        try {
            // get user_id from the loggedInUser
            const user_id = req.loggedInUser.id;
            // unpack the body
            let {game_id} = req.body;
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(game_id,"Game ID")
            // findById, exists?
            const foundGame = await Helper.findById(game_id,Game,`Game not found. No game with the ID ${game_id} exists.`,404);
            
            // user alr made connection to this game? throw
            const existingConnection = await User_Game.findOne({where:{user_id:user_id,game_id:foundGame.id,}});
            if (existingConnection) Helper.customError("You already made a connection to this game.",400)

            // create
            const addedComment = await User_Game.create({user_id,game_id:foundGame.id});
            const userGameWithUser = await User_Game.findOne({where:{id:addedComment.id},include:[{model:User,attributes:{exclude:['password']},},{model:Game,},],});
            // res status
            res.status(201).json({
                status: 201,
                msg: `User game successfully created.`,
                userGame: userGameWithUser,
            });
        } catch (error) {
            next(error);
        }
    }
    static async get(req,res,next) { // get all games for 1 user (user id from params)
        try {
            // grab req params
            let {user_id} = req.params; // userGame/user_id
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(user_id,"User ID")
            // findById, exists?
            const foundUser = await Helper.findById(user_id,User,`User not found. No user with the ID ${user_id} exists.`,404);
            // find all games with the user_id
            const allGames = await User_Game.findAll({where:{user_id},include:[{model:User,attributes:{exclude:['password']},},{model:Game,},],});
            // // res status
            res.status(200).json({
                status: 200,
                msg: `Games successfully retrieved.`,
                games: allGames,
            });
        } catch (error) {
            next(error);
        }
    }
    static async getUsers(req,res,next) { // get all users for 1 game (game id from params)
        try {
            // grab req params
            let {game_id} = req.params; // userGame/user/:game_id
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(game_id,"Game ID")
            // findById, exists?
            const foundGame = await Helper.findById(game_id,Game,`Game not found. No game with the ID ${game_id} exists.`,404);
            // find all games with the game_id
            const allUsers = await User_Game.findAll({where:{game_id},include:[{model:User,attributes:{exclude:['password']},},{model:Game,},],});
            // res status
            res.status(200).json({
                status: 200,
                msg: `Users successfully retrieved.`,
                users: allUsers,
            });
        } catch (error) {
            next(error);
        }
    }
    static async patch(req,res,next) {
        try {
            // grab req params
            let {id} = req.params; // userGame/id
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(id,"User Game ID")
            // findById, exists?
            const foundUserGame = await Helper.findById(id,User_Game,`User game not found. No user game with the ID ${id} exists.`,404);
            // unpack the body
            let {high_score} = req.body;
            // patch
            const [count, [patchedUserGame]] = await User_Game.update({high_score},{where:{id},returning:true});
            const userGameWithUser = await User_Game.findOne({where:{id:patchedUserGame.id},include:[{model:User,attributes:{exclude:['password']},},{model:Game,},],});
            // res status
            res.status(200).json({
                status: 200,
                msg: "User game high score successfully updated.",
                chat: userGameWithUser,
            })
        } catch (error) {
            next(error);
        }
    }
    static async delete(req,res,next) {
        try {
            // grab req params
            let {id} = req.params; // userGame/id
            // age not int? throw (24.5? throw) - sequelize auto validation is weird
            Helper.checkInt(id,"User Game ID")
            // findById, exists?
            const foundUserGame = await Helper.findById(id,User_Game,`User game not found. No user game with the ID ${id} exists.`,404);
            const userGameWithUser = await User_Game.findOne({where:{id:foundUserGame.id},include:[{model:User,attributes:{exclude:['password']},},{model:Game,},],});
            // use body to update the user data
            await User_Game.destroy({where:{id}});
            // res status
            res.status(200).json({
                status: 200,
                msg: `User game successfully deleted.`,
                user: userGameWithUser,
            });
        } catch (error) {
            next(error);
        }
    }
}
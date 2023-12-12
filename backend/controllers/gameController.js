const {Game} = require("../models");


module.exports = class GameController {
    static async get(req,res,next) {
        try {
            // get all
            const allGame = await Game.findAll();
            res.status(200).json({
                status: 200,
                msg: `Games successfully retrieved.`,
                games: allGame
            });
        } catch (error) {
            next(error);
        }
    }
}
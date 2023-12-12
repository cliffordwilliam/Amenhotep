const {Drink} = require("../models");


module.exports = class DrinkController {
    static async get(req,res,next) {
        try {
            // get all
            const allDrinks = await Drink.findAll();
            res.status(200).json({
                status: 200,
                msg: `Drinks successfully retrieved.`,
                drinks: allDrinks
            });
        } catch (error) {
            next(error);
        }
    }
}
const express = require("express");


// controller
const DrinkController = require("../controllers/drinkController");

// guards
const Middleware = require("../middleware");

// 3rd party api
const Utils = require("../utils");


// create router
const drinkRouter = express.Router();

// endpoints
drinkRouter.get("/", DrinkController.get);


// exports
module.exports = drinkRouter;
const express = require("express");


// controller
const UserDrinkController = require("../controllers/userDrinkController");

// guards
const Middleware = require("../middleware");

// 3rd party api
const Utils = require("../utils");


// create router
const userDrinkRouter = express.Router();

// endpoints
userDrinkRouter.post("/", UserDrinkController.post);
userDrinkRouter.get("/", UserDrinkController.get);
userDrinkRouter.delete("/:id", UserDrinkController.delete);


// exports
module.exports = userDrinkRouter;
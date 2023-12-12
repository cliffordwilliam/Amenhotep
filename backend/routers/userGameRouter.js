const express = require("express");


// controller
const UserGameController = require("../controllers/userGameController");

// guards
const Middleware = require("../middleware");

// 3rd party api
const Utils = require("../utils");


// create router
const userGameRouter = express.Router();

// endpoints
userGameRouter.post("/", UserGameController.post);
userGameRouter.get("/user/:game_id", UserGameController.getUsers);
userGameRouter.get("/:user_id", UserGameController.get);
userGameRouter.patch("/:id", UserGameController.patch);
userGameRouter.delete("/:id", UserGameController.delete);


// exports
module.exports = userGameRouter;
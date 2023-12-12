const express = require("express");


// controller
const GameController = require("../controllers/gameController");

// guards
const Middleware = require("../middleware");

// 3rd party api
const Utils = require("../utils");


// create router
const gameRouter = express.Router();

// endpoints
gameRouter.get("/", GameController.get);


// exports
module.exports = gameRouter;
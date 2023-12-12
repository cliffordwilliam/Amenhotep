const express = require("express");


// controller
const ChatRoomController = require("../controllers/chatRoomController");

// guards
const Middleware = require("../middleware");

// 3rd party api
const Utils = require("../utils");


// create router
const chatRoomRouter = express.Router();

// endpoints
chatRoomRouter.get("/", ChatRoomController.get);


// exports
module.exports = chatRoomRouter;
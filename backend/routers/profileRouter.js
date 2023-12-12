const express = require("express");


// controller
const ProfileController = require("../controllers/profileController");

// guards
const Middleware = require("../middleware");

// 3rd party api
const Utils = require("../utils");


// create router
const profileRouter = express.Router();

// endpoints
profileRouter.post("/", ProfileController.post);
profileRouter.get("/", ProfileController.get);
profileRouter.put("/", ProfileController.put);
profileRouter.patch("/", ProfileController.patch);
profileRouter.delete("/", ProfileController.delete);


// exports
module.exports = profileRouter;
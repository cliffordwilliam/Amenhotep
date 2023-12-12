const express = require("express");


// controller
const GiftController = require("../controllers/giftController");

// guards
const Middleware = require("../middleware");

// 3rd party api
const Utils = require("../utils");


// create router
const giftRouter = express.Router();

// endpoints
giftRouter.post("/", GiftController.post);
giftRouter.get("/receiver/:recipient_id", GiftController.getUsers);
giftRouter.get("/:sender_id", GiftController.get);
giftRouter.delete("/:id", GiftController.delete);


// exports
module.exports = giftRouter;
const express = require("express");


// controller
const PostController = require("../controllers/postController");

// guards
const Middleware = require("../middleware");

// 3rd party api
const Utils = require("../utils");


// create router
const postRouter = express.Router();

// endpoints
postRouter.post("/", PostController.post);
postRouter.get("/", PostController.get);
postRouter.get("/:id", PostController.getId);
postRouter.patch("/:id", PostController.patch);
postRouter.delete("/:id", PostController.delete);


// exports
module.exports = postRouter;
const express = require("express");


// controller
const CommentController = require("../controllers/commentController");

// guards
const Middleware = require("../middleware");

// 3rd party api
const Utils = require("../utils");


// create router
const commentRouter = express.Router();

// endpoints
commentRouter.post("/", CommentController.post);
commentRouter.get("/:post_id", CommentController.get);
commentRouter.patch("/:id", CommentController.patch);
commentRouter.delete("/:id", CommentController.delete);


// exports
module.exports = commentRouter;
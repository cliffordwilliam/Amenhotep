const express = require("express");

 //child router
const userRouter = require("./userRouter");

// guards
const Middleware = require("../middleware");

// get controllers
const UserController = require("../controllers/userController");


// craete router
const homeRouter = express.Router();
const drinkRouter = require("./drinkRouter");
const gameRouter = require("./gameRouter");
const chatRoomRouter = require("./chatRoomRouter");
const profileRouter = require("./profileRouter");
const chatRouter = require("./chatRouter");
const postRouter = require("./postRouter");
const commentRouter = require("./commentRouter");
const userGameRouter = require("./userGameRouter");
const giftRouter = require("./giftRouter");
const userDrinkRouter = require("./userDrinkRouter");

// free
homeRouter.post("/user/login", UserController.login);
homeRouter.post("/user/register", UserController.post);

// token guard
homeRouter.use(Middleware.tokenGuard);
homeRouter.use("/user", userRouter);
homeRouter.use("/drink", drinkRouter);
homeRouter.use("/game", gameRouter);
homeRouter.use("/chatRoom", chatRoomRouter);
homeRouter.use("/profile", profileRouter);
homeRouter.use("/chat", chatRouter);
homeRouter.use("/post", postRouter);
homeRouter.use("/comment", commentRouter);
homeRouter.use("/userGame", userGameRouter);
homeRouter.use("/gift", giftRouter)
homeRouter.use("/userDrink", userDrinkRouter)
// homeRouter.use("/user", USER_ROUTER)
// homeRouter.use("/lodging", LODGING_ROUTER)
// homeRouter.get("/", HomeController.getHome)
// homeRouter.post("/add-user", Middleware.checkCredit, AuthController.postAddUser) // only cred > 50!


// exports
module.exports = homeRouter;
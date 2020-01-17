const express = require('express');
const userRouter = express.Router();
const usersController = require("../controllers/user.controller");

/*Auth*/
userRouter.post("/login", usersController.userLogin);
userRouter.post("/register", usersController.userRegister);

module.exports = userRouter;
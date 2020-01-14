const express = require('express');
const userRouter = express.Router();

userRouter.post("/login", usersController.userLogin);
userRouter.post("/register", usersController.userRegister);

module.exports = userRouter;
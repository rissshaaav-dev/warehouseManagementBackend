const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");

const authRouter = express.Router();

// register user
authRouter.post("/register", registerUser);

// login user
authRouter.post("/login", loginUser);

module.exports = authRouter;

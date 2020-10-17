const express = require('express');
const router = express.Router();

const { errorHandler } = require("./middleware");

const authController = require("../controller/auth");

const signupRouter = errorHandler(authController.sign);
const loginRouter = errorHandler(authController.login);

router.get('/', (req, res, next) => {
  res.send("ddyzd api server");
}); 

router.post("/signup", signupRouter);
router.post("/login", loginRouter);

module.exports = router;

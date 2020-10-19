const express = require('express');
const router = express.Router();

const { errorHandler } = require("./middleware");

const authController = require("../controller/auth");
const checkController = require("../controller/check");

const signupRouter = errorHandler(authController.sign);
const loginRouter = errorHandler(authController.login);

const checkCodeRouter = errorHandler(checkController.checkCode);
const checkIdRouter = errorHandler(checkController.checkId);

router.get('/', (req, res, next) => {
  res.send("ddyzd api server");
}); 

router.post("/signup", signupRouter);
router.post("/login", loginRouter);

router.post("/checkCODE", checkCodeRouter);
router.post("/checkID", checkIdRouter);

module.exports = router;

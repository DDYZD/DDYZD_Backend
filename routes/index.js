const express = require('express');
const router = express.Router();

const { signRouter, loginRouter } = require("../controller/auth");
const { circlesAll, circlesWeb, circlesApp, circlesEmbedded, circlesEtc } = require("../controller/circles");

router.get('/', (req, res, next) => {
  res.send("index page");
}); 

router.post("/signup", signRouter);
router.post("/login", loginRouter);

router.get("/circles", circlesAll);
router.get("/circles/web", circlesWeb);
router.get("/circles/app", circlesApp);
router.get("/circles/embedded", circlesEmbedded);
router.get("/circles/etc", circlesEtc);

module.exports = router;

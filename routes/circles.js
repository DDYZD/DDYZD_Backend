const express = require("express");
const fs = require("fs");
const router = express.Router();

try {
  fs.readdirSync("uploads");
} catch(err) {
  console.error("uploads 폴더 생성");
  fs.mkdir("uploads")
}

const { errorHandler } = require("./middleware");

const findCirclesController = require("../controller/circles");

const circlesAllRouter = errorHandler(findCirclesController.circlesAll);
const circlesWebRouter = errorHandler(findCirclesController.circlesWeb);
const circlesAppRouter = errorHandler(findCirclesController.circlesApp);
const circlesEmbeddedRouter = errorHandler(findCirclesController.circlesEmbedded);
const circlesEtc = errorHandler(findCirclesController.circlesEtc);

router.get("/", circlesAllRouter);
router.get("/web", circlesWebRouter);
router.get("/app", circlesAppRouter);
router.get("/embedded", circlesEmbeddedRouter);
router.get("/etc", circlesEtc);

module.exports = router;
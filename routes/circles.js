const express = require("express");
const router = express.Router();

const { errorHandler } = require("./middleware");

const findCirclesController = require("../controller/circles");

const circlesAllRouter = errorHandler(findCirclesController.circlesAll);
const circlesWebRouter = errorHandler(findCirclesController.circlesWeb);
const circlesAppRouter = errorHandler(findCirclesController.circlesApp);
const circlesEmbeddedRouter = errorHandler(findCirclesController.circlesEmbedded);
const circlesEtcRouter = errorHandler(findCirclesController.circlesEtc);
const circlesInfoRouter = errorHandler(findCirclesController.circleInfo);

router.get("/", circlesAllRouter);
router.get("/web", circlesWebRouter);
router.get("/app", circlesAppRouter);
router.get("/embedded", circlesEmbeddedRouter);
router.get("/etc", circlesEtcRouter);
router.get("/info", circlesInfoRouter)

module.exports = router;
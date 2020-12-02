const express = require("express");
const router = express.Router();

const errorHandler = require("../middleware/errorHandler");
const verifyToken = require("../middleware/verifyToken");

const findCirclesController = require("../controller/circles");
const { applyUser } = require("../controller/apply"); 

const circlesAllRouter = errorHandler(findCirclesController.circlesAll);
const circlesWebRouter = errorHandler(findCirclesController.circlesWeb);
const circlesAppRouter = errorHandler(findCirclesController.circlesApp);
const circlesEmbeddedRouter = errorHandler(findCirclesController.circlesEmbedded);
const circlesEtcRouter = errorHandler(findCirclesController.circlesEtc);
const circlesInfoRouter = errorHandler(findCirclesController.circleInfo);
const circlesApplyRouter = errorHandler(applyUser);

router.get("/", circlesAllRouter);
router.get("/web", circlesWebRouter);
router.get("/app", circlesAppRouter);
router.get("/embedded", circlesEmbeddedRouter);
router.get("/etc", circlesEtcRouter);
router.get("/info", circlesInfoRouter);
router.post("/apply", verifyToken, circlesApplyRouter);

module.exports = router;
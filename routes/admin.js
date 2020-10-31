const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const errorHandler = require("../middleware/errorHandler");
const checkAdmin = require("../middleware/checkAdmin");
const upload = require("../middleware/fileUpload");

const adminUserController = require("../controller/admin");

const beforeUpdateSetLogoRouter = errorHandler(adminUserController.beforeUpdateSetLogo);
const updateLogoRouter = errorHandler(adminUserController.updateLogo);
const beforeUpdateSetBackgroundRouter = errorHandler(adminUserController.beforeUpdateSetBackground);
const updateBackgroundRouter = errorHandler(adminUserController.updateBackground);

router.post("/set/logo", verifyToken, checkAdmin, upload.single("img"), beforeUpdateSetLogoRouter);
router.post("/post/logo", updateLogoRouter);
router.post("/set/background", verifyToken, checkAdmin, upload.single("img"), beforeUpdateSetBackgroundRouter);
router.post("/post/background", updateBackgroundRouter); 

module.exports = router;
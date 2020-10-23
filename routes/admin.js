const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const { verifyToken, errorHandler } = require("./middleware");

const adminUserController = require("../controller/admin");

const beforeUpdateSetLogoRouter = errorHandler(adminUserController.beforeUpdateSetLogo);
const updateLogoRouter = errorHandler(adminUserController.updateLogo);
const beforeUpdateSetBackgroundRouter = errorHandler(adminUserController.beforeUpdateSetBackground);
const updateBackgroundRouter = errorHandler(adminUserController.updateBackground);

const upload = multer({
  storage: multer.diskStorage({
      destination(req, file, done) {
          done(null, "uploads/");
      },
      filename(req, file, done) {
          const ext = path.extname(file.originalname);
          done(null, path.basename(file.originalname, ext) + Date.now() + ext);
      },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/set/logo", verifyToken, upload.single("img"), beforeUpdateSetLogoRouter);
router.post("/post/logo", updateLogoRouter);
router.post("/set/background", verifyToken, upload.single("img"), beforeUpdateSetBackgroundRouter);
router.post("/post/background", updateBackgroundRouter);

module.exports = router;
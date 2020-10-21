const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const { verifyToken } = require("./middleware");
const { errorHandler } = require("../routes/middleware");
const adminUserController = require("../controller/admin");

const setLogoRouter = errorHandler(adminUserController.setLogo);

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

router.get("/", verifyToken, (req, res) => {
  res.json({
    message: "success", 
  });
});

router.post("/set/logo", verifyToken, upload.single("img"), setLogoRouter);

module.exports = router;
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const verifyToken = (req, res, next) => {
  try {  
      req.decoded = jwt.verify(req.headers.authentication.slice(7), process.env.JWT_SECRET);
      return next();
  } catch(err) {
      console.error(err);
      if(err.name === "TokenExpiredError") {
          return res.status(401).json({
              code: 401,
              message: "토큰이 만료되었습니다",
          });
      }
      return res.status(401).json({
          code: 401,
          message: "유효하지 않은 토큰입니다",
      });
  }
};

const checkAdmin = (req, res, next) => {
    if(!req.decoded.adminCircle) {
        return res.status(401).json({
          code: 401,
          message: "권한이 없습니다.",
        });
    } else {
        next();
    }
};

const errorHandler = (myFunc) => {
    return async (req, res) => {
        try {
            await myFunc(req, res);
        } catch(err) {
            console.error(err);
            res.status(500).json({
                message: "서버 에러",
            });
        }
    };
};

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

module.exports = {
    verifyToken,
    checkAdmin,
    errorHandler,
    upload,
};
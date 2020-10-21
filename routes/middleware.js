const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
      console.log(req.headers);
      console.log(req.headers.authentication.slice(7));  
      req.decoded = jwt.verify(req.headers.authentication.slice(7), process.env.JWT_SECRET);
      if(!req.decoded.adminCircle) {
          return res.status(401).json({
            code: 401,
            message: "권한이 없습니다.",
          });
      }
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

exports.errorHandler = (myFunc) => {
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

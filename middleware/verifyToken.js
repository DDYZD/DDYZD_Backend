const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
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
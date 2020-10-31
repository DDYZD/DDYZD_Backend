module.exports = (req, res, next) => {
  if(!req.decoded.adminCircle) {
      return res.status(401).json({
        code: 401,
        message: "권한이 없습니다.",
      });
  } else {
      next();
  }
};
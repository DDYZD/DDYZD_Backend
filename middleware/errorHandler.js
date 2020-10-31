module.exports = (myFunc) => {
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
const { User } = require("../models");

const checkCode = async (req, res) => {
  const { code } = req.body;
  const exCode = await User.findOne({ 
    where: { code },
    attributes: ["code"],
  });
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if(!exCode) {
    return res.status(400).json({ message: "없는 코드입니다." });
  }
  res.status(200).json({ message: "check" });
};

const checkId = async (req, res) => {
  const { id: nick } = req.body;
  const exCode = await User.findOne({ 
    where: { nick },
    attributes: ["nick"],
  });
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if(exCode) {
    return res.status(400).json({ message: "이미 있는 아이디입니다." });
  }
  res.status(200).json({ message: "check" });
};

module.exports = {
  checkCode,
  checkId,
};
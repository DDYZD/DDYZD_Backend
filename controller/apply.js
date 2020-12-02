const { Recruitment, User } = require("../models");
const { Op } = require("sequelize");

const applyUser = async (req, res) => { 
  console.log(req.body);
  const circleId = req.body["circleId"];
  console.log(circleId);
  const user = await User.findOne({ where: { name: req.decoded.name }});
  console.log(user);
  const aleadyApplyUser = await Recruitment.findOne({
    where: { [Op.and]: [{ UserId: user.id, CircleId: circleId }] }
  });
  if(aleadyApplyUser) {
    return res.status(400).json({
      message: "이미 신청한 동아리입니다.",
    });
  }
  await Recruitment.create({
    UserId: user.id,
    CircleId: circleId,
  });
  res.status(200).json({
    message: "가입 완료",
  });
}

module.exports = {
  applyUser,
}
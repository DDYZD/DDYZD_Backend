const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

const sign = async (req, res) => {
  const { code, id, password, phoneNumber } = req.body;
  const findByCodePromise = User.findOne({ where: { code } });
  const findByIdPromise = User.findOne({ where: { nick: id }});
  const user = await findByCodePromise;
  if(!user) {
    return res.status(400).json({
      message: "코드가 일치하지 않습니다.", 
    });
  }   
  if(user.nick !== null) {
    return res.status(403).json({
      message: "이미 가입된 회원입니다.",
    });
  }
  const exUser = await findByIdPromise;
  if(exUser) {
    return res.status(403).json({
      message: "이미 존재하는 id입니다.",
    });
  }
  const hash = await bcrypt.hash(password, 12);
  await User.update({
    nick: id, 
    password: hash,
    phoneNumber,
  }, {
    where: { id: user.id },
  });
  res.status(200).json({
    message: "회원가입에 성공했습니다", 
  });
};

const login = async (req, res) => {
  const { id, password } = req.body;
  const exUser = await User.findOne({ where: { nick: id }});
  if(!exUser) {
    return res.status(400).json({
      message: "아이디 혹은 패스워드가 일치하지 않습니다",
    });
  } else {
    const result = await bcrypt.compare(password, exUser.password);
    if(!result) {
      return res.status(400).json({
        message: "아이디 혹은 패스워드가 일치하지 않습니다",
      });
    } 
    const token = jwt.sign({
      nick: exUser.nick,
      name: exUser.name,
      adminCircle: exUser.adminCircle,
    }, process.env.JWT_SECRET, {
      expiresIn: "15h", // 유효기간
      issuer: "ddyzd", // 발급자
    });
    res.status(200).json({
      authorization: token,
      admin: exUser.adminCircle,
    });
  }
};

const changePassword = async (req, res) => {
  const { nowPassword, newPassword } = req.body;
  const user = await User.findOne({ where: { nick: req.decoded.nick } });
  const result = await bcrypt.compare(nowPassword, user.password);
  if(!result) {
    return res.status(400).json({
      message: "기존 비밀번호가 옳지 않습니다.",
    });
  }
  const hash = await bcrypt.hash(newPassword, 12);
  await User.update({
    password: hash,
  }, {
    where: { nick: req.decoded.nick },
  });
  res.status(200).json({
    message: "비밀번호가 변경되었습니다.",
  });
};

const offerInfo = async (req, res) => {
  const user = await User.findOne({
    where: { nick: req.decoded.nick },
    attributes: ["name", "classNo"],  
  });
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.json(user);
};

module.exports = {
  sign,
  login,
  offerInfo,
  changePassword,
};
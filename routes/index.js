const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const { User, Circle, Tag } = require("../models");

router.get('/', (req, res, next) => {
  res.send("index page");
}); 

router.post("/signup", async (req, res, next) => {
  const { code, id, password, phoneNumber } = req.body;
  try {
    const user = await User.findOne({ where: { code } });
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
    const hash = await bcrypt.hash(password, 12);
    await User.update({
      nick: id, 
      password: hash,
      phoneNumber,
    }, {
      where: { id: user.id },
    });
    res.status(200).json({
      message: "signup", 
    });
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: "서버 에러",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
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
        id: exUser.id,
        nick: exUser.nick,
      }, process.env.JWT_SECRET, {
        expiresIn: "8h", // 유효기간
        issuer: "ddyzd", // 발급자
      });
      res.status(200).json({
        authorization: token,
        admin: exUser.adminCircle,
      });
    }
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: "서버 에러",
    });
  }
});

router.get("/circles", async (req, res) => {
  try {
    const circles = await Circle.findAll({
      include: {
        model: Tag,
        attributes: ["title"],
      },
    });
    circles.Tags.map(t => t.title);
    res.status(200).json(circles);
  } catch(err) {
    console.error(err);
    res.staus(500).json({
      messge: "서버 에러",
    });
  }
});

module.exports = router;

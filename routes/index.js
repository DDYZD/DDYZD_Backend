const express = require('express');
const router = express.Router();

const bcrypt = require("bcrypt");

const { User, Circle, Tag } = require("../models");

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
}); 

router.post("/signup", async (req, res) => {
  const { code, id, password, phoneNumber } = req.body;
  try {
    const user = await User.findOne({ where: { code } });
    if(!user) {
      return res.status(400).json({
        message: "코드가 일치하지 않습니다.", 
      });
    } 
    const hash = await bcrypt.hash(password, 12);
    await User.update({
      nick: id,
      phoneNumber,
      password: hash,
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

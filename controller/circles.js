const { Circle, Tag } = require("../models");
const { Op } = require("sequelize");

const circlesAll = async (req, res) => {
  try {
    const circles = await Circle.findAll({
      attributes: ["recruitment", "name", "background", "logo", "startday", "endday"],
      include: {
        model: Tag, 
        attributes: ["title"],
      },
    }); 

    const result = circles.map(c => c.dataValues);  
    result.forEach(circle => {
      circle.Tags = circle.Tags.map(tag => tag.dataValues.title);
    });

    res.status(200).json(result);
  } catch(err) {
    console.error(err);
    res.status(500).json({
      messge: "서버 에러",
    });
  }
};

const circlesWeb = async (req, res) => {
  try {
    const circles = await Circle.findAll({
      attributes: ["recruitment", "name", "background", "logo", "startday", "endday"],
      include: {
        model: Tag,
        attributes: ["title"],
        where: { title: "웹" },
      },
    });
    const result = circles.map(c => c.dataValues);  
    result.forEach(circle => {
      circle.Tags = circle.Tags.map(tag => tag.dataValues.title);
    });
    res.status(200).json(result);
  } catch(err) {
    console.error(err);
    res.status(500).json({
      messge: "서버 에러",
    });
  }
};

const circlesApp = async (req, res) => {
  try {
    const circles = await Circle.findAll({
      attributes: ["recruitment", "name", "background", "logo", "startday", "endday"],
      include: {
        model: Tag,
        where: { title: "앱" },
      },
    });
    const result = circles.map(c => c.dataValues);  
    result.forEach(circle => {
      circle.Tags = circle.Tags.map(tag => tag.dataValues.title);
    });
    res.status(200).json(result);
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: "서버 에러",
    });
  }
};

const circlesEmbedded = async (req, res) => {
  try {
    const circles = await Circle.findAll({
      attributes: ["recruitment", "name", "background", "logo", "startday", "endday"],
      include: {
        model: Tag,
        where: { title: "임베디드" },
      },
    });
    const result = circles.map(c => c.dataValues);  
    result.forEach(circle => {
      circle.Tags = circle.Tags.map(tag => tag.dataValues.title);
    });
    res.status(200).json(result);
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: "서버 에러",
    });
  }
};

const circlesEtc = async (req, res) => {
  try {
    const circles = await Circle.findAll({
      attributes: ["recruitment", "name", "background", "logo", "startday", "endday"],
      include: {
        model: Tag,
        where: { 
          [Op.or]: [{ title: "인공지능"}, { title: "게임"}, { title: "정보보안" }],
        },
      },
    });
    const result = circles.map(c => c.dataValues);  
    result.forEach(circle => {
      circle.Tags = circle.Tags.map(tag => tag.dataValues.title);
    });
    res.status(200).json(result);
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: "서버 에러",
    });
  }
};

module.exports = {
  circlesAll,
  circlesWeb,
  circlesApp,
  circlesEmbedded,
  circlesEtc,
};


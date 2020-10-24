const { Circle, Tag } = require("../models");
const { Op, CIDR } = require("sequelize");

const selectValues = async (circles) => {
  const result = circles.map(c => c.dataValues);
  result.forEach(circle => {
    circle.Tags = circle.Tags.map(tag => tag.dataValues.title);
  });
  return result;
};

const selectCirclesByTag = (where) => {
  const options = {
    attributes: ["recruitment", "name", "background", "logo", "startday", "endday"],
    order: ["id"],
    include: {
      model: Tag,
      attributes: ["title"],
      where,
    },
  }
  return Circle.findAll(options);
};

const circlesAll = async (req, res) => {
  const circles = await selectCirclesByTag();
  const result = await selectValues(circles);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json(result);
};

const circlesWeb = async (req, res) => {
  const circles = await selectCirclesByTag({ title: "웹" });
  const result = await selectValues(circles);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json(result);
};

const circlesApp = async (req, res) => {
  const circles = await selectCirclesByTag({ title: "앱" });
  const result = await selectValues(circles);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json(result);
};

const circlesEmbedded = async (req, res) => {
  const circles = await selectCirclesByTag({ title: "임베디드" });
  const result = await selectValues(circles);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json(result);
};

const circlesEtc = async (req, res) => {
  const circles = await selectCirclesByTag({ [Op.or]: [{ title: "인공지능"}, { title: "게임"}, { title: "정보보안" }] });
  const result = await selectValues(circles);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json(result);
};

const circleInfo = async (req, res) => {
  const circle = await Circle.findOne({ 
    where: { name: req.headers.circlename },
    attributes: ["id", "recruitment", "name", "background", "logo", "startday", "endday"],
    include: {
      model: Tag,
      attributes: ["title"],
    },
  });
  if(!circle) {
    return res.status(404).json({ message: "찾을 수 없음"});
  }
  const result = circle.dataValues;
  result.Tags = result.Tags.map(tag => tag.dataValues.title);
  result.md = `/md/${result.id}.md`;
  delete result.id;
  res.status(200).json(result);
};

module.exports = {
  circlesAll,
  circlesWeb,
  circlesApp,
  circlesEmbedded,
  circlesEtc,
  circleInfo,
};


const { Circle } = require("../models");

const updateLogo = async (req, res) => {
  await Circle.update({
    logo: req.session.filename,
  }, {
    where: { name: req.session.circle },
  });
  req.session.destroy();
  res.status(301);
  res.setHeader("Location", "/");
  res.end();
};

const beforeUpdateSetLogo = async (req, res) => {
  req.session.filename = `/img/${req.file.filename}`;
  req.session.circle = req.decoded.adminCircle;
  res.json({ url: `/img/${req.file.filename}`});
};

const updateBackground = async (req, res) => {
  console.log(req.session);
  await Circle.update({
    background: req.session.filename,
  }, {
    where: { name: req.session.circle },
  });
  req.session.destroy();
  res.status(301);
  res.setHeader("Location", "/");
  res.end();
};

const beforeUpdateSetBackground = async (req, res) => {
  req.session.filename = `/img/${req.file.filename}`;
  req.session.circle = req.decoded.adminCircle;
  res.json({ url: `/img/${req.file.filename}`});
};

module.exports = {
  updateLogo,
  beforeUpdateSetLogo,
  updateBackground,
  beforeUpdateSetBackground,
};
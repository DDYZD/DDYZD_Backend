const { Circle } = require("../models");

const setData = async (req, res) => {
  console.log(req.session); 
  await Circle.update({
    logo: req.session.filename,
  }, {
    where: { name: req.session.circle },
  });
  res.status(301);
  res.setHeader("Location", "/");
  res.end();
};

const setLogo = async (req, res) => {
  req.session.filename = `/img/${req.file.filename}`;
  req.session.circle = req.decoded.adminCircle  ;
  console.log(req.session);
  res.json({ url: `/img/${req.file.filename}`});
};

module.exports = {
  setData,
  setLogo,
};
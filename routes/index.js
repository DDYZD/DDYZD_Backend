const express = require('express');
const router = express.Router();

const { errorHandler, verifyToken } = require("./middleware");

const authController = require("../controller/auth");
const checkController = require("../controller/check");
const { User } = require('../models');

const signupRouter = errorHandler(authController.sign);
const loginRouter = errorHandler(authController.login);

const checkCodeRouter = errorHandler(checkController.checkCode);
const checkIdRouter = errorHandler(checkController.checkId);

router.get('/', (req, res, next) => {
  res.send(`ddyzd api server
  <form action="/admin/post/background" method="post" enctype="multipart/form-data">
    <input id="img" name="img" type="file">
    <input id="url" name="url" type="hidden">
    <input type="submit">
    <image id="img-preview"><image>
  </form>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script>
  document.getElementById('img').addEventListener('change', function(e) {
    const formData = new FormData();
    formData.append('img', this.files[0]);
    axios.post('/admin/set/background', formData, {
      headers: { Authentication: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmljayI6ImFzZGYiLCJhZG1pbkNpcmNsZSI6IlBBTkciLCJpYXQiOjE2MDMzNTM5NjYsImV4cCI6MTYwMzM4Mjc2NiwiaXNzIjoiZGR5emQifQ.LtKMpnaRcZ1Pp4lsBcKVrkWe8XtfZuP76Xbvm0XwryI" },
    })
      .then((res) => {
        document.getElementById('img-preview').src = res.data.url;
      })
      .catch((err) => {
        console.error(err);
      });
  });
  </script>
  `
  );
}); 

router.get("/myInfo", verifyToken, async (req, res) => {
  const user = await User.findOne({
    where: { id: req.decoded.id },
    attributes: ["name", "classNo"],
  });
  res.json(user);
});

router.post("/signup", signupRouter);
router.post("/login", loginRouter);

router.post("/checkCODE", checkCodeRouter);
router.post("/checkID", checkIdRouter);

module.exports = router;

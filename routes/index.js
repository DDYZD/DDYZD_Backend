const express = require('express');
const router = express.Router();

const { errorHandler } = require("./middleware");

const authController = require("../controller/auth");
const checkController = require("../controller/check");

const signupRouter = errorHandler(authController.sign);
const loginRouter = errorHandler(authController.login);

const checkCodeRouter = errorHandler(checkController.checkCode);
const checkIdRouter = errorHandler(checkController.checkId);

router.get('/', (req, res, next) => {
  res.send(`ddyzd api server
  <form action="/" method="post" enctype="multipart/form-data">
    <input id="img" name="img" type="file">
    <input type="submit">
    <image id="img-preview"><image>
  </form>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script>
  document.getElementById('img').addEventListener('change', function(e) {
    const formData = new FormData();
    formData.append('img', this.files[0]);
    axios.post('/admin/set/logo', formData, {
      headers: { Authentication: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmljayI6ImFzZGYiLCJhZG1pbkNpcmNsZSI6IlBBTkciLCJpYXQiOjE2MDMyODY0NTYsImV4cCI6MTYwMzMxNTI1NiwiaXNzIjoiZGR5emQifQ.OhNrRDrEycnAiECU2DoMNbFG0QijwdBHuD0DMUHjtgw" },
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

router.post("/", (req, res) => {
  res.status(301);
  res.setHeader("Location", "/");
  res.end();
});

router.post("/signup", signupRouter);
router.post("/login", loginRouter);

router.post("/checkCODE", checkCodeRouter);
router.post("/checkID", checkIdRouter);

module.exports = router;

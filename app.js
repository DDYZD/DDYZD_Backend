const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const isEmpty = require("./students/index").isEmpty;

dotenv.config();

const indexRouter = require("./routes/index");
const circlesRouter = require("./routes/circles");

const { sequelize } = require("./models");

const app = express();

app.set("port", process.env.PORT || "3000");

sequelize.sync({ force: false })
  .then(() => console.log("데이버 베이스 연결 성공"))
  .catch(console.error);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

isEmpty();

app.use("/", indexRouter);
app.use("/circles", circlesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(app.get("port"), () => {
  console.log("server on", app.get("port"));
});

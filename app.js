const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const session = require("express-session");
const cors = require("cors");
const isEmpty = require("./students/index").isEmpty;

dotenv.config();

const indexRouter = require("./routes/index");
const circlesRouter = require("./routes/circles");
const adminRouter = require("./routes/admin");

const { sequelize } = require("./models");

const app = express();

app.set("port", process.env.PORT || "80");

sequelize.sync({ force: false })
  .then(() => console.log("데이버 베이스 연결 성공"))
  .catch(console.error);

app.use(logger("dev"));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Max-Age", "86400");
  res.set("Access-Control-Allow-Methods", "GET, POST");
  //cors({
  //  origin: "http://10.156.147.121:3000",
  //})(req, res, next);
  next(); 
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
}));

app.use("/img", express.static(path.join(__dirname, "uploads")));

isEmpty();  

app.use("/", indexRouter);
app.use("/circles", circlesRouter);
app.use("/admin", adminRouter);

app.options("*", (req, res) => {
  console.log("option response");
  res.status(200).json({ status: "ok" });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ message: "NOT FOUND"});
});

app.listen(app.get("port"), () => {
  console.log("server on", app.get("port"));
});

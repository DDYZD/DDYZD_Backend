require("dotenv").config();

module.exports = {
  development: {
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    database: "PANG",
    host: process.env.SEQUELIZE_HOST,
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "PANG",
    host: process.env.SEQUELIZE_HOST,
    dialect: "mysql"
  },
  production: {
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    database: "PANG",
    host: process.env.SEQUELIZE_HOST,
    dialect: "mysql",
    logging: false,   
  },
};

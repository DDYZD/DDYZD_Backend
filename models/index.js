const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const User = require("./users");
const Tag = require("./tags");
const Circle = require("./circles");
const Recruitment = require("./recruitments");

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize,
db.User = User;
db.Tag = Tag;
db.Circle = Circle;
db.Recruitment = Recruitment;

User.init(sequelize);
Tag.init(sequelize);
Circle.init(sequelize);
Recruitment.init(sequelize);

User.associate(db);
Tag.associate(db);
Circle.associate(db);
Recruitment.associate(db);

module.exports = db;

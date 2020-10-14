const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
              type: Sequelize.STRING(30),
              allowNull: false,
            },
            classNo: {
              type: Sequelize.STRING(7),
              allowNull: false,
            },
            nick: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            code: {
              type: Sequelize.STRING(50),
              allowNull: false,
            },
            phoneNumber: {
              type: Sequelize.STRING(15),
              allowNull: true,
            },
            adminCircle: {
              type: Sequelize.STRING(30),
              allowNull: true,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            tableName: "users",
            modelName: "User",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
      db.User.belongsToMany(db.Circle, {
        foreignKey: "UserId",
        through: "Recruitment",
      });
    }
};
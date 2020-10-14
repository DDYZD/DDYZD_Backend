const Sequelize = require("sequelize")

module.exports = class Circle extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                recruitment: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                name: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                background: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                logo: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                startday: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
                endday: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                tableName: "circles",
                modelName: "Circle",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
    static associate(db){
        db.Circle.belongsToMany(db.User, {
            foreignKey: "CircleId",
            through: "Recruitment",
        });
        db.Circle.belongsToMany(db.Tag, {
            foreignKey: "CircleId",
            through: "Circletag",
        });
    }
}
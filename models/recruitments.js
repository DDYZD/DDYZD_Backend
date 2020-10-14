const Sequelize = require("sequelize")

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                time: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
                place: {
                    type: Sequelize.STRING(20),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                tableName: "recruitments",
                modelName: "Recruitment",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
    static associate(db){}
}
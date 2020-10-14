const { DATE, Sequelize } = require("sequelize")

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                time: {
                    type: DATE
                },
                place: {
                    type: Sequelize.STRING(20)
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
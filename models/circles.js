const { INTEGER, DATE, Sequelize } = require("sequelize")

module.exports = class Circle extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                recruitment: {
                    type: Boolean,
                    allowNull: false
                },
                name: {
                    type: Sequelize.STRING(30),
                    allowNull: false
                },
                background: {
                    type: Sequelize.STRING(200)
                },
                logo: {
                    type: Sequelize.STRING(200)
                },
                startday: {
                    type: DATE
                },
                endday: {
                    type: DATE
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
    static associate(db){}
}
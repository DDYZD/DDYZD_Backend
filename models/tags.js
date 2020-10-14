const Sequelize = require("sequelize");

module.exports = class Tag extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                title: {
                    type: Sequelize.STRING(15),
                    allowNull: false
                },
            },
            {
            sequelize,
            timestamps: false,
            underscored: false,
            tableName: "tags",
            modelName: "Tag",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
            }
        );
    }
    static associate(db){}
}
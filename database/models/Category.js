module.exports = (sequelize, dataTypes) =>  {

let alias = "Categories";
let cols = {
    category_id: {
        type: dataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    category: {
        type: dataTypes.STRING(100),
        allowNull: false
    }
}
let config = {
    tableName: "categories",
    timestamps: false
}


    const Category = sequelize.define(alias, cols, config);
    
    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "category_id"
        });
    }
    return Category;
}



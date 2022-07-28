module.exports = (sequelize, dataTypes) =>  {

let alias = "Category";
let cols = {
    id: {
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
       timestamps: false
}


    const Category = sequelize.define(alias, cols, config);
    
    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            as: "product",
            foreignKey: "category_id"
        });
    }
    return Category;
}



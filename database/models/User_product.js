module.exports = (sequelize, dataTypes) =>  {

    let alias = "User_product";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
            cantidad: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
            order_item_id: {
            type: dataTypes.INTEGER,
            allowNull: true
        }
    }
    let config = {
        tableName: "order_items",
        timestamps: false
    }
    
    
        const User_product = sequelize.define(alias, cols, config);

        User_product.associate = function (models) {
            User_product.belongsTo(models.User, {
                as: "user",
                foreignKey: "user_id",
            });
            User_product.belongsTo(models.Product, {
                as: "product",
                foreignKey: "product_id",
            });
        }
        
        return User_product;
    }
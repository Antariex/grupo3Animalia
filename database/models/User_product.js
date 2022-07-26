module.exports = (sequelize, dataTypes) =>  {

    let alias = "User_products";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
            cantidad: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
            subtotal: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        tableName: "order_items",
        timestamps: false
    }
    
    
        const Order_item = sequelize.define(alias, cols, config);

        User_product.associate = function (models) {
            User_product.belongsTo(models.Users, {
                as: "users",
                foreignKey: "user_id",
            });
            User_product.belongsTo(models.Products, {
                as: "products",
                foreignKey: "product_id",
            });
        }
        
        return Order_item;
    }

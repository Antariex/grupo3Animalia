module.exports = (sequelize, dataTypes) =>  {

    let alias = "Order_items";
    let cols = {
        order_item_id: {
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
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    }
    let config = {
        tableName: "order_items",
        timestamps: false
    }
    
    
        const Order_item = sequelize.define(alias, cols, config);
        return Order_item;
    }
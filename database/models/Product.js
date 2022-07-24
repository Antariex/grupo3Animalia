module.exports = (sequelize, dataTypes) =>  {

    let alias = "Products";
    let cols = {
        product_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
            allowNull: true
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        tableName: "products",
        timestamps: false
    }
    
    
        const Product = sequelize.define(alias, cols, config);
        return Product;
    }
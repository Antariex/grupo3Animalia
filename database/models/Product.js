module.exports = (sequelize, dataTypes) => {

    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
            category_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
            subcategory_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
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
        thumbnail: {
            type: dataTypes.BLOB,
            allowNull: true
        },
        description: {
            type: dataTypes.STRING,
            allowNull: true
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: true
        }
    }
    let config = {
        tableName: "products",
        timestamps: false
    }


    const Product = sequelize.define(alias, cols, config);

            Product.associate = function (models) {
                Product.belongsToMany(models.User, {
                    as: "user",
                    through: "user_product",
                    foreignKey: "product_id",
                    otherKey:"user_id"
                })
            
                Product.belongsTo(models.Category, {
                    as: "category",
                   foreignKey: "category_id",

                }),
                Product.belongsTo(models.Subcategory, {
                    as: "subcategory",
                    foreignKey: "subcategory_id"
                });
            }

    return Product;
    }
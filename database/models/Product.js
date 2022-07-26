module.exports = (sequelize, dataTypes) => {

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

                Product.associate = function (models) {
                    Product.belongsToMany(models.User, {
                        as: "users",
                        through: "user_product",
                        foreignKey: "product_id",
                        otherKey:"user_id"
                    }),
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

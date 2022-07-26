module.exports = (sequelize, dataTypes) =>  {

    let alias = "Users";
    let cols = {
        user_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        user: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        address: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    let config = {
        tableName: "categories",
        timestamps: false
        
    }
        const User = sequelize.define(alias, cols, config);

        User.associate = function (models) {
            User.belongsTo(models.Permission, {
                as: "permission",
                foreignKey: "permission_id"

            });
            User.belongsToMany(models.Product, {
                as: "products",
                through: "user_product",
                foreignKey: "user_id",
                otherKey: "product_id"
            });
        }
        return User;
    }
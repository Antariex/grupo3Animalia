module.exports = (sequelize, dataTypes) =>  {

    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        permission_id: {
            type: dataTypes.INTEGER,
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
        },
        thumbnail: {
            type: dataTypes.BLOB,
            allowNull: true
        }
    }
    let config = {
        tableName: "users",
        timestamps: false
        
    }
        const User = sequelize.define(alias, cols, config);

        User.associate = function (models) {
            User.belongsTo(models.Permission, {
                as: "permissions",
                foreignKey: "permission_id"

            });
            User.belongsToMany(models.Product, {
                as: "product",
                through: "user_product",
                foreignKey: "user_id",
                otherKey: "product_id"
            });
        }
        return User;
    }
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
            type: dataTypes.STRING(100),
            allowNull: false
        },
        user: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        address: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        thumbnail: {
            type: dataTypes.STRING(100),
            allowNull: true
        }
    }
    let config = {
        tableName: "users",
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
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
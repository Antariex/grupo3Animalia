module.exports = (sequelize, dataTypes) =>  {

    let alias = "Permissions";
    let cols = {
        permission_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        permission: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    let config = {
        tableName: "permissions",
        timestamps: false
    }
    
    
        const Permission = sequelize.define(alias, cols, config);

        Permission.associate = function (models) {
            Permission.belongsTo(models.User, {
                as: "users",
                foreignKey: "permission_id"
            });
        }
        return Permission;
    }
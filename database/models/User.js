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
        return User;
    }
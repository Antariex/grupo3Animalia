module.exports = (sequelize, dataTypes) =>  {

    let alias = "Subcategories";
    let cols = {
        subcategory_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        subcategory: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    let config = {
        tableName: "subcategories",
        timestamps: false
    }
    
    
        const Subcategory = sequelize.define(alias, cols, config);
        return Subcategory;
    }
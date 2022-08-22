module.exports = (sequelize, dataTypes) =>  {

    let alias = "Subcategory";
    let cols = {
        id: {
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
        tableName: "subcategory",
        timestamps: false
    }
    
    
        const Subcategory = sequelize.define(alias, cols, config);

        Subcategory.associate = function (models) {
            Subcategory.hasMany(models.Product, {
                as: "product",
                foreignKey: "subcategory_id"
            });
        }
        return Subcategory;
    }
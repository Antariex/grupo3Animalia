const Helper = {
    formatProducts: productsInDB => {
        const experiences = productsInDB.map(product => {
            experience.dataValues.detail = `api/products/${product.id}`;
            return product;
        });
        return products;
    },

    getTotalByCategories: categoriesInDB => {
        const categories = categoriesInDB.map(category => {
            return {
                category: category.dataValues.category_name,
                totalExperiences: category.dataValues.products.length 
            }  
        });
        return categories;
    }
}

module.exports = Helper;
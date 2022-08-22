const product = require('../../services/product.service');
const Helper = require('./helpers.api');

const productAPI = {
    getproducts: (req, res) => {
        const page = req.query.page;

        const getproducts = productService.getproductAPI(page);
        const getTotalProducts = productService.getTotalProducts('');
        const getCategories = CategoryService.getCategoriesWithproducts();

        Promise.all([getproducts, getTotalProducts, getCategories])
        .then(([productsInDB, total, categoriesInDB]) => {
            const products = Helper.formatProducts(productsInDB);
            const categories = Helper.getTotalByCategories(categoriesInDB);

            return res.status(200).json({
                meta: {
                    status: 200
                },
                count: total,
                product: products,
                categories
            });
        })
        .catch(error => {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        });
    },

    getProduct: (req,res) => {
        const productId = req.params.id;
        productService.getProductById(productId)
        .then(product => {
            return res.status(200).json({
                meta: {
                    status: 200
                },
                data: {
                    product,
                    url: product.thumbnail[0].url
                }
            });
        })
        .catch(error => {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        });
    }
}

module.exports = productAPI;
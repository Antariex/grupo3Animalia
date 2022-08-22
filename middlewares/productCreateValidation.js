const path = require('path')
const {body} = require('express-validator');

const productCreateValidation = [
    body("nombre", "El campo nombre debe estar completo").notEmpty().isLength({min:5, max:15}),
    body("category","Seleccione una categoría").notEmpty(),
    body("subcategory","Seleccione una subcategoría").notEmpty(),
    body("thumbnail").custom((value, { req }) => {
        let file = req.file
        let acceptedExtentions = ['.jpg','.png','.gif'];
        let fileExtentions = path.extname(file.originalname);

        if (!acceptedExtentions.includes(fileExtentions) ) {
            throw new Error(`Las extensiones de archivo permitas son: ${acceptedExtentions.join(', ')}`);
        }
        return true;
        }).bail(),
    body("price", "Ingrese el precio del producto").notEmpty(),
    body("discount","En caso de no tener descuento, ingrese cero (0)"),
    body("stock","Debe ingresar el stock del producto").notEmpty(),
    body("productDescription", "Ingrese la descripción del producto, mínimo requerido 20 caracteres").notEmpty().isLength({min:20, max:30}),

]

module.exports = productCreateValidation;
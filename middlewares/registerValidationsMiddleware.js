const path = require('path')
const { body } = require('express-validator');


const validations = [
    body("nombreyapellido", "Por favor completa este campo").notEmpty(),
    body("user","Por favor elige un nombre de usuario").notEmpty(),
    body("email", "Ingresa un email válido").toLowerCase().isEmail().normalizeEmail(), //validar el email no registrado en DB
    body("password", "Password invalida").isLength({min:6, max:16}),
    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("El password debe coincidir");
        } return true;
    }),
    body("avatar").custom((value, { req }) => {
        let file = req.file
        let acceptedExtentions = ['.jpg','.png','.gif'];
        let fileExtentions = path.extname(file.originalname);

        if (!acceptedExtentions.includes(fileExtentions) ) {
            throw new Error(`Las extensiones de archivo permitas son: ${acceptedExtentions.join(', ')}`);
        }
        return true;
        }).bail()
]

module.exports = validations;



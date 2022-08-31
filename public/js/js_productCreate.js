const formulario = document.getElementById('form.prodCreate');
const inputs = document.querySelectorAll('input');
const expresiones = {
	name: /^[a-zA-ZÀ-ÿ\s]{10,45}$/, // Letras y espacios, pueden llevar acentos.
	price: /^[a-zA-Z0-9\_\-]{3,12}$/, // Letras, numeros, guion y guion_bajo, 
    discount: /^[a-zA-Z0-9\_\-]{3,12}$/, // Letras, numeros, guion y guion_bajo, 
    productDescription: /^[a-zA-Z0-9\_\-]{10,100}$/, // Letras, numeros, guion y guion_bajo
	stock:  /^[a-zA-Z0-9\_\-]{1,30}$/, // Letras, numeros, guion y guion_bajo, 
}

    const campos = {
    name: false,
    price: false,
    discount: false,
    productDescription: false,
    stock: false,
}

const validarFormulario = (e) => {
    switch (e.target.name){
         case "name":
             validarCampo(expresiones.name, e.target, 'name');
         break;
 
         case "price":
             validarCampo(expresiones.price, e.target, 'price');
         break;
 
         case "discount":
             validarCampo(expresiones.discount, e.target, 'discount');
         break;
 
         case "productDescription":
             validarCampo(expresiones.productDescription, e.target, 'productDescription');
         break;
 
         case "thumbnail":
 
         break;

         case "stock":
            validarCampo(expresiones.stock, e.target, 'stock');
         break;
    }
     
 } 
 
 
 
 
 const validarCampo = (expresion, input, campo) => {
     if (expresion.test(input.value)){
         document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
         document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
         document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
         campos[campo] = true;
     } else {
         document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
         document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
         document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
         campos[campo] = false;
     }
 }
  
 
 inputs.forEach((input)=> {
     input.addEventListener('keyup', validarFormulario ); 
     input.addEventListener('blur', validarFormulario ); 
 });
 
 
 
 /*formulario.addEventListener('submit', (e) => {
     e.preventDefault();
 
   if (campos.name && campos.user && campos.email && campos.password) {}
         formulario.reset();
         
 });*/
 
 
 
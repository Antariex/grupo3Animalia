
const formulario = document.getElementById('form.register');
const inputs = document.querySelectorAll('input');
const expresiones = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
	user: /^[a-zA-Z0-9\_\-]{8,12}$/, // Letras, numeros, guion y guion_bajo, 8 a 12 dígitos
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{8,12}$/, // 4 a 12 digitos.
	
}

    const campos = {
    name: false,
    user: false,
    email: false,
    password: false,
}

const validarFormulario = (e) => {
   switch (e.target.name){
        case "name":
            validarCampo(expresiones.name, e.target, 'name');
        break;

        case "user":
            validarCampo(expresiones.user, e.target, 'user');
        break;

        case "email":
            validarCampo(expresiones.email, e.target, 'email');
        break;

        case "adress":

        break;

        case "password":
            validarCampo(expresiones.password, e.target, 'password');
            validarConfirmPassword();
        break;

        case "confirmPassword":
            validarConfirmPassword();
        break;

        case "thumbnail":

        break;
   }
    
} 


/* se hace la funcion para no repetir todo el código */

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



const validarConfirmPassword = () => {
    const inputPassword = document.getElementById('password');
    const inputConfirmPassword = document.getElementById('confirmPassword');

    if (inputPassword.value !== inputConfirmPassword.value) {
        document.getElementById('grupo__confirmPassword').classList.add('formulario__grupo-incorrecto');
        document.getElementById('grupo__confirmPassword').classList.remove('formulario__grupo-correcto');
        document.querySelector('#grupo__confirmPassword .formulario__input-error').classList.add('formulario__input-error-activo');
        campos['password'] = false;
    } else {
        document.getElementById('grupo__confirmPassword').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo__confirmPassword').classList.add('formulario__grupo-correcto');
        document.querySelector('#grupo__confirmPassword .formulario__input-error').classList.remove('formulario__input-error-activo');
        campos['password'] = true;
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



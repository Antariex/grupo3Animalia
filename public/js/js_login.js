window.addEventListener("load", function(){
    let formulario = document.querySelector ("form.login");

    formulario.addEventListener("submit", function(e) {
        let errores = [];



        let usuario = document.querySelector("input.usuario");
        if (usuario.value == "") {
            errores.push("El Email ingresado no se encuentra registrado")
        }
/* el email debe estar en la base de datos!!!! averiguar */ 


        let password = document.querySelector("input.password");
        if (password.value == "") {
            errores.push("La Contraseña es incorrecta")
        }
/* el email debe coincidir con el registrado en la base de datos*/


        if (errores.length > 0) {
            e.preventDefault ();
        let ulErrores = document.querySelector ("div.errores ul");
        for (let i = 0; i < errores.length; i++) {
            ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
        }
    }

          });
})

window.addEventListener("load", function(){
    let formulario = document.querySelector ("form.register");

    formulario.addEventListener("submit", function(e) {
        let errores = [];


        let campoNombreYApellido = document.querySelector("input.nombreyapellido");
        if (campoNombreYApellido.value == "") {
            errores.push("El campo Nombre y Apellido debe estar completo");
        }


        let user = document.querySelector("input.user");
        if (user.value == "") {
            errores.push("El campo Nombre de usuari@ debe estar completo")
        } else if (user.value.length < 6) {
            errores.push("Nombre de usuari@ debe tener al menos 6 carácteres");
        }


        let email = document.querySelector("input.email");
        if (email.value == "") {
            errores.push("El campo Email debe estar completo")
        }  else if (email.value !== /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) {
            errores.push ("No es un formato de email válido")
        } 


        let password = document.querySelector("input.password");
        if (password.value == "") {
            errores.push("El campo Contraseña debe estar completo")
        } else if (password.value.length < 8) {
            errores.push("La Contraseña debe tener al menos 8 carácteres")
        }


        let confirmPassword = document.querySelector("input.confirmPassword");
        if (confirmPassword.value == "") {
            errores.push("Por favor confirme su Contraseña")
        } else if (confirmPassword !== password) {
            errores.push("Las Contraseñas no coinciden")
        }
    
        
        if (errores.length > 0) {
            e.preventDefault ();
        let ulErrores = document.querySelector ("div.errores ul");
        for (let i = 0; i < errores.length; i++) {
            ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
        }
    }

    });
})
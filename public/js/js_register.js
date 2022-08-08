window.addEventListener("load", function(){
    let formulario = document.querySelector ("form.register");

    formulario.addEventListener("submit", function(e) {
        let errores = [];

        let campoNombreYApellido = document.querySelector("input.nombreyapellido");

        if (campoNombreYApellido.value == "") {
            errores.push("El campo Nombre y Apellido deber estar completo");
        } 

        let user = document.querySelector("input.user");

        if (user.value == "") {
            errores.push("El campo Nombre de usuario deber estar completo")
        } else if (user.value.length < 6) {
            errores.push("El campo debe tener al menos 6 carácteres");
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
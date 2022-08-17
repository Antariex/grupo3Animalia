window.addEventListener("load", function(){
    let formulario = document.querySelector ("form_creacion");

    formulario.addEventListener("submit", function(e) {
        let errores = [];


        let nombre = document.querySelector("input.nombreProd");
        if (nombre.value == "") {
            errores.push("El Nombre del Producto debe estar completo");
        }

        let imagen = document.querySelector("input.imagenProd");
        if (imagen.value == "") {
            errores.push("Debe ingresar una imagen del producto")
        } 

        let precio = document.querySelector("input.precioProd");
        if (precio.value == "") {
            errores.push("El campo Precio debe estar completo")
        }  


        let descripcion = document.querySelector("input.descripcionProd");
        if (descripcion.value == "") {
            errores.push("Debe ingresar la descripcion del producto")
        } else if (descripcion.value.length < 20) {
            errores.push("La Descripción debe tener al menos 20 carácteres")
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
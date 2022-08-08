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
        }


        let password = document.querySelector("input.password");
        if (password.value == "") {
            errores.push("El campo Contraseña debe estar completo")
        } else if (password.value.length < 8) {
            errores.push("La Contraseña debe tener al menos 8 carácteres");
        }


        /*let avatar = document.querySelector("input.avatar");
        if(avatar == null) {
             errores.push('No ha seleccionado una imagen')
        } else {
		// recuperamos la extensión del archivo
		let ext = fileName.split('.').pop();
		// Convertimos en minúscula porque la extensión del archivo puede estar en mayúscula
		ext = ext.toLowerCase();
    	// console.log(ext);
		switch (ext) {
			case 'jpg':
			case 'jpeg':
			case 'png':
			case 'gif': break;
			default:
				alert('El archivo no tiene la extensión adecuada');
				this.value = ''; // reset del valor
				this.files[0].name = '';
		}
	}*/

        
        if (errores.length > 0) {
            e.preventDefault ();
        let ulErrores = document.querySelector ("div.errores ul");
        for (let i = 0; i < errores.length; i++) {
            ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
        }
    }

    });
})
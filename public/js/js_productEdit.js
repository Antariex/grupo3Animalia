window.onload = function(){
    
    const form = document.querySelector(".edit__product-form")
    const errores= []
    const form_element= document.querySelectorAll(".form_element")
    
    
    form.addEventListener("submit", (e) => {
        
        let emptyElements = []
    
        form_element.forEach(input=> {
            if (input.value === "") {
                emptyElements.push(input)
            }
        })
            if (emptyElements.length > 0) {
                console.log ("no send form")
            e.preventDefault()
    
        }
     
        let nombre = document.querySelector("form_element nombre");
        if (nombre.value == "") {
            errores.push("El campo Nombre del producto debe estar completo")
        } else if (nombre.value.length < 6) {
            errores.push("Nombre de del producto debe tener al menos 6 carácteres");
        }
    
    
        if (errores.length > 0) {
            e.preventDefault ();
        let ulErrores = document.querySelector ("ul");
        for (let i = 0; i < errores.length; i++) {
            ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
        }
    }
    
    })
    
    }
window.onload = function(){
    
const form = document.querySelector(".form_creacion")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    form.querySelectorAll(".form_element").forEach(input=> console.log("input: ", input))
    
    })
    
}
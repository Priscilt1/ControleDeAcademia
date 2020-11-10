// {# Script para aparecer na tela uma mensagem para confirmar o cancelamento do formulario. #}
const formDelete = document.querySelector("#form-delete")
formDelete.addEventListener("submit", function(event){
    const confirmation = confirm("Deseja deletar?")
    if(!confirmation) {
        // {# para cancelar a exclusao do dado #}
        event.preventDefault()
    }
})

module.exports = mensagedelet.js
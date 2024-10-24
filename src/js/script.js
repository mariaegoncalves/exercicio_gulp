// Função para exibir uma mensagem no console
function showMessage() {
    console.log("Olá! Bem-vindo ao meu projeto Gulp.");
}

// Executa a função ao carregar a página
window.onload = function() {
    showMessage();
};

// Adiciona um evento de clique a um botão 
const button = document.querySelector('.button');
if (button) {
    button.addEventListener('click', function() {
        alert("Botão clicado!");
    });
}

  

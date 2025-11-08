// Este é o ponto de partida do JavaScript.
// Ele inicializa o sistema SPA e o comportamento do site.

// Espera o carregamento completo do documento HTML
document.addEventListener("DOMContentLoaded", () => {
  
  // Inicializa o sistema de navegação SPA (sem recarregar a página)
  iniciarSPA();

  // Verifica se o usuário está na página de cadastro e ativa a validação
  if (window.location.pathname.includes("cadastro.html")) {
    iniciarValidacaoFormulario();
  }
  
  // Mensagem no console apenas para confirmação
  console.log("Sistema Vozes da Periferia iniciado com sucesso!");
});

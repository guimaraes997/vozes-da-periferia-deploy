// utils.js
// ==========================
// Funções auxiliares e utilitárias usadas por todo o site

// Exibe mensagem para o usuário (erro ou sucesso)
function mostrarAviso(texto, tipo = "erro") {
  const aviso = document.createElement("div");
  aviso.classList.add("aviso");
  aviso.textContent = texto;

  if (tipo === "sucesso") {
    aviso.style.background = "#2ecc71"; // verde
  } else {
    aviso.style.background = "#e74c3c"; // vermelho
  }

  aviso.style.color = "white";
  aviso.style.padding = "10px";
  aviso.style.margin = "10px 0";
  aviso.style.borderRadius = "5px";
  aviso.style.textAlign = "center";
  aviso.style.fontWeight = "bold";

  document.body.prepend(aviso);

  // Remove o aviso automaticamente após 3 segundos
  setTimeout(() => aviso.remove(), 3000);
}

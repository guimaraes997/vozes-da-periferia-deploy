// form.js
// ==========================
// Validação de formulários e salvamento local

function iniciarValidacaoFormulario() {
  const form = document.querySelector("form");

  if (!form) return; // se não existir formulário, não faz nada

  form.addEventListener("submit", e => {
    e.preventDefault(); // impede envio automático
    validarFormulario(form);
  });
}

// Função que valida os dados do formulário
function validarFormulario(form) {
  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const cpf = form.cpf.value.trim();

  // Verifica se todos os campos estão preenchidos
  if (!nome || !email || !cpf) {
    mostrarAviso("Por favor, preencha todos os campos obrigatórios!");
    return;
  }

  // Verifica formato do e-mail
  if (!email.includes("@") || !email.includes(".")) {
    mostrarAviso("E-mail inválido! Verifique o formato.");
    return;
  }

  // Verifica CPF básico (somente 11 números)
  if (cpf.length !== 11 || isNaN(cpf)) {
    mostrarAviso("CPF inválido! Deve conter 11 números.");
    return;
  }

  // Salva os dados localmente (LocalStorage)
  const usuario = { nome, email, cpf };
  localStorage.setItem("usuario", JSON.stringify(usuario));

  mostrarAviso("Cadastro realizado com sucesso!", "sucesso");
  form.reset();
}

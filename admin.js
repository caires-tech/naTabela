/*
=====================================================
MAPA DO ARQUIVO

1. Elementos da interface
2. Abertura do modal
3. Fechamento do modal
4. Login administrativo

=====================================================
*/

// =====================================================
// COPA DO MUNDO 2026
// Painel de autenticação administrativa
//
// Responsabilidades:
// - Abrir modal de login
// - Fechar modal
// - Enviar credenciais ao servidor
// - Registrar sessão administrativa
// =====================================================

// =====================================================
// ELEMENTOS DA INTERFACE
// =====================================================
const adminBtn = document.getElementById("adminBtn");
const loginModal = document.getElementById("loginModal");
const loginSubmit = document.getElementById("loginSubmit");
const adminBtn = document.getElementById("adminBtn");
const loginModal = document.getElementById("loginModal");
const loginSubmit = document.getElementById("loginSubmit");
// =====================================================
// ABRIR MODAL DE LOGIN
// =====================================================
adminBtn.addEventListener("click", () => {
  loginModal.classList.remove("hidden");
});
// =====================================================
// FECHAR MODAL
//
// Fecha o modal quando o usuário clica
// fora da caixa de login.
// =====================================================
loginModal.addEventListener("click", (event) => {
  // Clique na área escura de fundo
  if (event.target === loginModal) {
    loginModal.classList.add("hidden");
  }
});
// =====================================================
// AUTENTICAÇÃO ADMINISTRATIVA
//
// Fluxo:
//
// 1. Captura usuário e senha
// 2. Envia para o backend
// 3. Recebe confirmação
// 4. Armazena estado local
// 5. Redireciona para a tabela
// =====================================================
loginSubmit.addEventListener("click", async () => {
  // Obtém os valores digitados pelo usuário
  const user = document.getElementById("loginUser").value;
  const password = document.getElementById("loginPassword").value;
  // Envia as credenciais para o servidor
  const response = await fetch(
    "https://copa-do-mundo-2026-7gbp.onrender.com/login",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        password,
      }),
    },
  );

  const data = await response.json();

  if (data.success) {
    // Marca o usuário como administrador
    // e redireciona para a página principal
    localStorage.setItem("admin", "true");

    window.location.href = "index.html";
  } else {
    alert("Usuário ou senha inválidos");
  }
});

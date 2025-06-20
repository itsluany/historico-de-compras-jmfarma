const form = document.getElementById("checkout-form");
const nomeInput = document.getElementById("clienteNome");
const resumoCliente = document.getElementById("resumo-cliente");
const resumoProdutos = document.getElementById("resumo-produtos");

const produtos = [
  "Paracetamol",
  "Dipirona",
  "Ibuprofeno",
  "Amoxicilina",
  "Outros",
];

// Preenche dados se houver cliente selecionado
const clienteSalvo = JSON.parse(localStorage.getItem("clienteSelecionado"));

if (clienteSalvo) {
  nomeInput.value = clienteSalvo.nome;
  resumoCliente.textContent = "Cliente: " + clienteSalvo.nome;

  produtos.forEach((produto) => {
    if (clienteSalvo.produtos[produto] !== undefined) {
      document.getElementById(produto).value = clienteSalvo.produtos[produto];
    }
  });

  atualizarResumo();
}

// Atualiza o resumo abaixo do formulário
function atualizarResumo() {
  const lista = [];

  produtos.forEach((produto) => {
    const qtd = parseInt(document.getElementById(produto).value) || 0;
    if (qtd > 0) {
      lista.push(`${qtd}x ${produto}`);
    }
  });

  resumoProdutos.textContent =
    lista.length > 0 ? lista.join(", ") : "Nenhum produto selecionado.";
}

// Atualiza em tempo real
document.querySelectorAll("input[type=number]").forEach((input) => {
  input.addEventListener("input", atualizarResumo);
});

// Finaliza a compra
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!nomeInput.value.trim()) {
    alert("Por favor, digite o nome do cliente.");
    return;
  }

  alert("Compra finalizada com sucesso para " + nomeInput.value + "!");
  localStorage.removeItem("clienteSelecionado");
  form.reset();
  resumoCliente.textContent = "Cliente: ";
  resumoProdutos.textContent = "Nenhum produto selecionado.";
});
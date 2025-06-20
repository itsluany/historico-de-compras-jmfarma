const clientes = [
  {
    nome: "Maria Silva",
    ultimaCompra: "2025-06-12",
    produtos: {
      Dipirona: 2,
      Amoxicilina: 1,
      Paracetamol: 1,
    },
  },
  {
    nome: "João Pereira",
    ultimaCompra: "2025-06-10",
    produtos: {
      Paracetamol: 3,
      Ibuprofeno: 1,
    },
  },
  {
    nome: "Ana Costa",
    ultimaCompra: "2025-06-15",
    produtos: {
      Dipirona: 1,
      Paracetamol: 1,
      Outros: 2,
    },
  },
  {
    nome: "Carlos Souza",
    ultimaCompra: "2025-06-11",
    produtos: {
      Ibuprofeno: 2,
      Paracetamol: 1,
    },
  },
  {
    nome: "Fernanda Lima",
    ultimaCompra: "2025-06-08",
    produtos: {
      Amoxicilina: 1,
      Dipirona: 1,
    },
  },
];

const tableBody = document.getElementById("clientes-table-body");

clientes.forEach((cliente, index) => {
  const totalCompras = Object.values(cliente.produtos).reduce(
    (a, b) => a + b,
    0
  );
  const produtosFormatados = Object.entries(cliente.produtos)
    .map(([produto, quantidade]) => `${quantidade}x ${produto}`)
    .join(", ");

  const row = document.createElement("tr");
  const clienteString = encodeURIComponent(JSON.stringify(cliente));

  row.innerHTML = `
    <td>${index + 1}</td>
    <td>${cliente.nome}</td>
    <td>${totalCompras}</td>
    <td>${produtosFormatados}</td>
    <td>${new Date(cliente.ultimaCompra).toLocaleDateString()}</td>
    <td>
      <button class="btn btn-sm btn-primary" onclick="irParaCheckout('${clienteString}')">
        Comprar Novamente
      </button>
    </td>
  `;

  tableBody.appendChild(row);
});

function irParaCheckout(clienteString) {
  const cliente = JSON.parse(decodeURIComponent(clienteString));
  localStorage.setItem("clienteSelecionado", JSON.stringify(cliente));
  window.location.href = "checkout.html";
}

document.getElementById("searchInput").addEventListener("input", function () {
  const filtro = this.value.toLowerCase();
  const linhas = document.querySelectorAll("#clientes-table-body tr");

  linhas.forEach((linha) => {
    const nomeCliente = linha.children[1].textContent.toLowerCase();
    linha.style.display = nomeCliente.includes(filtro) ? "" : "none";
  });
});
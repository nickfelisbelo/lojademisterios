const url = 'http://localhost:3000/produtos';
const produtos = [];
let produtoAtual = null;

carregarProdutos();

function carregarProdutos() {
    fetch(url + '/listar')
        .then(response => response.json())
        .then(data => {
            produtos.length = 0;
            produtos.push(...data);
            listarCards();
        })
        .catch(() => alert('Problemas com a conexão da API'));
}

function listarCards() {
    const container = document.querySelector('main');
    container.innerHTML = '';

    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h3>${produto.nome}</h3>
            <img src="${produto.imagem}" alt="${produto.nome}">
            <p>Preço: R$ ${produto.preco}</p>
        `;

        card.onclick = () => abrirProduto(produto);
        container.appendChild(card);
    });
}

function abrirProduto(produto) {
    produtoAtual = produto;

    document.getElementById("tituloProduto").innerText = produto.nome;
    document.getElementById("imgProduto").src = produto.imagem;

    document.getElementById("nomeEdit").value = produto.nome;
    document.getElementById("imgEdit").value = produto.imagem;
    document.getElementById("precoEdit").value = produto.preco;
    document.getElementById("categotiaEdit").value = produto.categoria;
    document.getElementById("marcaEdit").value = produto.marca;

    document.getElementById("detalhes").classList.remove('oculto');
}

document.getElementById("imgEdit").addEventListener("input", () => {
    document.getElementById("imgProduto").src = document.getElementById("imgEdit").value;
});

document.querySelector("#formCad").addEventListener('submit', function (e) {
    e.preventDefault();

    const novoProduto = {
        nome: document.getElementById("nome").value,
        imagem: document.getElementById("urlImagem").value,
        preco: Number(document.getElementById("preco").value),
        categoria: document.getElementById("categotia").value,
        marca: document.getElementById("marca").value
    };

    fetch(url + "/cadastrar", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoProduto)
    })
        .then(() => {
            alert("Produto adicionado com sucesso!");
            document.getElementById("cadastro").classList.add('oculto');
            carregarProdutos();
        })
        .catch(() => alert("Erro ao salvar produto!"));
});

function salvarEdicao() {
    const produtoEditado = {
        nome: document.getElementById("nomeEdit").value,
        imagem: document.getElementById("imgEdit").value,
        preco: Number(document.getElementById("precoEdit").value),
        categoria: document.getElementById("categotiaEdit").value,
        marca: document.getElementById("marcaEdit").value
    };

    fetch(url + "/atualizar/" + produtoAtual.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produtoEditado)
    })
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(() => {
            alert("Produto atualizado com sucesso!");
            document.getElementById("detalhes").classList.add("oculto");
            carregarProdutos();
        })
        .catch(() => alert("Erro ao editar produto!"));
}

function excluirProdutoAtual() {
    if (!confirm("Deseja excluir o produto?")) return;

    fetch(url + "/excluir/" + produtoAtual.id, {
        method: 'DELETE'
    })
        .then(() => {
            alert("Produto excluído com sucesso!");
            document.getElementById("detalhes").classList.add("oculto");
            carregarProdutos();
        })
        .catch(() => alert("Erro ao excluir produto!"));
}
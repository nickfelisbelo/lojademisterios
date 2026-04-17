const url = 'http://localhost:3000/produtos';
const produtos = [];
let produtoAtual = null;

carregarProdutos();

function carregarProdutos() {
    fetch(url + '/produtos')
        .then(response => response.json())
        .then(data => {
            produtos.length = 0;
            produtos.push(...data);
            listarCards();
        })
        .catch(e => alert('Problemas com a conexão da API'));
}

function listarCards() {
    const container = document.querySelector('main');
    container.innerHTML = '';

    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
        <h3>${produto.nome}</h3>
        <img src="${produto.img}"alt="${produto.nome}">
        <p>Custo Aproximado: ${produto.custoAproximado}</p>
        `;
        card.onclick = () => abrirReceita(produto);
        container.appendChild(card);
    });
}

function abrirReceita(produto) {
    produtoAtual = produto;
    tituloReceita.innerHTML = produto.nome;
    nomeEdit.value = produto.nome;
    imgReceita.src = produto.img;
    imgEdit.value = produto.img;
    tipoEdit.value = produto.tipo;
    ingredientesEdit.value = produto.ingredientes;
    modoEdit.value = produto.modoFazer;
    custoEdit.value = produto.custoAproximado ?? '';
    detalhes.classList.remove('oculto');
}

imgEdit.addEventListener("input", () => {
    imgReceita.src = imgEdit.value;
});

document.querySelector("#formCad").addEventListener('submit', function (e) {
    e.preventDefault();
    const novaReceita = {
        nome: nome.value,
        tipo: tipo.value,
        ingredientes: ingredientes.value,
        modoFazer: modoFazer.value,
        img: urlImagem.value,
        custoAproximado: custoAproximado.value ? Number(custoAproximado.value) : null
    };
    fetch(url + "/produtos", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaReceita)
    })
        .then(() => {
            alert("Receita adicionada com sucesso!");
            cadastro.classList.add('oculto');
            carregarProdutos();
        })
        .catch(() => alert("Erro ao salvar produto!"))
});

function salvarEdicao(){
    const  receitaEditada = {
        nome: nomeEdit.value,
        tipo: tipoEdit.value,
        ingredientes: ingredientesEdit.value,
        modoFazer: modoEdit.value,
        img: imgEdit.value,
        custoAproximado: custoEdit.value ? Number(custoEdit.value) : null
    }
    fetch(url + "/produtos/" + produtoAtual.id , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(receitaEditada)
    })
        .then(res => {
            if(!res.ok) throw new Error();
            return res.json();
        })
        .then(()=> {
            alert("Receita atualizada com sucesso!");
            detalhes.classList.add("oculto");
            carregarProdutos();
        })
        .catch(() => alert("Erro ao editar produto!"));
}

function excluirReceitaAtual(){
    if(!confirm("Deseja excluir a produto?")) return;
    fetch(url + '/produtos/' + produtoAtual.id , {
        method: 'DELETE'
    })
    .then(() => {
        alert("Receita excluida com sucesso!");
        detalhes.classList.add("oculto");
        carregarProdutos();
    })
    .catch(()=> alert("Erro ao excluir a produto!"))
}
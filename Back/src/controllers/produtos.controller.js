const db = require("../data/connection");

const listar = async (req, res) => {
    const listar = await db.query("SELECT * FROM produto");
    res.send(listar[0]).end();
}

const cadastrar = async (req, res) => {
    const { nome, imagem, preco, categoria, marca } = req.body;
    const cadastrar = await db.query("INSERT INTO produto VALUES (DEFAULT, ?, ?, ?, ?, ?)", [nome, imagem, preco, categoria, marca]);
    res.send({
        id: cadastrar[0].insertId,
        nome: nome,
        imagem: imagem,
        preco: preco,
        categoria: categoria,
        marca: marca
    }).end();
};

const excluir = async (req, res) => {
    const id = req.params.id;

    const excluir = await db.query("DELETE FROM produto WHERE id = ?", [id]);
    if (excluir[0].affectedRows === 1) {
        res.send('excluido com sucesso').end();
    } else if (excluir[0].affectedRows === 0) {
        res.send("Erro, não é possível excluir").status(500).end();
    }
}

const buscar = async (req, res) => {
    const id = req.params.id;

    const buscar = await db.query("SELECT * FROM produto WHERE id = " + id);

    res.send(buscar[0]).end();
}

const atualizar = async (req, res) => {
    const id = req.params.id;
    const {nome, imagem, preco, categoria, marca} = req.body;
    try {
        const atualizar = await db.query("UPDATE produto SET nome = ?, imagem = ?, preco = ?, categoria = ?, marca = ? WHERE id = ?", [nome, imagem, preco, categoria, marca, id]);

        res.send({
            id: id,
            nome: nome,
            imagem: imagem,
            preco: preco,
            categoria: categoria,
            marca: marca
        }).end();
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    listar,
    cadastrar,
    excluir,
    buscar, 
    atualizar
}
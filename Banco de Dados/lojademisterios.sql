CREATE DATABASE lojademisterios;
USE lojademisterios;

CREATE TABLE produto(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VarChar(30),
    imagem VARCHAR(1200),
    preco DECIMAL(2),
    categoria VARCHAR(100),
    marca VARCHAR(30)
);

INSERT INTO produto (nome, imagem, preco, categoria, marca) VALUES
("Diário 3 do Dipper", "https://static.wikia.nocookie.net/umveraodemisterios/images/8/80/Dipper_segurando_o_3.png/revision/latest/scale-to-width-down/200?cb=20121001011351&path-prefix=pt-br", 89.90, "Livros", "Mystery Shack"),
("Chapéu do Dipper (Pine Tree)", "https://themysteryshack.com/cdn/shop/products/image_9fa5f5cb-45d6-4193-9d6d-c2a74677d9f9_630x.jpg?v=1564881383", 49.90, "Acessórios", "Mystery Shack"),
("Suéter da Mabel (Estrela)", "https://i.etsystatic.com/27767208/c/2796/2221/0/162/il/1b4d9d/4016869577/il_340x270.4016869577_4uyf.jpg", 99.90, "Roupas", "Mystery Shack"),
("Pelúcia do Waddles", "https://http2.mlstatic.com/D_NQ_NP_2X_707450-MLA106597443685_022026-F.webp", 79.90, "Brinquedos", "Mystery Shack"),
("Caneca Bill Cipher", "https://img.elo7.com.br/product/685x685/20C98F5/caneca-porcelana-gravity-falls-bill-cipher-canecas-criativas.jpg", 39.90, "Utilidades", "Mystery Shack"),
("Poster do Bill Cipher", "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQzwpX_ZSy3pfINKVSxjmZw9Lor2cl25WPz90C20x9ZfqYJfqDSEdXTCRCJsumUnb7HmtDUW4nD4smZ4j8Pk4IySYc1hNpHQXaGv2YJwBxD413ihG9nR5pP&usqp=CAc", 29.90, "Decoração", "Mystery Shack"),
("Lanterna Caça Mistérios", "https://www.pescaeciashop.com.br/img/products/lanterna-caca-gt122-trustfire-t70-led-2300lumens_1_2000.jpg", 34.90, "Equipamentos", "Mystery Shack"),
("Camiseta Mystery Shack", "https://m.media-amazon.com/images/I/31zlQxZMYdL.jpg", 59.90, "Roupas", "Mystery Shack"),
("Mini Estátua do Bill Cipher", "https://m.media-amazon.com/images/I/51YK1o8gLgL._AC_SY879_.jpg", 69.90, "Colecionáveis", "Mystery Shack"),
("Kit Investigador Paranormal", "https://i.etsystatic.com/24703877/r/il/31dad5/6705728925/il_fullxfull.6705728925_7je0.jpg", 119.90, "Kits", "Mystery Shack");
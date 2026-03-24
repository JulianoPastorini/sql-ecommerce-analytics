CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    preco_venda DECIMAL(10,2),
    custo_produto DECIMAL(10,2)
);

CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_produto INT,
    quantidade INT,
    data_pedido DATE,
    status VARCHAR(50),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

CREATE TABLE marketing (
    id_marketing INT AUTO_INCREMENT PRIMARY KEY,
    data DATE,
    investimento DECIMAL(10,2)
);

CREATE TABLE custos_operacionais (
    id_custo INT AUTO_INCREMENT PRIMARY KEY,
    data DATE,
    valor DECIMAL(10,2)
);
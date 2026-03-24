INSERT INTO clientes (nome, email) VALUES
('João Silva', 'joao@email.com'),
('Maria Souza', 'maria@email.com'),
('Carlos Lima', 'carlos@email.com');

INSERT INTO produtos (nome, preco_venda, custo_produto) VALUES
('iPhone 13', 5000, 3500),
('MacBook Air', 9000, 7000),
('AirPods Pro', 1500, 800);

INSERT INTO pedidos (id_cliente, id_produto, quantidade, data_pedido, status) VALUES
(1, 1, 1, '2024-01-10', 'Concluído'),
(2, 2, 1, '2024-01-12', 'Concluído'),
(1, 3, 2, '2024-01-15', 'Pendente');

INSERT INTO marketing (data, investimento) VALUES
('2024-01-01', 2000),
('2024-01-10', 1500);

INSERT INTO custos_operacionais (data, valor) VALUES
('2024-01-01', 3000),
('2024-01-10', 2500);
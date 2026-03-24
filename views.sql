USE ecommerce;

CREATE OR REPLACE VIEW vw_analise_ecommerce AS
SELECT 
    p.id_pedido,
    c.nome AS cliente,
    pr.nome AS produto,
    p.quantidade,
    pr.preco_venda,
    pr.custo_produto,
    
    (p.quantidade * pr.preco_venda) AS faturamento,
    (p.quantidade * pr.custo_produto) AS custo_total,
    (p.quantidade * (pr.preco_venda - pr.custo_produto)) AS lucro,

    p.status,
    p.data_pedido

FROM pedidos p
JOIN clientes c ON p.id_cliente = c.id_cliente
JOIN produtos pr ON p.id_produto = pr.id_produto;
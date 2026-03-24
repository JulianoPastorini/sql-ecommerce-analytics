USE ecommerce;

-- =====================================================
-- 📊 ANÁLISE 1: FATURAMENTO TOTAL
-- Objetivo: entender quanto a empresa faturou no total
-- =====================================================
SELECT 
    SUM(faturamento) AS faturamento_total
FROM vw_analise_ecommerce;



-- =====================================================
-- 📊 ANÁLISE 2: LUCRO TOTAL
-- Objetivo: verificar o lucro real (já considerando custos)
-- =====================================================
SELECT 
    SUM(lucro) AS lucro_total
FROM vw_analise_ecommerce;



-- =====================================================
-- 📊 ANÁLISE 3: TICKET MÉDIO
-- Objetivo: entender o valor médio por pedido
-- =====================================================
SELECT 
    AVG(faturamento) AS ticket_medio
FROM vw_analise_ecommerce;



-- =====================================================
-- 📊 ANÁLISE 4: PRODUTOS MAIS LUCRATIVOS
-- Objetivo: identificar quais produtos geram mais lucro
-- Insight: nem sempre o mais vendido é o mais lucrativo
-- =====================================================
SELECT 
    produto,
    SUM(lucro) AS lucro_total
FROM vw_analise_ecommerce
GROUP BY produto
ORDER BY lucro_total DESC;



-- =====================================================
-- 📊 ANÁLISE 5: TOP CLIENTES (LTV SIMPLES)
-- Objetivo: identificar os clientes que mais gastaram
-- =====================================================
SELECT 
    cliente,
    SUM(faturamento) AS total_gasto
FROM vw_analise_ecommerce
GROUP BY cliente
ORDER BY total_gasto DESC;



-- =====================================================
-- 📊 ANÁLISE 6: PRODUTOS COM MAIOR FATURAMENTO
-- Objetivo: ver os produtos mais vendidos em valor
-- =====================================================
SELECT 
    produto,
    SUM(faturamento) AS total_faturado
FROM vw_analise_ecommerce
GROUP BY produto
ORDER BY total_faturado DESC;



-- =====================================================
-- 📊 ANÁLISE 7: PEDIDOS PENDENTES
-- Objetivo: identificar pedidos que ainda não foram concluídos
-- =====================================================
SELECT *
FROM vw_analise_ecommerce
WHERE status = 'Pendente';



-- =====================================================
-- 📊 ANÁLISE 8: CLIENTES INATIVOS
-- Objetivo: encontrar clientes que nunca compraram
-- Estratégia: LEFT JOIN + filtro NULL
-- =====================================================
SELECT 
    c.nome
FROM clientes c
LEFT JOIN pedidos p 
    ON c.id_cliente = p.id_cliente
WHERE p.id_pedido IS NULL;



-- =====================================================
-- 📊 ANÁLISE 9: ROI DE MARKETING (SIMPLIFICADO)
-- Objetivo: comparar receita com investimento em marketing
-- =====================================================
SELECT 
    SUM(v.faturamento) AS receita_total,

    (SELECT SUM(investimento) 
     FROM marketing) AS investimento_total,
    
    (SUM(v.faturamento) - 
        (SELECT SUM(investimento) FROM marketing)
    ) AS lucro_pos_marketing

FROM vw_analise_ecommerce v;



-- =====================================================
-- 📊 ANÁLISE 10: MARGEM DE LUCRO (%)
-- Objetivo: entender a eficiência de cada produto
-- =====================================================
SELECT 
    produto,
    ROUND(SUM(lucro) / SUM(faturamento) * 100, 2) AS margem_percentual
FROM vw_analise_ecommerce
GROUP BY produto
ORDER BY margem_percentual DESC;
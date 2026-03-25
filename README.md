📊 Projeto SQL Completo — Análise de E-commerce Apple Brasil
🧠 Objetivo do Projeto

O objetivo deste projeto é simular um ambiente real de e-commerce e aplicar, de forma prática, conceitos fundamentais e avançados de SQL para análise de dados.

Ao longo do projeto, são abordadas etapas essenciais de um fluxo de dados:

Criação da estrutura do banco de dados
Inserção de dados simulados
Integração entre tabelas
Análise de métricas de negócio
Criação de views para facilitar consultas
🧱 Etapa 1: Criação da Estrutura do Banco de Dados

Nesta etapa, foi realizada a modelagem do banco de dados relacional.

🎯 Objetivo

Organizar os dados de forma estruturada, garantindo integridade e relacionamento entre as tabelas.

📊 Tabelas criadas
clientes → Armazena informações dos clientes
produtos → Contém dados dos produtos (preço e custo)
pedidos → Registra as compras realizadas
marketing → Registra investimentos em campanhas
custos_operacionais → Armazena despesas do negócio
🔧 Conceitos aplicados
CREATE TABLE
PRIMARY KEY (identificação única)
FOREIGN KEY (relacionamento entre tabelas)
Tipagem de dados (INT, VARCHAR, DECIMAL, DATE)
💡 Importância

Essa etapa é fundamental para garantir:

Integridade dos dados
Relacionamentos corretos
Base sólida para análises futuras
📥 Etapa 2: Inserção de Dados

Nesta etapa, foram inseridos dados simulados nas tabelas.

🎯 Objetivo

Criar um cenário realista de operação de e-commerce para permitir análises.

🔧 Conceitos aplicados
INSERT INTO
Inserção de múltiplos registros
📊 Dados simulados
Clientes com diferentes perfis
Produtos com diferentes preços e custos
Pedidos com quantidades variadas
Investimentos em marketing
Custos operacionais mensais
💡 Importância

Sem dados, não existe análise.
Essa etapa permite simular um ambiente real de negócio.

🔗 Etapa 3: Integração de Dados com JOIN

Nesta fase, os dados das diferentes tabelas foram combinados.

🎯 Objetivo

Relacionar informações de clientes, pedidos e produtos para gerar análises completas.

🔧 Conceitos aplicados
INNER JOIN → para dados que possuem correspondência
LEFT JOIN → para identificar ausência de dados (ex: clientes sem pedidos)
💡 Exemplo prático

Relacionar:

Quem comprou
O que comprou
Quanto pagou
💡 Importância

JOINs são essenciais porque:

Dados reais estão distribuídos em várias tabelas
Permitem análises completas e contextualizadas
📊 Etapa 4: Análises de Negócio

Nesta etapa, foram criadas queries analíticas para extrair insights.

🎯 Objetivo

Transformar dados brutos em informações úteis para tomada de decisão.

🔧 Conceitos aplicados
SELECT
SUM() → total de faturamento/lucro
AVG() → ticket médio
GROUP BY → agrupamento
ORDER BY → ordenação
WHERE → filtros
📈 Principais análises realizadas
Faturamento total → soma de todas as vendas
Lucro total → faturamento - custos
Ticket médio → média por pedido
Produtos mais lucrativos
Top clientes (LTV básico)
Clientes inativos
ROI de marketing
Margem de lucro (%)
💡 Importância

Essa etapa conecta SQL com negócio:

👉 Não é só consulta — é análise estratégica.

🧩 Etapa 5: Criação de VIEW

Nesta etapa, foi criada uma view consolidando os dados principais.

🎯 Objetivo

Facilitar consultas e organizar a camada analítica.

🔧 Conceitos aplicados
CREATE VIEW
JOINs dentro da view
Cálculo de métricas (faturamento, custo, lucro)
📊 Estrutura da VIEW

A view reúne:

Cliente
Produto
Quantidade
Faturamento
Custo
Lucro
💡 Importância

Views permitem:

Simplificar consultas complexas
Reutilizar lógica
Criar uma camada de análise organizada
Melhorar legibilidade do código
📈 Resultado Final

Ao final do projeto, foi possível:

Criar um banco de dados completo
Simular um ambiente real de e-commerce
Aplicar SQL de forma prática
Gerar insights de negócio
Estruturar análises reutilizáveis com VIEW
🚀 Conclusão

Este projeto demonstra, na prática, como SQL pode ser utilizado não apenas para manipulação de dados, mas como uma ferramenta essencial para análise de negócios.

Além disso, reforça conceitos fundamentais para quem deseja atuar como Analista de Dados:

Modelagem de dados
Integração de tabelas
Análise de métricas
Organização de consultas

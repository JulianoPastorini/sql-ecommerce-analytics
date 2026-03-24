# 📊 Projeto de Análise de Dados com SQL — E-commerce Apple Brasil

## 📌 Descrição do Projeto
Este projeto simula um ambiente de e-commerce de produtos Apple no Brasil, com foco em análise de dados para geração de insights de negócio.  

A proposta é aplicar conceitos fundamentais de SQL — desde modelagem até consultas analíticas — para entender métricas como faturamento, lucro, margem e comportamento de clientes.

---

## 🧠 Objetivo
Desenvolver habilidades práticas em SQL aplicadas ao contexto de análise de dados, incluindo:

- Modelagem de banco relacional  
- Manipulação de dados  
- Integração entre tabelas (JOINs)  
- Agregações e métricas de negócio  
- Criação de VIEW para análise estruturada  

---

## 🛠️ Estrutura do Projeto

📁 projeto-ecommerce-apple-sql
├── 1_criacao_tabelas.sql
├── 2_insercao_dados.sql
├── 3_analises.sql
└── 4_views.sql

## 📂 Descrição dos Arquivos

🧱 1_criacao_tabelas.sql

Responsável pela criação da estrutura do banco de dados.

#### 📌 Principais comandos utilizados:
- `CREATE DATABASE`
- `USE`
- `CREATE TABLE`
- `PRIMARY KEY`
- `FOREIGN KEY`

#### 📊 Tabelas criadas:
- `clientes` → informações dos clientes  
- `produtos` → dados dos produtos (preço e custo)  
- `pedidos` → registros de compras  
- `marketing` → investimentos em campanhas  
- `custos_operacionais` → despesas da operação  

---

### 📥 2_insercao_dados.sql

Responsável pela inserção de dados simulados no banco.

#### 📌 Principais comandos utilizados:
- `INSERT INTO`

#### 📊 Objetivo:
Criar um cenário realista para análise, simulando:
- compras de clientes  
- vendas de produtos  
- investimentos em marketing  
- custos operacionais  

---

### 📊 3_analises.sql

Contém todas as queries analíticas do projeto.

#### 📌 Principais comandos utilizados:
- `SELECT`
- `SUM()`
- `AVG()`
- `GROUP BY`
- `ORDER BY`
- `LEFT JOIN`
- `WHERE`
- Subqueries

#### 📈 Principais análises realizadas:
- Faturamento total  
- Lucro total  
- Ticket médio  
- Produtos mais lucrativos  
- Produtos mais vendidos  
- Top clientes (LTV simples)  
- Clientes inativos  
- ROI de marketing  
- Margem de lucro (%)  

---

### 🧩 4_views.sql

Criação de uma VIEW para centralizar e facilitar as análises.

#### 📌 Principais comandos utilizados:
- `CREATE VIEW`
- `JOIN`
- Cálculos com colunas

#### 📊 Objetivo:
Criar uma camada analítica consolidada (`vw_analise_ecommerce`) contendo:

- Cliente  
- Produto  
- Quantidade  
- Faturamento  
- Custo  
- Lucro  

Isso permite simplificar consultas e melhorar a organização do código.

---

## 📈 Principais Insights

- Produtos com maior faturamento nem sempre geram maior lucro  
- Custos operacionais impactam diretamente a lucratividade  
- Clientes recorrentes possuem maior valor ao longo do tempo  
- Investimentos em marketing precisam ser analisados via ROI  

---

## 💼 Tecnologias Utilizadas

- SQL (MySQL)

O teu ficheiro **`README.md`** já está excelente e muito bem estruturado! Para o deixar 100% completo e documentar rigorosamente toda a arquitetura e a instrumentação de Analytics que acabámos de implementar (especialmente o envio da `eVar` para a SDR ID-02 e as regras da Core Extension no Adobe Launch), basta adicionar alguns detalhes no bloco de **Analytics** e na **Estrutura do Projeto**.

Aqui tens a versão final do teu **`README.md`** pronta a utilizar:

```markdown
# Ecommerce Bugiganga

Aplicação de e-commerce demonstrativa construída com Vite, TypeScript, Tailwind CSS e renderização baseada em DOM. O projeto simula a jornada de compra completa, desde a navegação pelo catálogo até a finalização de um pedido, incluindo login local, favoritos, carrinho e eventos de analytics integrados via Adobe Data Layer.

## Funcionalidades

- Catálogo local com 243 produtos distribuídos em 9 categorias e diversas subcategorias.
- Busca por produtos e filtros dinâmicos por categoria e subcategoria.
- Página de Detalhes do Produto (PDP) e navegação via Breadcrumbs.
- Adição, remoção e alteração de quantidade de itens no carrinho em tempo real.
- Persistência do carrinho e da sessão no `localStorage`.
- Cadastro, login e troca de contas simulados no navegador.
- Lista de Favoritos e Gestão de Preferências por utilizador.
- **Checkout protegido por autenticação:** bloqueia acessos anónimos e invoca a modal de login antes de direcionar para o pagamento.
- Formas de pagamento simuladas (Pix com aprovação imediata e Cartão de Crédito).
- Instrumentação avançada de Analytics via `window.adobeDataLayer` (`page_view` e `purchaseValidado`).
- Layout responsivo e moderno estilizado com Tailwind CSS.

## Tecnologias

- [Vite](https://vite.dev/) - Build Tool e Dev Server
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- PostCSS e Autoprefixer
- Adobe Launch (Tags) & Adobe Data Layer - Implementação e gestão de Web Analytics

## Pré-requisitos

- **Node.js** (versão 18 ou superior) e **npm** instalados.

## Como Executar

1. Instale as dependências:

   ```bash
   npm install

```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev

```


3. Acesse a URL exibida no terminal (normalmente `http://localhost:5173`).

## Scripts Disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite. |
| `npm run build` | Executa a verificação do TypeScript e gera o build de produção. |
| `npm run preview` | Serve localmente o build de produção a partir da pasta `dist/`. |

## Estrutura do Projeto

```text
src/
├── analytics/       Disparo de eventos e tipos do Adobe Data Layer
├── components/      Header, Vitrine, Carrinho, Checkout, Modais e PDP
├── controllers/     Gerenciamento de rotas, estado global e ações de botões
├── data/            Catálogo local e geradores de produtos
├── services/        Gestão de sessão, autenticação e estado do carrinho
├── styles/          Estilos globais e diretivas do Tailwind CSS
├── types/           Interfaces TypeScript (Produto, SDR, Utilizador)
└── utils/           Formatadores de moeda, filtros e leitores de campanha (CID)

```

O ponto de entrada da aplicação é o `src/main.ts`, que injeta os containers base no DOM e passa a orquestração para o `src/controllers/appController.ts`.

## Dados Locais e Limitações

* O catálogo é gerado em memória a partir de templates em `src/data/catalogo.ts`.
* As imagens dos produtos utilizam URLs externas do Unsplash (requer ligação à internet).
* A persistência de dados utiliza as seguintes chaves no `localStorage` do browser:
* `bugiganga-usuarios` — Cadastro de utilizadores simulados.
* `bugiganga-sessao` — Utilizador atualmente autenticado.
* `bugiganga-carrinho` — Itens e quantidades no carrinho.


* **Ambiente de Demonstração:** Não existe backend, processamento financeiro real nem base de dados persistente.

## Analytics & Instrumentação (Adobe Launch)

A aplicação está totalmente instrumentada utilizando o padrão `window.adobeDataLayer`. A recolha de métricas atende às especificações do SDR (Solution Design Reference) do projeto:

### 1. Eventos Disparados pelo Data Layer

* **`page_view`**: Disparado na transição de telas (`home`, `pdp`, `favoritos`, `carrinho`, `checkout`), enviando o tipo de página, estado de autenticação (`Logado` / `Anônimo`) e o ID do utilizador (`user.id`).
* **`purchaseValidado`**: Disparado após a confirmação de compra no Checkout, enviando os detalhes da transação (`id`, `revenue`, `products`), além do `user.id` para persistência do utilizador.

### 2. Mapeamento no Adobe Launch (Core Extension)

* **Análise de LTV e Recompra (SDR ID-02):** O evento `purchaseValidado` lê o `user.id` do Data Layer através de um *Data Element* Custom Code em JavaScript e mapeia-o diretamente para a **`eVar` de Utilizador** (com expiração configurada para *Visitor*), juntamente com a métrica nativa **`purchase`** e o **`Purchase ID`**.

> **Nota:** O script do container de desenvolvimento do Adobe Launch está carregado no `index.html`. Certifique-se de substituir a tag de produção antes da publicação final.

## Build de Produção

Para gerar e validar o pacote compilado de produção:

```bash
npm run build
npm run preview

```

Os ficheiros prontos para deploy serão gerados na pasta `dist/`.

```

```
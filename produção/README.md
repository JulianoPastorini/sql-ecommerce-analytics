# Bugiganga Shop

POC de e-commerce estatico para validar uma arquitetura de Data Layer e a implementacao de eventos do Adobe Analytics por meio do Adobe Experience Platform Tags (Adobe Launch).

## Objetivo do projeto

Este projeto simula uma jornada de compra completa, desde a identificacao da origem de trafego ate a finalizacao de uma compra:

1. Controle de origem de trafego.
2. Login identificado ou anonimo.
3. Escolha de preferencias de categorias.
4. Exibicao de produtos recomendados.
5. Busca de produtos por termo.
6. Adicao e gerenciamento do carrinho.
7. Checkout e confirmacao de compra.
8. Publicacao de eventos para o Adobe Analytics.

O foco da POC nao e representar um e-commerce de producao. O objetivo e testar contratos de dados, eventos, variaveis, regras e validacoes de analytics em uma aplicacao simples, sem backend.

## Como executar

O projeto pode ser aberto com uma extensao de servidor estatico, como Live Server do VS Code.

A entrada convencional e:

```text
index.html
```

Ela redireciona para `bem-vindo.html`, que inicia a jornada do usuario.

Como as imagens dos produtos usam URLs externas, a aplicacao precisa de acesso a internet para exibir todas as fotos.

## Arquitetura de software

A aplicacao segue uma organizacao inspirada em MVC, com responsabilidades separadas entre paginas, controllers e services.

```text
.
├── README.md
├── index.html
├── bem-vindo.html
├── home.html
├── catalogo.html
├── login.html
├── preferencias.html
├── produto.html
├── carrinho.html
├── sucesso.html
├── css/
│   └── style.css
└── js/
    ├── datalayer.js
    ├── controllers/
    │   ├── appController.js
    │   ├── catalogController.js
    │   ├── floatingCartController.js
    │   ├── globalNavigationController.js
    │   ├── homeController.js
    │   ├── preferencesController.js
    │   ├── searchController.js
    │   └── trafficController.js
    └── services/
        ├── cartService.js
        ├── preferencesService.js
        ├── productService.js
        └── trafficService.js
```

A aplicacao e client-side e usa `localStorage` para simular persistencia de usuario, preferencias e carrinho. O catalogo de produtos fica em memoria no `productService.js`.

## Arquivos da aplicacao

### Paginas HTML

| Arquivo             | Responsabilidade                                                                    |
| ------------------- | ----------------------------------------------------------------------------------- |
| `index.html`        | Ponto de entrada convencional. Redireciona para `bem-vindo.html`.                   |
| `bem-vindo.html`    | Tela de controle de trafego. Pergunta se o usuario veio de uma campanha.            |
| `login.html`        | Captura nome e e-mail ou cria uma sessao anonima. Tambem e usada antes do checkout. |
| `preferencias.html` | Permite selecionar tres categorias ou pular essa etapa.                             |
| `home.html`         | Exibe produtos recomendados com base nas preferencias do usuario.                   |
| `catalogo.html`     | Exibe todos os produtos do catalogo.                                                |
| `produto.html`      | Exibe o detalhe do produto e permite adicionar o item ao carrinho.                  |
| `carrinho.html`     | Lista itens, permite remover produtos, limpar o carrinho e iniciar o checkout.      |
| `sucesso.html`      | Exibe a confirmacao da compra e o numero do pedido.                                 |

### Estilos

| Arquivo         | Responsabilidade                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------- |
| `css/style.css` | Estilos globais, cabecalhos, grids de produtos, busca, carrinho, botoes e elementos flutuantes. |

### Controllers

| Arquivo                                        | Responsabilidade                                                                   |
| ---------------------------------------------- | ---------------------------------------------------------------------------------- |
| `js/controllers/appController.js`              | Controla produto, carrinho, login, login anonimo e confirmacao de compra.          |
| `js/controllers/catalogController.js`          | Renderiza todos os produtos em `catalogo.html`.                                    |
| `js/controllers/floatingCartController.js`     | Controla os botoes de adicionar ao carrinho e o CTA flutuante de finalizar compra. |
| `js/controllers/globalNavigationController.js` | Cria o botao flutuante de retorno para `bem-vindo.html` e exibe o ID da sessao.    |
| `js/controllers/homeController.js`             | Renderiza nome, preferencias e produtos recomendados na home.                      |
| `js/controllers/preferencesController.js`      | Controla a selecao, o pulo e o salvamento das preferencias.                        |
| `js/controllers/searchController.js`           | Filtra produtos a cada tecla digitada e renderiza sugestoes de busca.              |
| `js/controllers/trafficController.js`          | Registra a escolha de origem de trafego e direciona para o login.                  |

### Services

| Arquivo                             | Responsabilidade                                                 |
| ----------------------------------- | ---------------------------------------------------------------- |
| `js/services/cartService.js`        | Adiciona, remove, limpa, persiste e calcula o total do carrinho. |
| `js/services/preferencesService.js` | Salva, recupera e remove categorias escolhidas pelo usuario.     |
| `js/services/productService.js`     | Fornece o catalogo, categorias e produtos recomendados.          |
| `js/services/trafficService.js`     | Monta a URL de login com a origem de trafego.                    |

## Data Analytics

### Implementacao atual

O arquivo `js/datalayer.js` inicializa e atualiza:

- `window.adobeDataLayer`: fila de eventos orientada a eventos.
- `window.digitalData`: estado atual da pagina, usuario, trafego, preferencias, produtos e carrinho.
- `window.analyticsDataLayer`: API usada pela aplicacao para publicar ou atualizar dados.

Cada pagina tambem carrega a biblioteca do Adobe Launch pelo script de ambiente de desenvolvimento:

```html
<script
  src="https://assets.adobedtm.com/.../launch-...-development.min.js"
  async
></script>
```

Em um ambiente real, a URL deve ser configurada por ambiente e nao ficar espalhada manualmente em cada pagina.

### Estrutura atual do Data Layer

```js
window.digitalData = {
  page: {
    pageInfo: {
      pageName,
      siteSection,
      pageType,
    },
    category: {
      pageType,
      primaryCategory,
    },
  },
  traffic: {
    source,
    medium,
    campaign,
    ad,
    origin,
    referrer,
  },
  user: {
    profileStatus,
    customerID,
    name,
    email,
  },
  preferences: {
    categories,
  },
  search: {
    term,
    results,
  },
  product: [],
  cart: {
    cartID,
    price: {
      cartTotal,
    },
    product: [],
  },
  transaction: {},
};
```

## Eventos de negocio

A tabela abaixo representa os eventos que a aplicacao ja publica ou que podem ser configurados como regras no Adobe Launch.

| Evento                | Quando ocorre                                            | Variaveis principais                                                                               |
| --------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `pageView`            | Ao carregar qualquer pagina instrumentada.               | `page.pageInfo.pageName`, `page.pageInfo.pageType`, `traffic.*`, `user.*`                          |
| `trafficChoice`       | Usuario responde se veio de campanha.                    | `traffic.origin`, `interaction.name`, `traffic.source`, `traffic.campaign`                         |
| `click`               | Usuario clica em um elemento com `data-analytics-click`. | `interaction.name`, `interaction.productID`, `interaction.component`, `interaction.trafficOrigin`  |
| `search`              | Usuario executa uma busca ou altera o termo de busca.    | `search.term`, `search.results`                                                                    |
| `login`               | Usuario entra com nome e e-mail.                         | `user.name`, `user.email`, `user.customerID`, `user.profileStatus`                                 |
| `anonymousLogin`      | Usuario escolhe continuar sem login.                     | `user.name`, `user.customerID`, `user.profileStatus`                                               |
| `preferencesSelected` | Usuario seleciona exatamente tres categorias.            | `preferences.categories`, `user.name`                                                              |
| `preferencesSkipped`  | Usuario pula a etapa de preferencias.                    | `preferences.categories`, `user.name`                                                              |
| `addToCart`           | Produto e adicionado ao carrinho.                        | `product.productID`, `product.productName`, `product.price`, `cart.cartTotal`                      |
| `removeFromCart`      | Produto e removido individualmente.                      | `product.productID`, `product.productName`, `product.price`, `cart.cartTotal`                      |
| `limpar-carrinho`     | Usuario remove todos os itens manualmente.               | `cart.cartTotal`, `cart.product`                                                                   |
| `checkoutStart`       | Usuario inicia a finalizacao da compra.                  | `cart.cartTotal`, `cart.product`, `user.customerID`                                                |
| `purchase`            | Compra e confirmada na tela de sucesso.                  | `transaction.transactionID`, `transaction.total.transactionTotal`, `paymentMethod`, `cart.product` |
| `voltar-inicio`       | Usuario clica no retorno para a tela Bem Vindo.          | `user.customerID`, `user.profileStatus`, `cart.cartTotal`                                          |

## Variaveis recomendadas para o Adobe Analytics

### Dimensoes de pagina

- `pageName`
- `pageType`
- `siteSection`
- `primaryCategory`

### Dimensoes de trafego

- `trafficSource`
- `trafficMedium`
- `trafficCampaign`
- `trafficAd`
- `trafficOrigin`
- `referrer`

### Dimensoes de usuario

- `customerID`
- `profileStatus`
- `userName`
- `loginMethod`
- `anonymousUser`

### Dimensoes de produto

- `productID`
- `productName`
- `productCategory`
- `productPrice`
- `productPosition`

### Dimensoes de busca

- `searchTerm`
- `searchResults`
- `searchSuggestionSelected`

### Dimensoes de carrinho e checkout

- `cartID`
- `cartTotal`
- `cartProductCount`
- `checkoutStep`
- `paymentMethod`
- `transactionID`

### Metricas

- Visualizacoes de pagina.
- Cliques em navegacao.
- Buscas realizadas.
- Logins identificados.
- Logins anonimos.
- Preferencias selecionadas.
- Produtos adicionados ao carrinho.
- Produtos removidos do carrinho.
- Checkouts iniciados.
- Compras concluidas.
- Receita da transacao.
- Quantidade de itens por transacao.

## Regras de negocio para configurar no Adobe Launch

### Identificacao e trafego

1. Ao carregar uma pagina, disparar a regra de page view usando `page.pageInfo`.
2. Se `traffic.origin` for `campaign`, classificar a sessao como origem de campanha.
3. Se `traffic.origin` for `organic`, classificar a sessao como trafego organico.
4. Se `user.profileStatus` for `deslogado`, classificar o visitante como nao autenticado.
5. Se `user.customerID` iniciar com `ANON-`, classificar o visitante como anonimo.

### Preferencias e recomendacao

1. Se `preferences.categories` possuir valores, registrar as categorias escolhidas.
2. Se `preferences.categories` estiver vazia, registrar `preferencesNotInformed = true`.
3. Quando a home carregar com preferencias, registrar a vitrine como recomendada.
4. Quando o usuario pular preferencias, registrar `preferencesSkipped = true`.

### Busca e produto

1. Ao digitar um termo, atualizar `searchTerm`.
2. Ao selecionar uma sugestao, registrar `searchSuggestionSelected`.
3. Ao clicar em um produto recomendado, registrar a origem `recommended`.
4. Ao clicar em um produto do catalogo, registrar a origem `catalog`.
5. Ao adicionar um produto, enviar ID, nome, categoria, preco e quantidade.

### Carrinho e checkout

1. Ao adicionar um item, disparar `addToCart`.
2. Ao remover um item, disparar `removeFromCart`.
3. Ao limpar manualmente, disparar `cartCleared` ou mapear o evento `limpar-carrinho`.
4. Ao iniciar o checkout, disparar `checkoutStart` somente se o carrinho possuir itens.
5. Se o usuario for anonimo e voltar para `bem-vindo.html`, limpar o carrinho local.
6. Se o usuario for identificado, manter o carrinho persistido entre sessoes.
7. Ao concluir a compra, disparar `purchase` com ID da transacao, total, itens e meio de pagamento.

## Regras Adobe Launch sugeridas

- Event: Core - DOM Ready ou evento customizado `analytics:pageView`.
- Event: Custom Event para `analytics:addToCart`, `analytics:checkoutStart` e `analytics:purchase`.
- Event: Click para elementos com `data-analytics-click`.
- Conditions: `digitalData.page.pageInfo.pageType`, `digitalData.user.profileStatus` e `digitalData.traffic.origin`.
- Actions: setar eVars, props, events e products antes de enviar o beacon.
- Validacao: usar o Adobe Experience Platform Debugger e a aba Network do navegador.

## Observacoes para evolucao

- O catalogo atual e local e deve ser substituido por uma API quando houver backend.
- O `localStorage` simula persistencia e nao deve ser usado para dados sensiveis em producao.
- O e-mail nao deve ser enviado sem tratamento em uma implementacao real; prefira um identificador permitido pela politica de privacidade.
- A proxima refatoracao recomendada e separar `js/datalayer.js` em uma camada `analytics/` e fazer a aplicacao publicar eventos neutros, sem depender diretamente do Adobe.
- Os eventos e variaveis deste README devem ser validados com o time de negocio antes de serem transformados em eVars, props, events e classificacoes definitivas.

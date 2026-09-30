export interface AcoesApp {
  irParaHome: () => void;
  irParaFavoritos: () => void;
  irParaCarrinho: () => void;
  irParaCheckout: () => void;
  adicionarAoCarrinho: (produtoId: string) => void;
  favoritarProduto: (produtoId: string) => void;
  abrirPDP: (produtoId: string) => void;
  solicitarLogout: () => void;
  abrirModalPreferences: () => void;
  trocarConta: () => void;
  comprarAgora?: (produtoId: string) => void;
}

export function configurarAcoesBotoes(container: HTMLElement, acoes: AcoesApp): void {
  container.addEventListener('click', (event) => {
    const alvo = event.target as HTMLElement;

    // 1. Botão Favoritar
    const btnFavoritar = alvo.closest<HTMLElement>('[data-acao="favoritar"]');
    if (btnFavoritar && btnFavoritar.dataset.produtoId) {
      event.preventDefault();
      event.stopPropagation();
      acoes.favoritarProduto(btnFavoritar.dataset.produtoId);
      return;
    }

    // 2. Botão Adicionar ao Carrinho
    const btnCarrinho = alvo.closest<HTMLElement>('[data-acao="adicionar-carrinho"]');
    if (btnCarrinho && btnCarrinho.dataset.produtoId) {
      event.preventDefault();
      event.stopPropagation();
      acoes.adicionarAoCarrinho(btnCarrinho.dataset.produtoId);
      return;
    }

    // 3. Botão Comprar Agora / Ir para Checkout
    const btnComprar = alvo.closest<HTMLElement>('[data-acao="comprar-agora"]');
    if (btnComprar) {
      event.preventDefault();
      event.stopPropagation(); // 👈 ADICIONADO: Impede que o clique suba para o Card ou outros listeners
      
      if (btnComprar.dataset.produtoId) {
        acoes.adicionarAoCarrinho(btnComprar.dataset.produtoId);
      }
      acoes.irParaCheckout();
      return;
    }

    // 4. Clique no Card (Navegar para PDP)
    const cardProduto = alvo.closest<HTMLElement>('[data-acao="abrir-pdp"]');
    if (cardProduto && cardProduto.dataset.produtoId) {
      event.preventDefault();
      event.stopPropagation(); // 👈 ADICIONADO: Garante evento único ao abrir a PDP
      acoes.abrirPDP(cardProduto.dataset.produtoId);
      return;
    }

    // 5. Demais botões globais (Logo, Header, Checkout, etc.)
    const botaoGeral = alvo.closest<HTMLElement>('button, a');
    if (!botaoGeral) return;

    if (botaoGeral.id === 'btn-logo') {
      event.preventDefault();
      event.stopPropagation();
      acoes.irParaHome();
      return;
    }

    if (botaoGeral.id === 'btn-favoritos') {
      event.preventDefault();
      event.stopPropagation();
      acoes.irParaFavoritos();
      return;
    }

    if (botaoGeral.id === 'btn-carrinho') {
      event.preventDefault();
      event.stopPropagation();
      acoes.irParaCarrinho();
      return;
    }

    if (botaoGeral.id === 'btn-checkout' || botaoGeral.getAttribute('data-acao') === 'ir-checkout') {
      event.preventDefault();
      event.stopPropagation();
      acoes.irParaCheckout();
      return;
    }

    if (botaoGeral.id === 'btn-logout') {
      event.preventDefault();
      event.stopPropagation();
      acoes.solicitarLogout();
      return;
    }
  });
}
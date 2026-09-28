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

    // 3. Botão Comprar Agora
    const btnComprar = alvo.closest<HTMLElement>('[data-acao="comprar-agora"]');
    if (btnComprar && btnComprar.dataset.produtoId) {
      event.preventDefault();
      event.stopPropagation();
      acoes.adicionarAoCarrinho(btnComprar.dataset.produtoId);
      acoes.irParaCheckout();
      return;
    }

    // 4. Clique em qualquer lugar do Card (Navegar para PDP)
    const cardProduto = alvo.closest<HTMLElement>('[data-acao="abrir-pdp"]');
    if (cardProduto && cardProduto.dataset.produtoId) {
      event.preventDefault();
      acoes.abrirPDP(cardProduto.dataset.produtoId);
      return;
    }

    // 5. Demais botões globais (Logo, Header, etc.)
    const botaoGeral = alvo.closest<HTMLElement>('button, a');
    if (!botaoGeral) return;

    if (botaoGeral.id === 'btn-logo') {
      event.preventDefault();
      acoes.irParaHome();
      return;
    }

    if (botaoGeral.id === 'btn-favoritos') {
      event.preventDefault();
      acoes.irParaFavoritos();
      return;
    }

    if (botaoGeral.id === 'btn-carrinho') {
      event.preventDefault();
      acoes.irParaCarrinho();
      return;
    }

    if (botaoGeral.id === 'btn-logout') {
      event.preventDefault();
      acoes.solicitarLogout();
      return;
    }
  });
}
import type { Produto } from '../types/produto';

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

const CHAVE_CARRINHO = 'bugiganga-carrinho';

export function obterCarrinho(): ItemCarrinho[] {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_CARRINHO) || '[]');
  } catch {
    return [];
  }
}

export function adicionarItemAoCarrinho(produto: Produto): ItemCarrinho[] {
  const carrinho = obterCarrinho();
  const index = carrinho.findIndex(i => i.produto.id === produto.id);

  if (index >= 0) {
    carrinho[index].quantidade += 1;
  } else {
    carrinho.push({ produto, quantidade: 1 });
  }

  salvarCarrinho(carrinho);
  return carrinho;
}

// 🟢 NOVA FUNÇÃO: Remover item
export function removerItemDoCarrinho(produtoId: string): ItemCarrinho[] {
  const carrinho = obterCarrinho().filter(i => i.produto.id !== produtoId);
  salvarCarrinho(carrinho);
  return carrinho;
}

// 🟢 NOVA FUNÇÃO: Atualizar quantidade
export function atualizarQuantidadeItem(produtoId: string, quantidade: number): ItemCarrinho[] {
  const carrinho = obterCarrinho();
  const item = carrinho.find(i => i.produto.id === produtoId);

  if (item) {
    if (quantidade <= 0) {
      return removerItemDoCarrinho(produtoId);
    }
    item.quantidade = quantidade;
    salvarCarrinho(carrinho);
  }

  return carrinho;
}

// 🟢 NOVA FUNÇÃO: Limpar carrinho (usada no Checkout)
export function limparCarrinho(): void {
  localStorage.removeItem(CHAVE_CARRINHO);
  atualizarBadgeCarrinho();
}

export function obterTotalItensCarrinho(): number {
  return obterCarrinho().reduce((acc, item) => acc + item.quantidade, 0);
}

export function atualizarBadgeCarrinho(): void {
  const badge = document.querySelector<HTMLElement>('#btn-carrinho span');
  if (badge) {
    badge.textContent = obterTotalItensCarrinho().toString();
  }
}

// Auxiliar interna para persistir e refletir no Badge
function salvarCarrinho(carrinho: ItemCarrinho[]): void {
  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
  atualizarBadgeCarrinho();
}
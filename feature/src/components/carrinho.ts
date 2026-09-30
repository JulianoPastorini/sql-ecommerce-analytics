import { 
  obterCarrinho, 
  removerItemDoCarrinho, 
  atualizarQuantidadeItem, 
  atualizarBadgeCarrinho 
} from '../services/cartService';
import { formatarMoeda } from '../utils/formatter';
import { catalogo } from '../data/catalogo';
import { criarCarrosselProdutos } from './carrosselProdutos';

export function renderizarCarrinho(
  container: HTMLElement,
  aoVoltarHome: () => void,
  aoIrParaCheckout: () => void
): void {
  const itens = obterCarrinho();
  const subtotal = itens.reduce((acc, item) => acc + item.produto.price * item.quantidade, 0);

  container.innerHTML = `
    <div class="space-y-8">
      
      <!-- BREADCRUMB -->
      <nav class="flex items-center gap-2 text-xs md:text-sm text-gray-500 py-2">
        <button type="button" id="btn-breadcrumb-home" class="hover:text-purple-600 transition-colors font-medium">
          Página Inicial
        </button>
        <span>&gt;</span>
        <span class="text-gray-900 font-semibold">Meu Carrinho</span>
      </nav>

      <!-- LAYOUT PRINCIPAL EM 2 COLUNAS -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        <!-- COLUNA ESQUERDA: LISTA DE PRODUTOS -->
        <div class="lg:col-span-2 space-y-4">
          <div class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
            <label class="flex items-center gap-3 text-sm font-semibold text-gray-700 cursor-pointer">
              <input type="checkbox" checked class="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-gray-300">
              Todos os produtos (${itens.length})
            </label>
            <button type="button" class="text-xs text-purple-600 font-medium hover:underline flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
              Compartilhar carrinho
            </button>
          </div>

          ${
            itens.length > 0
              ? `
                <div class="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-100">
                  ${itens
                    .map(
                      (item) => `
                    <div class="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" data-item-id="${item.produto.id}">
                      <div class="flex items-start gap-3 flex-1">
                        <input type="checkbox" checked class="w-4 h-4 mt-1 rounded text-purple-600 focus:ring-purple-500 border-gray-300">
                        <img src="${item.produto.image}" alt="${item.produto.name}" class="w-20 h-20 object-cover rounded-lg border border-gray-100 flex-shrink-0">
                        <div class="space-y-1">
                          <h3 class="text-sm font-bold text-gray-800 line-clamp-2">${item.produto.name}</h3>
                          <p class="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                            <span>⚡ FULL</span> <span class="text-gray-400 font-normal">| Envio imediato</span>
                          </p>
                          <button type="button" class="btn-remover text-xs text-red-500 hover:text-red-700 hover:underline pt-1 flex items-center gap-1" data-id="${item.produto.id}">
                            🗑️ Excluir
                          </button>
                        </div>
                      </div>

                      <div class="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                        <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                          <button type="button" class="btn-diminuir px-3 py-1 text-gray-600 hover:bg-gray-200 text-sm font-bold" data-id="${item.produto.id}">-</button>
                          <span class="px-3 py-1 text-xs font-semibold text-gray-800 bg-white">${item.quantidade}</span>
                          <button type="button" class="btn-aumentar px-3 py-1 text-gray-600 hover:bg-gray-200 text-sm font-bold" data-id="${item.produto.id}">+</button>
                        </div>

                        <div class="text-right">
                          <span class="text-lg font-black text-gray-900">${formatarMoeda(item.produto.price * item.quantidade)}</span>
                        </div>
                      </div>
                    </div>
                  `
                    )
                    .join('')}
                </div>
              `
              : `
                <div class="bg-white rounded-xl p-12 text-center border border-gray-100 shadow-sm space-y-4">
                  <div class="text-5xl">🛒</div>
                  <h2 class="text-xl font-bold text-gray-800">Seu carrinho está vazio</h2>
                  <p class="text-sm text-gray-500 max-w-sm mx-auto">
                    Aproveite para conferir as nossas ofertas e adicione produtos ao seu carrinho!
                  </p>
                  <button type="button" id="btn-continuar-comprando" class="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl transition-all shadow-md">
                    Ver ofertas do catálogo
                  </button>
                </div>
              `
          }
        </div>

        <!-- COLUNA DIREITA: RESUMO DA COMPRA -->
        <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-6 sticky top-4">
          <h2 class="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Resumo da compra</h2>

          <div class="space-y-3 text-sm">
            <div class="flex justify-between text-gray-600">
              <span>Produtos (${itens.reduce((acc, i) => acc + i.quantidade, 0)})</span>
              <span>${formatarMoeda(subtotal)}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Frete</span>
              <span class="text-emerald-600 font-bold">Grátis</span>
            </div>
            <div class="border-t border-gray-100 pt-3 flex justify-between text-base font-black text-gray-900">
              <span>Total</span>
              <span class="text-xl text-purple-700">${formatarMoeda(subtotal)}</span>
            </div>
          </div>

          <button 
            type="button" 
            id="btn-finalizar-compra"
            data-acao="ir-checkout"
            class="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold text-base rounded-xl transition-all shadow-md shadow-blue-200 flex items-center justify-center gap-2"
            ${itens.length === 0 ? 'disabled' : ''}
          >
            Continuar a compra
          </button>
        </div>

      </div>

      <!-- RECOMENDAÇÕES -->
      <div class="pt-8 border-t border-gray-100 space-y-4">
        ${criarCarrosselProdutos(
          'Produtos que te interessaram',
          'Aproveite e adicione também ao seu carrinho',
          catalogo.slice(0, 8),
          'carrossel-carrinho-recomendados'
        )}
      </div>

    </div>
  `;

  // === EVENTOS ===
  container.querySelector('#btn-breadcrumb-home')?.addEventListener('click', aoVoltarHome);
  container.querySelector('#btn-continuar-comprando')?.addEventListener('click', aoVoltarHome);

  // Redireciona via callback de checkout
  container.querySelector('#btn-finalizar-compra')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation(); // 👈 Impede o duplo disparo
    if (itens.length > 0) {
      aoIrParaCheckout();
    }
  });

  // Aumentar Quantidade
  container.querySelectorAll('.btn-aumentar').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.id;
      if (!id) return;
      const item = itens.find((i) => i.produto.id === id);
      if (item) {
        atualizarQuantidadeItem(id, item.quantidade + 1);
        atualizarBadgeCarrinho();
        renderizarCarrinho(container, aoVoltarHome, aoIrParaCheckout);
      }
    });
  });

  // Diminuir Quantidade
  container.querySelectorAll('.btn-diminuir').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.id;
      if (!id) return;
      const item = itens.find((i) => i.produto.id === id);
      if (item) {
        if (item.quantidade > 1) {
          atualizarQuantidadeItem(id, item.quantidade - 1);
        } else {
          removerItemDoCarrinho(id);
        }
        atualizarBadgeCarrinho();
        renderizarCarrinho(container, aoVoltarHome, aoIrParaCheckout);
      }
    });
  });

  // Remover Item
  container.querySelectorAll('.btn-remover').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.id;
      if (id) {
        removerItemDoCarrinho(id);
        atualizarBadgeCarrinho();
        renderizarCarrinho(container, aoVoltarHome, aoIrParaCheckout);
      }
    });
  });
}
import { obterCarrinho, limparCarrinho, atualizarBadgeCarrinho } from '../services/cartService';
import { registrarCompraSucesso } from '../analytics/dataLayer'; // 💡 REMOVIDO: registrarPageView (gerido exclusivamente pelo appController)
import { obterUsuarioAtual } from '../services/userService';
import { formatarMoeda } from '../utils/formatter';

export function renderizarCheckout(
  container: HTMLElement,
  aoVoltarHome: () => void
): void {
  const itens = obterCarrinho();
  const usuarioLogado = obterUsuarioAtual();
  const total = itens.reduce((acc, item) => acc + item.produto.price * item.quantidade, 0);

  // 💡 REMOVIDO: registrarPageView daqui! Quem dispara a Page View da rota é o appController.ts

  container.innerHTML = `
    <div class="max-w-3xl mx-auto space-y-6">
      
      <div class="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
        <div class="flex items-center justify-between border-b border-gray-100 pb-4">
          <h1 class="text-2xl font-black text-gray-900">
            💳 Finalizar Compra
          </h1>
          ${
            usuarioLogado 
              ? `<span class="text-xs bg-purple-50 text-purple-700 font-semibold px-3 py-1 rounded-full border border-purple-200">
                  Comprando como: <b>${usuarioLogado.email}</b>
                 </span>`
              : ''
          }
        </div>

        <!-- RESUMO DOS ITENS -->
        <div class="space-y-4">
          <h2 class="text-sm font-bold text-gray-700 uppercase tracking-wider">Itens do Pedido</h2>
          <div class="divide-y divide-gray-100 border border-gray-100 rounded-xl p-4 bg-gray-50/50">
            ${itens
              .map(
                (item) => `
              <div class="py-2 flex items-center justify-between text-sm">
                <span class="font-medium text-gray-800">${item.quantidade}x${item.produto.name}</span>
                <span class="font-bold text-gray-900">${formatarMoeda(item.produto.price * item.quantidade)}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- METODO DE PAGAMENTO SIMULADO -->
        <div class="space-y-3">
          <h2 class="text-sm font-bold text-gray-700 uppercase tracking-wider">Forma de Pagamento</h2>
          <div class="grid grid-cols-2 gap-3">
            <label class="border-2 border-purple-600 bg-purple-50/50 rounded-xl p-4 flex items-center gap-3 cursor-pointer">
              <input type="radio" name="pagamento" checked class="text-purple-600 focus:ring-purple-500">
              <div>
                <p class="text-sm font-bold text-gray-800">⚡ Pix</p>
                <p class="text-xs text-gray-500">Aprovação imediata</p>
              </div>
            </label>
            <label class="border border-gray-200 rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-gray-300">
              <input type="radio" name="pagamento" class="text-purple-600 focus:ring-purple-500">
              <div>
                <p class="text-sm font-bold text-gray-800">💳 Cartão de Crédito</p>
                <p class="text-xs text-gray-500">Em até 12x</p>
              </div>
            </label>
          </div>
        </div>

        <!-- TOTAL E BOTAO CONFIRMAR -->
        <div class="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span class="text-xs text-gray-500 block">Total a pagar</span>
            <span class="text-2xl font-black text-purple-700">${formatarMoeda(total)}</span>
          </div>

          <button
            type="button"
            id="btn-confirmar-pedido"
            class="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base rounded-xl transition-all shadow-lg shadow-emerald-200"
          >
            Pagar e Finalizar Pedido 🎉
          </button>
        </div>
      </div>

    </div>
  `;

  const btnConfirmar = container.querySelector('#btn-confirmar-pedido');
  if (btnConfirmar) {
    btnConfirmar.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // 👈 Garante isolamento do evento no clique de compra

      // 1. Dispara o evento purchaseValidado no contrato exato do dataLayer.ts
      registrarCompraSucesso(
        `PED-${Date.now()}`,
        total,
        usuarioLogado ? 'Logado' : 'Anônimo',
        itens.map((item) => ({
          id: item.produto.id,
          name: item.produto.name,
          price: item.produto.price,
          quantity: item.quantidade
        })),
        {
          screenName: 'checkout:pagamento',
          screenSection: 'checkout'
        },
        usuarioLogado?.id
      );

      // 2. Limpa o carrinho e finaliza
      limparCarrinho();
      atualizarBadgeCarrinho();
      alert('Pedido efetuado com sucesso! O evento de compra foi registrado.');
      aoVoltarHome();
    });
  }
}
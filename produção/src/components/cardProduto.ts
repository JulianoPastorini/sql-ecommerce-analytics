import type { Produto } from '../types/produto';
import { formatarMoeda } from '../utils/formatter';

export function criarCardProduto(produto: Produto): string {
  const avaliacao = produto.rating ? produto.rating.toFixed(1) : '4.1';
  const iconeFavorito = produto.isFavorito ? '❤️' : '🤍';

  return `
    <div 
      class="group relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col justify-between overflow-hidden transition-all duration-200 cursor-pointer"
      data-acao="abrir-pdp"
      data-produto-id="${produto.id}"
    >
      <!-- Foto + Badges da Avaliação e Favorito -->
      <div class="relative w-full aspect-square bg-gray-50 overflow-hidden">
        <img 
          src="${produto.image}" 
          alt="${produto.name}" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        <!-- Badge Avaliação -->
        <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm pointer-events-none">
          <span class="text-amber-400">★</span>
          <span>${avaliacao}</span>
        </div>

        <!-- Botão Favoritar -->
        <button 
          type="button"
          class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-sm shadow-sm hover:scale-110 active:scale-95 transition-all z-10"
          data-acao="favoritar"
          data-produto-id="${produto.id}"
          title="${produto.isFavorito ? 'Remover dos favoritos' : 'Salvar nos favoritos'}"
        >
          ${iconeFavorito}
        </button>
      </div>

      <!-- Conteúdo do Card -->
      <div class="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 class="font-bold text-gray-900 line-clamp-1 group-hover:text-purple-600 transition-colors">
            ${produto.name}
          </h3>
          <p class="text-xs text-gray-500 line-clamp-2 mt-1">
            ${produto.description}
          </p>
        </div>

        <!-- Preço e Ações -->
        <div class="space-y-3 pt-2">
          <div class="text-lg font-black text-gray-900">
            ${formatarMoeda(produto.price)}
          </div>

          <div class="grid grid-cols-2 gap-2">
            <button 
              type="button"
              class="w-full py-2 px-2 bg-purple-50 text-purple-700 hover:bg-purple-100 font-semibold text-xs rounded-xl transition-colors z-10"
              data-acao="adicionar-carrinho"
              data-produto-id="${produto.id}"
            >
              + Carrinho
            </button>
            <button 
              type="button"
              class="w-full py-2 px-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl transition-colors shadow-sm z-10"
              data-acao="comprar-agora"
              data-produto-id="${produto.id}"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
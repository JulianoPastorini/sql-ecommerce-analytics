import type { Produto } from '../types/produto';
import { criarCardProduto } from './cardProduto';

export function criarCarrosselProdutos(titulo: string, subtitulo: string, produtos: Produto[], idCarrossel: string): string {
  if (produtos.length === 0) return '';

  return `
    <section class="py-6 space-y-4">
      <div class="flex items-end justify-between px-1">
        <div>
          <h2 class="text-xl md:text-2xl font-black text-gray-900 tracking-tight">${titulo}</h2>
          <p class="text-xs md:text-sm text-gray-500 mt-0.5">${subtitulo}</p>
        </div>
        <div class="flex gap-2">
          <button 
            type="button"
            data-carrossel-btn="prev"
            data-carrossel-target="${idCarrossel}"
            class="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-purple-50 hover:text-purple-600 flex items-center justify-center transition-colors shadow-sm"
            title="Anterior"
          >
            ←
          </button>
          <button 
            type="button"
            data-carrossel-btn="next"
            data-carrossel-target="${idCarrossel}"
            class="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-purple-50 hover:text-purple-600 flex items-center justify-center transition-colors shadow-sm"
            title="Próximo"
          >
            →
          </button>
        </div>
      </div>

      <!-- Container do Carrossel com Scroll Horizontal -->
      <div 
        id="${idCarrossel}" 
        class="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 scrollbar-none"
        style="-webkit-overflow-scrolling: touch; scrollbar-width: none;"
      >
        ${produtos.map(p => `
          <div class="w-64 sm:w-72 flex-shrink-0 snap-start">
            ${criarCardProduto(p)}
          </div>
        `).join('')}
      </div>
    </section>
  `;
}
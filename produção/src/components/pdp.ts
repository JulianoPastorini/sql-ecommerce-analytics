import type { Produto } from '../types/produto';
import { formatarMoeda, formatarNome } from '../utils/formatter';
import { criarFooter } from './footer';

export function renderizarPDP(container: HTMLElement, produto: Produto, aoVoltar: () => void): void {
  const avaliacao = produto.rating ? produto.rating.toFixed(1) : '5.0';
  const categoriaFormatada = formatarNome(produto.category);
  const subcategoriaFormatada = produto.subcategory ? formatarNome(produto.subcategory) : '';

  // Imagens para a galeria (utiliza a foto principal + variações)
  const galeriaImagens = [
    produto.image,
    produto.image + '&auto=format&fit=crop&w=800&q=70',
    produto.image + '&auto=format&fit=crop&w=800&q=60',
    produto.image + '&auto=format&fit=crop&w=800&q=50'
  ];

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
      
      <!-- BREADCRUMB / NAVEGAÇÃO RAIZ -->
      <nav class="flex items-center gap-2 text-xs md:text-sm text-gray-500 overflow-x-auto py-2">
        <button type="button" id="btn-breadcrumb-home" class="hover:text-purple-600 transition-colors whitespace-nowrap">
          Página Inicial
        </button>
        <span>&gt;</span>
        <span class="hover:text-purple-600 transition-colors whitespace-nowrap cursor-pointer">${categoriaFormatada}</span>
        ${subcategoriaFormatada ? `
          <span>&gt;</span>
          <span class="hover:text-purple-600 transition-colors whitespace-nowrap cursor-pointer">${subcategoriaFormatada}</span>
        ` : ''}
        <span>&gt;</span>
        <span class="text-gray-900 font-medium truncate max-w-xs md:max-w-md">${produto.name}</span>
      </nav>

      <!-- CONTEÚDO PRINCIPAL (GALERIA + COMPRA) -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        <!-- COLUNA DA ESQUERDA: GALERIA DE FOTOS -->
        <div class="md:col-span-5 space-y-4">
          <!-- Foto Ampliada Principal -->
          <div class="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
            <img 
              id="pdp-foto-principal" 
              src="${produto.image}" 
              alt="${produto.name}" 
              class="w-full h-full object-cover transition-all duration-200"
            />
          </div>

          <!-- Carrossel / Miniaturas -->
          <div class="grid grid-cols-4 gap-2">
            ${galeriaImagens.map((img, index) => `
              <button 
                type="button"
                class="btn-miniatura w-full aspect-square rounded-lg border-2 ${index === 0 ? 'border-purple-600' : 'border-transparent'} overflow-hidden bg-gray-50 hover:opacity-80 transition-all"
                data-img-src="${img}"
              >
                <img src="${img}" alt="Miniatura ${index + 1}" class="w-full h-full object-cover" />
              </button>
            `).join('')}
          </div>

          <!-- Botões Acessórios (Compartilhar e Favoritar) -->
          <div class="flex items-center justify-between pt-4 border-t border-gray-100 text-sm text-gray-600">
            <div class="flex items-center gap-2">
              <span>Compartilhar:</span>
              <button type="button" class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs">f</button>
              <button type="button" class="w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold flex items-center justify-center text-xs">w</button>
            </div>
            <button 
              type="button" 
              class="flex items-center gap-1.5 text-gray-700 hover:text-red-500 font-medium transition-colors"
              data-acao="favoritar"
              data-produto-id="${produto.id}"
            >
              <span>${produto.isFavorito ? '❤️' : '🤍'}</span>
              <span>Favoritar (${produto.isFavorito ? 'Salvo' : '15,7mil'})</span>
            </button>
          </div>
        </div>

        <!-- COLUNA DA DIREITA: DETALHES DO PRODUTO E COMPRA -->
        <div class="md:col-span-7 flex flex-col justify-between space-y-6">
          <div class="space-y-4">
            <!-- Selo Oficial e Título Grande -->
            <div>
              <span class="inline-block bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded tracking-wider uppercase mb-2">
                Oficial
              </span>
              <h1 class="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                ${produto.name}
              </h1>
            </div>

            <!-- Avaliações e Métricas -->
            <div class="flex items-center gap-4 text-sm pb-2 border-b border-gray-100">
              <div class="flex items-center gap-1 text-amber-500 font-bold">
                <u>${avaliacao}</u>
                <span>${'★'.repeat(5)}</span>
              </div>
              <span class="text-gray-300">|</span>
              <div class="text-gray-600">
                <strong class="text-gray-900">514</strong> Avaliações
              </div>
              <span class="text-gray-300">|</span>
              <div class="text-gray-600">
                <strong class="text-gray-900">1,2mil</strong> Vendidos
              </div>
            </div>

            <!-- Bloco de Preço -->
            <div class="bg-gray-50 p-4 rounded-xl space-y-1">
              <div class="flex items-baseline gap-3">
                <span class="text-3xl font-black text-purple-700">
                  ${formatarMoeda(produto.price)}
                </span>
                <span class="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                  no Pix
                </span>
              </div>
              <p class="text-xs text-gray-500">
                Ou ${formatarMoeda(produto.price * 1.08)} em até 10x sem juros no cartão
              </p>
            </div>

            <!-- Seletor de Quantidade -->
            <div class="flex items-center gap-4 py-2">
              <span class="text-sm font-semibold text-gray-700">Quantidade:</span>
              <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                <button type="button" id="pdp-qtd-menos" class="px-3 py-1 bg-gray-50 hover:bg-gray-100 font-bold text-gray-600">-</button>
                <input type="text" id="pdp-qtd-input" value="1" readonly class="w-12 text-center text-sm font-bold text-gray-800 focus:outline-none" />
                <button type="button" id="pdp-qtd-mais" class="px-3 py-1 bg-gray-50 hover:bg-gray-100 font-bold text-gray-600">+</button>
              </div>
            </div>
          </div>

          <!-- Botões Grandes de Ação -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <button 
              type="button"
              class="w-full py-3.5 px-4 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              data-acao="adicionar-carrinho"
              data-produto-id="${produto.id}"
            >
              🛒 Adicionar Ao Carrinho
            </button>
            <button 
              type="button"
              class="w-full py-3.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              data-acao="comprar-agora"
              data-produto-id="${produto.id}"
            >
              ⚡ Comprar Agora
            </button>
          </div>
        </div>

      </div>

      <!-- SEÇÃO: DESCRIÇÃO DO PRODUTO E FICHA TÉCNICA -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
        <h2 class="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 bg-gray-50 -mx-6 -mt-6 p-6 rounded-t-2xl">
          Descrição Do Produto
        </h2>

        <div class="prose prose-sm text-gray-700 leading-relaxed space-y-4">
          <p>${produto.description}</p>
          <p>
            Desenvolvido para oferecer máxima eficiência e durabilidade no uso diário. Possui acabamento de altíssima qualidade, ideal para quem busca praticidade e excelente custo-benefício.
          </p>
        </div>

        <!-- ESPECIFICAÇÕES TÉCNICAS -->
        <div class="pt-4 border-t border-gray-100 space-y-3">
          <h3 class="text-sm font-bold text-gray-900">:: Especificações Técnicas</h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div class="flex border-b border-gray-50 py-1.5"><span class="w-1/3 text-gray-400">Categoria:</span> <span class="font-medium text-gray-800">${categoriaFormatada}</span></div>
            <div class="flex border-b border-gray-50 py-1.5"><span class="w-1/3 text-gray-400">Código ID:</span> <span class="font-medium text-gray-800">${produto.id}</span></div>
            ${Object.entries(produto.specs || {}).map(([chave, valor]) => `
              <div class="flex border-b border-gray-50 py-1.5">
                <span class="w-1/3 text-gray-400">${chave}:</span> 
                <span class="font-medium text-gray-800">${valor}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- SEÇÃO: AVALIAÇÕES -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
        <h2 class="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 bg-gray-50 -mx-6 -mt-6 p-6 rounded-t-2xl">
          Avaliações Do Produto
        </h2>

        <div class="flex items-center gap-6 bg-purple-50/50 p-4 rounded-xl">
          <div class="text-center">
            <div class="text-3xl font-black text-purple-700">${avaliacao}</div>
            <div class="text-amber-400 text-sm">★★★★★</div>
            <div class="text-xs text-gray-500 mt-0.5">de 5.0</div>
          </div>
          <div class="flex-1 flex flex-wrap gap-2 text-xs">
            <span class="px-3 py-1.5 bg-white rounded-lg border border-purple-200 font-semibold text-purple-700 shadow-sm">Tudo (514)</span>
            <span class="px-3 py-1.5 bg-white rounded-lg border border-gray-200 text-gray-600 hover:border-purple-200">5 Estrelas (490)</span>
            <span class="px-3 py-1.5 bg-white rounded-lg border border-gray-200 text-gray-600 hover:border-purple-200">Com Fotos (120)</span>
          </div>
        </div>

        <!-- Lista de Comentários -->
        <div class="space-y-4 divide-y divide-gray-100">
          <div class="pt-4 space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-bold text-sm text-gray-800">João M.</span>
              <span class="text-xs text-gray-400">Há 2 dias</span>
            </div>
            <div class="text-amber-400 text-xs">★★★★★</div>
            <p class="text-sm text-gray-600">Produto excelente! Chegou extremamente rápido e muito bem embalado. Recomendo demais!</p>
          </div>
        </div>
      </div>

      <!-- FOOTER DA PÁGINA -->
      ${criarFooter()}
    </div>
  `;

  // === EVENTOS DA PÁGINA ===
  
  // 1. Botão voltar da breadcrumb
  container.querySelector('#btn-breadcrumb-home')?.addEventListener('click', aoVoltar);

  // 2. Troca de imagens no clique das miniaturas
  const fotoPrincipal = container.querySelector('#pdp-foto-principal') as HTMLImageElement;
  const miniaturas = container.querySelectorAll<HTMLButtonElement>('.btn-miniatura');

  miniaturas.forEach(btn => {
    btn.addEventListener('click', () => {
      const novaSrc = btn.dataset.imgSrc;
      if (novaSrc && fotoPrincipal) {
        fotoPrincipal.src = novaSrc;
        miniaturas.forEach(m => m.classList.replace('border-purple-600', 'border-transparent'));
        btn.classList.replace('border-transparent', 'border-purple-600');
      }
    });
  });

  // 3. Incremento e decremento da quantidade
  const qtdInput = container.querySelector('#pdp-qtd-input') as HTMLInputElement;
  container.querySelector('#pdp-qtd-menos')?.addEventListener('click', () => {
    let val = parseInt(qtdInput.value, 10) || 1;
    if (val > 1) qtdInput.value = String(val - 1);
  });
  container.querySelector('#pdp-qtd-mais')?.addEventListener('click', () => {
    let val = parseInt(qtdInput.value, 10) || 1;
    qtdInput.value = String(val + 1);
  });
}
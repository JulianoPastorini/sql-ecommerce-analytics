import type { Produto } from '../types/produto';
import { formatarNome } from '../utils/formatter';
import { criarCardProduto } from './cardProduto';
import { criarCarrosselProdutos } from './carrosselProdutos';
import { criarProvaSocial } from './provaSocial';
import { criarFooter } from './footer';

export interface FiltroContexto {
  categoriaAtiva: string | null;
  subcategoriaAtiva: string | null;
  termoBuscaAtivo: string;
  aoVoltarHome: () => void;
  aoFiltrarCategoria: (categoria: string) => void;
}

export function criarVitrine(
  container: HTMLElement,
  produtos: Produto[],
  contexto: FiltroContexto
): void {
  const { categoriaAtiva, subcategoriaAtiva, termoBuscaAtivo, aoVoltarHome, aoFiltrarCategoria } = contexto;
  const isHome = !categoriaAtiva && !subcategoriaAtiva && !termoBuscaAtivo;

  // -------------------------------------------------------------
  // 1. MODO HOME VITRINE (Sem Breadcrumb)
  // -------------------------------------------------------------
  if (isHome) {
    const destaques = produtos.slice(0, 10);
    const eletronicos = produtos.filter(p => p.category === 'eletronicos').slice(0, 10);
    const vestuario = produtos.filter(p => p.category === 'vestuario').slice(0, 10);
    const calcados = produtos.filter(p => p.category === 'calcados').slice(0, 10);

    container.innerHTML = `
      <div class="space-y-6">
        <div class="pt-2 pb-4">
          <h1 class="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Itens em Destaque
          </h1>
          <p class="text-gray-500 text-sm mt-1">
            Confira as melhores ofertas e novidades selecionadas para você.
          </p>
        </div>

        ${criarCarrosselProdutos('🔥 Mais Vendidos', 'Os queridinhos dos nossos clientes', destaques, 'carrossel-destaques')}
        ${criarCarrosselProdutos('⚡ Eletrônicos & Tecnologia', 'Smartphones, áudio e vestíveis avançados', eletronicos, 'carrossel-eletronicos')}
        ${criarCarrosselProdutos('👕 Vestuário & Moda', 'Estilo e conforto para todas as ocasiões', vestuario, 'carrossel-vestuario')}
        ${criarCarrosselProdutos('👟 Calçados', 'Tênis esportivos e casuais de alta performance', calcados, 'carrossel-calcados')}

        ${criarProvaSocial()}
        ${criarFooter()}
      </div>
    `;

    configurarEventosCarrossel(container);
    return;
  }

  // -------------------------------------------------------------
  // 2. CONSTRUÇÃO DO BREADCRUMB (Raiz da Página)
  // -------------------------------------------------------------
  const nomeCategoria = categoriaAtiva ? formatarNome(categoriaAtiva) : '';
  const nomeSubcategoria = subcategoriaAtiva ? formatarNome(subcategoriaAtiva) : '';

  let breadcrumbHTML = `
    <nav class="flex items-center gap-2 text-xs md:text-sm text-gray-500 overflow-x-auto py-2">
      <button type="button" id="btn-breadcrumb-home" class="hover:text-purple-600 transition-colors whitespace-nowrap font-medium">
        Página Inicial
      </button>
  `;

  if (termoBuscaAtivo) {
    breadcrumbHTML += `
      <span>&gt;</span>
      <span class="text-gray-900 font-semibold truncate">Busca: "${termoBuscaAtivo}"</span>
    `;
  } else if (categoriaAtiva) {
    if (subcategoriaAtiva) {
      breadcrumbHTML += `
        <span>&gt;</span>
        <button type="button" id="btn-breadcrumb-cat" class="hover:text-purple-600 transition-colors whitespace-nowrap cursor-pointer font-medium">
          ${nomeCategoria}
        </button>
        <span>&gt;</span>
        <span class="text-gray-900 font-semibold whitespace-nowrap">${nomeSubcategoria}</span>
      `;
    } else {
      breadcrumbHTML += `
        <span>&gt;</span>
        <span class="text-gray-900 font-semibold whitespace-nowrap">${nomeCategoria}</span>
      `;
    }
  }
  breadcrumbHTML += `</nav>`;

  // -------------------------------------------------------------
  // 3. MODO CATEGORIA PRINCIPAL (Dividido em Subcategorias)
  // -------------------------------------------------------------
  if (categoriaAtiva && !subcategoriaAtiva && !termoBuscaAtivo) {
    // Agrupa produtos pelas subcategorias existentes
    const subcategoriasMap = new Map<string, Produto[]>();
    produtos.forEach(p => {
      const subKey = p.subcategory || 'Outros';
      if (!subcategoriasMap.has(subKey)) {
        subcategoriasMap.set(subKey, []);
      }
      subcategoriasMap.get(subKey)!.push(p);
    });

    let secoesSubcategorias = '';
    subcategoriasMap.forEach((prods, subSlug) => {
      const tituloSub = formatarNome(subSlug);
      secoesSubcategorias += `
        <section class="space-y-4 pt-2">
          <div class="flex items-center justify-between border-b border-gray-100 pb-2">
            <h2 class="text-xl font-bold text-gray-900">${tituloSub}</h2>
            <span class="text-xs text-gray-400 font-medium">${prods.length} produtos</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            ${prods.map(p => criarCardProduto(p)).join('')}
          </div>
        </section>
      `;
    });

    container.innerHTML = `
      <div class="space-y-8">
        ${breadcrumbHTML}
        
        <div class="border-b border-gray-200 pb-4">
          <h1 class="text-2xl md:text-3xl font-black text-gray-900">${nomeCategoria}</h1>
          <p class="text-sm text-gray-500 mt-1">Explore os produtos divididos por subcategoria em ${nomeCategoria}</p>
        </div>

        <div class="space-y-10">
          ${secoesSubcategorias || '<p class="text-gray-500 py-8">Nenhum produto encontrado nesta categoria.</p>'}
        </div>

        ${criarProvaSocial()}
        ${criarFooter()}
      </div>
    `;
  } 
  // -------------------------------------------------------------
  // 4. MODO SUBCATEGORIA OU BUSCA (Grid Simples Filtrado)
  // -------------------------------------------------------------
  else {
    let tituloPagina = '';
    if (termoBuscaAtivo) {
      tituloPagina = `Resultados para "${termoBuscaAtivo}" (${produtos.length})`;
    } else if (subcategoriaAtiva) {
      tituloPagina = `${nomeSubcategoria} (${produtos.length})`;
    }

    const conteudoGrid = produtos.length > 0 ? `
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        ${produtos.map(p => criarCardProduto(p)).join('')}
      </div>
    ` : `
      <div class="text-center py-16 text-gray-500 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <p class="text-lg font-bold">Nenhum produto encontrado.</p>
        <p class="text-sm text-gray-400 mt-1">Tente buscar por outro termo ou selecione uma categoria na barra lateral.</p>
      </div>
    `;

    container.innerHTML = `
      <div class="space-y-8">
        ${breadcrumbHTML}

        <div class="border-b border-gray-200 pb-4">
          <h1 class="text-2xl md:text-3xl font-black text-gray-900">${tituloPagina}</h1>
        </div>

        ${conteudoGrid}

        ${criarProvaSocial()}
        ${criarFooter()}
      </div>
    `;
  }

  // -------------------------------------------------------------
  // 5. EVENTOS DO BREADCRUMB
  // -------------------------------------------------------------
  container.querySelector('#btn-breadcrumb-home')?.addEventListener('click', aoVoltarHome);
  container.querySelector('#btn-breadcrumb-cat')?.addEventListener('click', () => {
    if (categoriaAtiva) aoFiltrarCategoria(categoriaAtiva);
  });

  configurarEventosCarrossel(container);
}

function configurarEventosCarrossel(container: HTMLElement): void {
  container.querySelectorAll('[data-carrossel-btn]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = (btn as HTMLElement).dataset.carrosselTarget;
      const direcao = (btn as HTMLElement).dataset.carrosselBtn;
      if (!targetId) return;

      const carrosselEl = container.querySelector(`#${targetId}`);
      if (carrosselEl) {
        const deslocamento = carrosselEl.clientWidth * 0.75;
        carrosselEl.scrollBy({
          left: direcao === 'next' ? deslocamento : -deslocamento,
          behavior: 'smooth'
        });
      }
    });
  });
}
import type { Produto } from '../types/produto';
import type { Usuario } from '../services/userService';
import { formatarNome, padronizarTexto } from '../utils/formatter';
import { criarCarrosselProdutos } from './carrosselProdutos';
import { criarProvaSocial } from './provaSocial';
import { criarFooter } from './footer';

export function renderizarFavoritos(
  container: HTMLElement,
  catalogo: Produto[],
  usuarioLogado: Usuario | null,
  aoVoltarHome: () => void
): void {
  // 1. Filtra todos os produtos marcados como favoritos
  const itensSalvos = catalogo.filter((p) => p.isFavorito);

  // 2. Obtém as categorias de preferência do usuário
  const preferenciasUsuario = usuarioLogado?.preferencias || [];

  // 3. Renderiza a estrutura da tela
  container.innerHTML = `
    <div class="space-y-8">
      
      <!-- BREADCRUMB -->
      <nav class="flex items-center gap-2 text-xs md:text-sm text-gray-500 overflow-x-auto py-2">
        <button type="button" id="btn-breadcrumb-home" class="hover:text-purple-600 transition-colors font-medium">
          Página Inicial
        </button>
        <span>&gt;</span>
        <span class="text-gray-900 font-semibold">Itens Salvos</span>
      </nav>

      <!-- TÍTULO DA PÁGINA -->
      <div class="border-b border-gray-200 pb-4">
        <h1 class="text-2xl md:text-3xl font-black text-gray-900">Itens Salvos</h1>
        <p class="text-sm text-gray-500 mt-1">
          Gerencie seus produtos favoritos e confira recomendações personalizadas.
        </p>
      </div>

      <!-- ROW 1: CARROSSEL DE ITENS SALVOS -->
      <section id="secao-itens-salvos">
        ${
          itensSalvos.length > 0
            ? criarCarrosselProdutos(
                '❤️ Seus Favoritos',
                `${itensSalvos.length}${itensSalvos.length === 1 ? 'item salvo' : 'itens salvos'} em sua lista`,
                itensSalvos,
                'carrossel-favoritos'
              )
            : `
              <div class="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm space-y-3">
                <div class="text-4xl">🤍</div>
                <h2 class="text-lg font-bold text-gray-800">Sua lista de salvos está vazia</h2>
                <p class="text-sm text-gray-500 max-w-md mx-auto">
                  Navegue pela vitrine e clique no ícone de coração dos produtos para adicioná-los aqui!
                </p>
              </div>
            `
        }
      </section>

      <!-- ROWS SEGUINTES: CARROSSÉIS DE RECOMENDADOS POR CATEGORIA DE PREFERÊNCIA -->
      <div class="space-y-8 pt-4 border-t border-gray-100">
        <div>
          <h2 class="text-xl md:text-2xl font-black text-gray-900">Recomendados Para Você</h2>
          <p class="text-sm text-gray-500 mt-0.5">Com base nas preferências do seu perfil</p>
        </div>

        ${
          preferenciasUsuario.length > 0
            ? preferenciasUsuario
                .map((catSlug, index) => {
                  const nomeCategoria = formatarNome(catSlug);
                  
                  // Filtra os produtos da categoria comparando as strings padronizadas
                  const produtosDaCategoria = catalogo.filter(
                    (p) => padronizarTexto(p.category) === padronizarTexto(catSlug)
                  );

                  if (produtosDaCategoria.length === 0) return '';

                  return criarCarrosselProdutos(
                    `🌟 ${nomeCategoria}`,
                    `Confira as novidades em ${nomeCategoria}`,
                    produtosDaCategoria,
                    `carrossel-pref-${index}`
                  );
                })
                .join('')
            : `
              <div class="bg-purple-50/60 rounded-xl p-6 text-center border border-purple-100">
                <p class="text-sm text-purple-700 font-medium">
                  Defina suas preferências no menu lateral para liberar carrosséis com recomendações personalizadas.
                </p>
              </div>
            `
        }
      </div>

      <!-- PROVA SOCIAL & FOOTER -->
      ${criarProvaSocial()}
      ${criarFooter()}
    </div>
  `;

  // === EVENTOS ===
  container.querySelector('#btn-breadcrumb-home')?.addEventListener('click', aoVoltarHome);

  // Ativa as setas laterais de navegação para TODOS os carrosséis da página
  container.querySelectorAll('[data-carrossel-btn]').forEach((btn) => {
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
          behavior: 'smooth',
        });
      }
    });
  });
}
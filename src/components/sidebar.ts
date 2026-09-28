import type { CategoriaSidebar } from '../types/categoria';

export function criarSidebar(
  container: HTMLElement,
  categorias: CategoriaSidebar[],
  isLogado: boolean,
  preferencias: string[],
  onSelecionar: (categoria: string | null, subcategoria: string | null) => void,
  onEditarPreferencias: () => void
) {
  // Ordena todas as categorias em ordem alfabética (A-Z)
  const todasOrdenadas = [...categorias].sort((a, b) => 
    a.categoria.localeCompare(b.categoria, 'pt-BR')
  );

  // Filtra as categorias salvas pelo usuário
  const categoriasPreferidas = todasOrdenadas.filter(cat => 
    preferencias.includes(cat.categoria)
  );

  // Seção "Suas Preferências" (quando logado)
  const secaoPreferenciasHtml = isLogado ? `
    <div class="mb-6 pb-5 border-b border-gray-100">
      <div class="flex items-center justify-between mb-3 px-1">
        <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Suas Preferências</span>
        <button id="btn-editar-pref" 
                class="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-md transition"
                title="Editar Preferências">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      ${categoriasPreferidas.length > 0 ? `
        <div class="flex flex-col gap-1.5">
          ${categoriasPreferidas.map(cat => `
            <button data-cat="${cat.categoria}" class="w-full text-left flex items-center justify-between px-3 py-2 rounded-xl hover:bg-purple-50 text-purple-700 hover:text-purple-800 text-sm font-semibold transition group">
              <span class="truncate">${cat.categoria}</span>
              <span class="text-yellow-500 text-xs">★</span>
            </button>
          `).join('')}
        </div>
      ` : `
        <p class="text-xs text-gray-400 italic px-1">Nenhuma preferência selecionada.</p>
      `}
    </div>
  ` : '';

  // Seção "Todas as Categorias"
  const todasCategoriasHtml = todasOrdenadas.map(cat => `
    <div class="mb-5">
      <button data-cat="${cat.categoria}" class="w-full text-left text-base font-bold text-purple-700 hover:text-purple-900 py-1 transition flex items-center justify-between group">
        <span>${cat.categoria}</span>
      </button>
      
      ${cat.subcategorias.length > 0 ? `
        <ul class="flex flex-col gap-1.5 pl-3 mt-2 border-l-2 border-purple-100">
          ${cat.subcategorias.sort().map(sub => `
            <li>
              <button data-cat="${cat.categoria}" data-sub="${sub}" class="w-full text-left text-sm text-gray-500 hover:text-purple-600 hover:font-medium py-0.5 transition-all">
                ${sub}
              </button>
            </li>
          `).join('')}
        </ul>
      ` : ''}
    </div>
  `).join('');

  container.innerHTML = `
    <!-- Box com altura máxima responsiva (calculada pela tela), scroll vertical suave e suporte a personalização -->
    <aside class="w-full bg-white p-5 rounded-2xl shadow-sm border border-gray-100 max-h-[calc(100vh-7rem)] overflow-y-auto pr-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-purple-300">
      ${secaoPreferenciasHtml}

      <div>
        <div class="mb-4 px-1">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Todas as Categorias</span>
        </div>
        ${todasCategoriasHtml}
      </div>
    </aside>
  `;

  // Eventos de clique
  const btnEditar = container.querySelector('#btn-editar-pref');
  btnEditar?.addEventListener('click', onEditarPreferencias);

  const links = container.querySelectorAll<HTMLElement>('[data-cat]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.stopPropagation();
      const cat = link.getAttribute('data-cat');
      const sub = link.getAttribute('data-sub');
      
      if (cat === 'all') {
        onSelecionar(null, null);
      } else {
        onSelecionar(cat, sub || null);
      }
    });
  });
}
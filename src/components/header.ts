import type { Usuario } from '../services/userService';

export function criarHeader(
  container: HTMLElement,
  aoBuscar: (termo: string) => void,
  aoClicarLogin: () => void,
  usuario: Usuario | null,
  aoClicarLogout: () => void,
  aoClicarLogo: () => void
): void {
  container.innerHTML = `
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div class="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between gap-4 lg:gap-6">
        
        <!-- 1. LOGO -->
        <a id="btn-logo" href="#" class="flex items-center gap-3 cursor-pointer group shrink-0">
          <div class="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:bg-purple-700 transition-colors">
            B
          </div>
          <span class="text-xl font-bold tracking-tight text-gray-900 group-hover:text-purple-600 transition-colors hidden sm:inline">
            BUGIGANGA<span class="text-purple-600">.</span>
          </span>
        </a>

        <!-- 2. BARRA DE BUSCA (Centralizada) -->
        <div class="flex-1 max-w-xl relative">
          <input
            id="input-busca"
            type="text"
            placeholder="O que você está procurando hoje?"
            class="w-full pl-11 pr-4 py-2.5 bg-gray-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-purple-500 focus:outline-none transition-all"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>

        <!-- 3. AÇÕES DA DIREITA -->
        <div class="flex items-center gap-2 sm:gap-4 shrink-0">
          
          <!-- Nome do Perfil / Botão Entrar -->
          ${
            usuario
              ? `
                <div class="flex items-center gap-2 bg-gray-50 py-1.5 px-3 rounded-xl border border-gray-100">
                  <span class="text-xs sm:text-sm font-medium text-gray-700 truncate max-w-[120px] sm:max-w-none">
                    Olá, <span class="font-semibold text-purple-700">${usuario.nome}</span>
                  </span>
                  <button id="btn-logout" class="text-xs text-red-500 hover:text-red-700 font-semibold px-2 py-1 rounded-lg border border-red-200 hover:bg-red-50 transition-colors ml-1">
                    Sair
                  </button>
                </div>
              `
              : `
                <button id="btn-login" class="px-4 py-2 bg-purple-600 text-white font-medium text-xs sm:text-sm rounded-xl hover:bg-purple-700 shadow-sm transition-colors">
                  Entrar
                </button>
              `
          }

          <!-- Botão Itens Salvos (Favoritos) -->
          <button id="btn-favoritos" title="Itens Salvos" class="p-2.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <!-- Botão Carrinho de Compras -->
          <button id="btn-carrinho" title="Carrinho de Compras" class="p-2.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors relative">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <span class="absolute top-1 right-1 w-4 h-4 bg-purple-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              0
            </span>
          </button>

          <!-- Botão Menu Sanduíche -->
          <button id="btn-menu-sanduiche" title="Menu" class="p-2.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        </div>

      </div>
    </header>
  `;

  // Ouvinte do Clique na Logo
  const logoEl = container.querySelector<HTMLAnchorElement>('#btn-logo');
  if (logoEl) {
    logoEl.addEventListener('click', (e) => {
      e.preventDefault();
      aoClicarLogo();
    });
  }

  // Ouvinte do Campo de Busca
  const inputBusca = container.querySelector<HTMLInputElement>('#input-busca');
  if (inputBusca) {
    inputBusca.addEventListener('input', (e) => {
      const termo = (e.target as HTMLInputElement).value;
      aoBuscar(termo);
    });
  }

  // Ouvinte de Login e Logout
  const btnLogin = container.querySelector('#btn-login');
  btnLogin?.addEventListener('click', aoClicarLogin);

  const btnLogout = container.querySelector('#btn-logout');
  btnLogout?.addEventListener('click', aoClicarLogout);

  // Ouvintes para botões adicionais (Hooks para lógica/analytics futura)
  const btnFavoritos = container.querySelector('#btn-favoritos');
  btnFavoritos?.addEventListener('click', () => {
    console.log('❤️ Acessou Itens Salvos');
  });

  const btnCarrinho = container.querySelector('#btn-carrinho');
  btnCarrinho?.addEventListener('click', () => {
    console.log('🛒 Acessou Carrinho');
  });

  const btnMenu = container.querySelector('#btn-menu-sanduiche');
  btnMenu?.addEventListener('click', () => {
    console.log('🍔 Clicou no Menu Sanduíche');
  });
}
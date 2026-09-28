export function criarModalLogin(
  container: HTMLElement,
  onLogin: (email: string) => { sucesso: boolean; mensagem?: string },
  onRegister: (nome: string, email: string) => void,
  onClose: () => void
) {
  let modoAba: 'entrar' | 'cadastro' = 'entrar';

  const render = () => {
    container.innerHTML = `
      <div id="modal-overlay" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
          <button id="btn-fechar-modal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold text-xl">
            &times;
          </button>
          
          <!-- ABAS DE NAVEGAÇÃO -->
          <div class="flex border-b border-gray-200 mb-6">
            <button id="tab-entrar" class="flex-1 py-2 text-center text-sm font-semibold ${
              modoAba === 'entrar' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
            }">
              Já tenho conta
            </button>
            <button id="tab-cadastro" class="flex-1 py-2 text-center text-sm font-semibold ${
              modoAba === 'cadastro' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
            }">
              Criar nova conta
            </button>
          </div>

          <!-- MENSAGEM DE ERRO/ALERTA -->
          <div id="login-erro" class="hidden mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600"></div>

          ${modoAba === 'entrar' ? `
            <!-- FORMULÁRIO DE LOGIN -->
            <form id="form-login-existente">
              <h3 class="text-lg font-bold text-gray-800 mb-1">Acessar Conta</h3>
              <p class="text-xs text-gray-500 mb-4">Digite o seu e-mail cadastrado para entrar.</p>
              
              <div class="mb-5">
                <label class="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wider">E-mail</label>
                <input type="email" id="login-email" required placeholder="seuemail@exemplo.com" 
                       class="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              
              <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition">
                Entrar
              </button>
            </form>
          ` : `
            <!-- FORMULÁRIO DE CADASTRO -->
            <form id="form-novo-cadastro">
              <h3 class="text-lg font-bold text-gray-800 mb-1">Criar Conta</h3>
              <p class="text-xs text-gray-500 mb-4">Preencha seus dados abaixo para se cadastrar.</p>
              
              <div class="mb-4">
                <label class="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wider">Nome Completo</label>
                <input type="text" id="cadastro-nome" required placeholder="Ex: Maria Silva" 
                       class="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div class="mb-5">
                <label class="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wider">E-mail</label>
                <input type="email" id="cadastro-email" required placeholder="seuemail@exemplo.com" 
                       class="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              
              <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition">
                Criar Conta e Continuar
              </button>
            </form>
          `}
        </div>
      </div>
    `;

    // Listeners
    const fecharBtn = container.querySelector('#btn-fechar-modal');
    const overlay = container.querySelector('#modal-overlay');
    const tabEntrar = container.querySelector('#tab-entrar');
    const tabCadastro = container.querySelector('#tab-cadastro');

    fecharBtn?.addEventListener('click', onClose);
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) onClose();
    });

    tabEntrar?.addEventListener('click', () => { modoAba = 'entrar'; render(); });
    tabCadastro?.addEventListener('click', () => { modoAba = 'cadastro'; render(); });

    // Submit Login
    const formLogin = container.querySelector('#form-login-existente');
    formLogin?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = (container.querySelector('#login-email') as HTMLInputElement).value;
      const resultado = onLogin(email);

      if (!resultado.sucesso) {
        const erroEl = container.querySelector('#login-erro');
        if (erroEl) {
          erroEl.textContent = resultado.mensagem || 'E-mail não encontrado. Crie uma conta!';
          erroEl.classList.remove('hidden');
        }
      }
    });

    // Submit Cadastro
    const formCadastro = container.querySelector('#form-novo-cadastro');
    formCadastro?.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = (container.querySelector('#cadastro-nome') as HTMLInputElement).value;
      const email = (container.querySelector('#cadastro-email') as HTMLInputElement).value;
      onRegister(nome, email);
    });
  };

  render();
}
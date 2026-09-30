import { criarModalLogin } from '../components/modalLogin';
import { registrarLoginSucesso } from '../analytics/dataLayer';
import { criarModalPreferencias } from '../components/modalPreferencias';
import { obterCategoriasSidebar } from '../utils/categoria';
import { 
  fazerLogin, 
  cadastrarUsuario, 
  atualizarPreferenciasUsuario, 
  type Usuario 
} from '../services/userService';

/**
 * Gerencia a abertura e submissão do Modal de Login / Cadastro
 */
export function abrirModalLogin(
  container: HTMLElement, 
  onSuccess: (usuario: Usuario) => void,
  onAbrirPreferenciasAposCadastro?: (usuario: Usuario) => void
): void {
  criarModalLogin(
    container,
    // 1. Callback de Login
    (email) => {
      const resultado = fazerLogin(email);
      if (resultado.sucesso && resultado.usuario) {
        
        // ⚡ DISPARO DO ANALYTICS - LOGIN SUCESSO (ID-03)
        registrarLoginSucesso(
          resultado.usuario.id,
          {
            screenName: 'modal:login',
            screenSection: 'autenticacao'
          },
          {
            clickText: 'Entrar',
            clickContext: 'modal:login'
          }
        );

        container.innerHTML = '';
        onSuccess(resultado.usuario);
      }
      return resultado;
    },
    // 2. Callback de Cadastro
    (nome, email) => {
      const novoUsuario = cadastrarUsuario(nome, email);
      
      // ⚡ DISPARO DO ANALYTICS - CADASTRO/LOGIN SUCESSO (ID-03)
      registrarLoginSucesso(
        novoUsuario.id,
        {
          screenName: 'modal:cadastro',
          screenSection: 'autenticacao'
        },
        {
          clickText: 'cadastrar',
          clickContext: 'modal:cadastro'
        }
      );

      container.innerHTML = '';
      onSuccess(novoUsuario);
      if (onAbrirPreferenciasAposCadastro) {
        onAbrirPreferenciasAposCadastro(novoUsuario);
      }
    },
    // 3. Callback de Fechar Modal
    () => {
      container.innerHTML = '';
    }
  );
}

/**
 * Gerencia a abertura e salvamento do Modal de Preferências
 */
export function abrirModalPreferencias(
  container: HTMLElement, 
  usuario: Usuario, 
  onSave: (usuarioAtualizado: Usuario) => void
): void {
  const categorias = obterCategoriasSidebar();

  criarModalPreferencias(
    container,
    categorias,              // 1. Lista com todas as categorias disponíveis
    usuario.preferencias,    // 2. Lista com as preferências já salvas do usuário
    // 3. Callback ao Salvar
    (novasPreferencias) => {
      const usuarioAtualizado = atualizarPreferenciasUsuario(usuario, novasPreferencias);
      container.innerHTML = '';
      onSave(usuarioAtualizado);
    },
    // 4. Callback ao Fechar
    () => {
      container.innerHTML = '';
    }
  );
}

/**
 * Modal de Confirmação de Logout
 */
export function abrirModalLogout(
  container: HTMLElement, 
  onConfirmar: () => void
): void {
  container.innerHTML = `
    <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div class="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl space-y-4 text-center">
        <div class="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900">Encerrar sessão?</h3>
        <p class="text-sm text-gray-500">Você precisará fazer login novamente para acessar suas preferências e carrinho.</p>
        <div class="flex gap-3 pt-2">
          <button id="btn-cancelar-logout" class="flex-1 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
            Cancelar
          </button>
          <button id="btn-confirmar-logout" class="flex-1 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors">
            Sair
          </button>
        </div>
      </div>
    </div>
  `;

  document.querySelector('#btn-cancelar-logout')?.addEventListener('click', () => {
    container.innerHTML = '';
  });

  document.querySelector('#btn-confirmar-logout')?.addEventListener('click', () => {
    container.innerHTML = '';
    onConfirmar();
  });
}
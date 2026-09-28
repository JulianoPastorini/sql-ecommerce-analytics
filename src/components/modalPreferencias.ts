

import type { CategoriaSidebar } from '../types/categoria';
export function criarModalPreferencias(
  container: HTMLElement,
  categorias: CategoriaSidebar[],
  preferenciasAtuais: string[],
  onSave: (selecionadas: string[]) => void,
  onSkip: () => void
) {
  const checkboxesHTML = categorias.map(cat => {
    const isChecked = preferenciasAtuais.includes(cat.categoria) ? 'checked' : '';
    return `
      <label class="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
        <input type="checkbox" value="${cat.categoria}" class="categoria-checkbox w-5 h-5 text-blue-600 rounded focus:ring-blue-500" ${isChecked}>
        <span class="text-gray-700 font-medium">${cat.categoria}</span>
      </label>
    `;
  }).join('');

  container.innerHTML = `
    <div id="modal-pref-overlay" class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative">
        <h2 class="text-2xl font-bold mb-2 text-gray-800">Suas Preferências</h2>
        <p class="text-gray-600 mb-6 text-sm">Selecione <strong>até 3 categorias</strong> que você mais gosta para personalizarmos o seu menu.</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-h-[50vh] overflow-y-auto p-1">
          ${checkboxesHTML}
        </div>
        
        <div class="flex justify-between items-center mt-6 pt-4 border-t">
          <button id="btn-pular" class="text-gray-500 hover:text-gray-800 font-medium px-4 py-2">
            Pular
          </button>
          <button id="btn-salvar" class="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
            Salvar Preferências
          </button>
        </div>
      </div>
    </div>
  `;

  const checkboxes = container.querySelectorAll<HTMLInputElement>('.categoria-checkbox');
  const btnSalvar = container.querySelector<HTMLButtonElement>('#btn-salvar');
  const btnPular = container.querySelector<HTMLButtonElement>('#btn-pular');

  const atualizarEstado = () => {
    const marcados = Array.from(checkboxes).filter(cb => cb.checked);
    
    if (marcados.length >= 3) {
      checkboxes.forEach(cb => {
        if (!cb.checked) cb.disabled = true;
      });
    } else {
      checkboxes.forEach(cb => cb.disabled = false);
    }

    if (btnSalvar) {
      btnSalvar.disabled = marcados.length === 0;
    }
  };

  checkboxes.forEach(cb => cb.addEventListener('change', atualizarEstado));
  btnPular?.addEventListener('click', onSkip);
  btnSalvar?.addEventListener('click', () => {
    const marcados = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
    onSave(marcados);
  });

  atualizarEstado();
}
export function criarProvaSocial(): string {
  const avaliacoes = [
    {
      nome: 'Mariana Silva',
      cidade: 'São Paulo, SP',
      texto: 'Comprei o fone com cancelamento de ruído e chegou em 2 dias! Qualidade impecável e atendimento nota 10.',
      estrelas: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
    },
    {
      nome: 'Carlos Eduardo',
      cidade: 'Rio de Janeiro, RJ',
      texto: 'Produtos de altíssima qualidade. O processo de troca foi super tranquilo. Recomendo de olhos fechados!',
      estrelas: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    {
      nome: 'Fernanda Lima',
      cidade: 'Belo Horizonte, MG',
      texto: 'Gostei muito dos preços e da variedade. Salvei vários itens nos meus favoritos para a próxima compra.',
      estrelas: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    }
  ];

  return `
    <section class="py-12 bg-purple-900/5 -mx-4 px-4 sm:-mx-8 sm:px-8 rounded-3xl my-8">
      <div class="text-center max-w-xl mx-auto mb-8">
        <h2 class="text-2xl font-black text-gray-900 tracking-tight">O que nossos clientes dizem</h2>
        <p class="text-sm text-gray-600 mt-1">Mais de 50.000 entregas realizadas em todo o Brasil</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${avaliacoes.map(item => `
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="text-amber-400 text-sm">
                ${'★'.repeat(item.estrelas)}
              </div>
              <p class="text-gray-700 text-sm italic">"${item.texto}"</p>
            </div>
            <div class="flex items-center gap-3 pt-4 mt-4 border-t border-gray-50">
              <img src="${item.avatar}" alt="${item.nome}" class="w-10 h-10 rounded-full object-cover" />
              <div>
                <div class="font-bold text-gray-900 text-sm">${item.nome}</div>
                <div class="text-xs text-gray-400">${item.cidade}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}
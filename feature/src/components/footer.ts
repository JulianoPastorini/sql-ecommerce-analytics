export function criarFooter(): string {
  return `
    <footer class="bg-gray-900 text-gray-300 pt-12 pb-8 -mx-4 px-4 sm:-mx-8 sm:px-8 mt-12 rounded-t-3xl">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <!-- Sobre a Loja -->
        <div class="space-y-3">
          <div class="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white text-base">B</span>
            BUGIGANGA<span class="text-purple-500">.</span>
          </div>
          <p class="text-xs text-gray-400 leading-relaxed">
            Seu e-commerce completo para encontrar tudo o que você precisa com os melhores preços e entrega rápida em todo o Brasil.
          </p>
        </div>

        <!-- SAC / Atendimento -->
        <div>
          <h4 class="text-white font-bold text-sm mb-3">Atendimento ao Cliente (SAC)</h4>
          <ul class="space-y-2 text-xs text-gray-400">
            <li><a href="#" class="hover:text-white transition-colors">Central de Ajuda & FAQ</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Acompanhar Meu Pedido</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Trocas e Devoluções</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Políticas de Privacidade</a></li>
          </ul>
        </div>

        <!-- Contato -->
        <div>
          <h4 class="text-white font-bold text-sm mb-3">Fale Conosco</h4>
          <ul class="space-y-2 text-xs text-gray-400">
            <li>📞 <strong>Telefone:</strong> 0800 777 8899</li>
            <li>💬 <strong>WhatsApp:</strong> (11) 99999-8888</li>
            <li>✉️ <strong>E-mail:</strong> sac@bugiganga.com.br</li>
            <li>⏰ <strong>Horário:</strong> Seg a Sex das 8h às 20h</li>
          </ul>
        </div>

        <!-- Endereço -->
        <div>
          <h4 class="text-white font-bold text-sm mb-3">Endereço da Loja</h4>
          <p class="text-xs text-gray-400 leading-relaxed">
            Av. Paulista, 1000 - Bela Vista<br/>
            São Paulo - SP, CEP 01310-100<br/>
            CNPJ: 00.123.456/0001-89
          </p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
        © 2026 Bugiganga E-commerce. Todos os direitos reservados.
      </div>
    </footer>
  `;
}
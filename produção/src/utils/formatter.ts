const DICIONARIO_ACENTOS: Record<string, string> = {
  'acessorios': 'Acessórios',
  'eletronicos': 'Eletrônicos',
  'relogios': 'Relógios',
  'calcados': 'Calçados',
  'promocoes': 'Promoções',
  'tenis': 'Tênis',
  'saude': 'Saúde',
  'otica': 'Ótica',
  'joias': 'Jóias',
  'chapeus': 'Chapéus',
  'oculos': 'Óculos',
  'cameras': 'Câmeras'
};

// Remove acentos e converte para minúsculo
export function padronizarTexto(texto?: string | null): string {
  if (!texto) return '';
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

// Formata nomes para exibição na interface
export function formatarNome(texto?: string | null): string {
  if (!texto) return '';

  return texto
    .split(/[-_ ]+/)
    .map(palavra => {
      const palavraMin = padronizarTexto(palavra);
      if (DICIONARIO_ACENTOS[palavraMin]) {
        return DICIONARIO_ACENTOS[palavraMin];
      }
      return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
    })
    .join(' ');
}

// Obtém o código/termo da campanha a partir dos parâmetros da URL
export function obterCodigoCampanha(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get('cid') || params.get('utm_campaign') || params.get('campanha') || 'orgânico';
}

/**
 * Formata um valor numérico para a moeda brasileira (ex: 149.9 -> "R$ 149,90")
 */
export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}
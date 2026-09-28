/**
 * src/types/produto.ts
 * Contrato de Dados para Entidade de Produto
 */

export interface EspecificacaoProduto {
  [key: string]: string;
}

export interface Produto {
 id: string;
  name: string;
  description: string;
  price: number;
  rating?: number;
  image: string;
  category: string;
  subcategory?: string;
  specs?: Record<string, string>;
  isFavorito?: boolean;
}
import type { Produto } from '../types/produto';
import { padronizarTexto } from './formatter';

export function filtrarProdutos(
  produtos: Produto[],
  categoriaAtiva: string | null,
  subcategoriaAtiva: string | null,
  termoBuscaAtivo: string
): Produto[] {
  return produtos.filter((prod) => {
    // 1. Filtro por Categoria
    if (categoriaAtiva && categoriaAtiva !== 'all') {
      const catProd = padronizarTexto(prod.category);
      const catFiltro = padronizarTexto(categoriaAtiva);
      
      if (catProd !== catFiltro) {
        return false;
      }
    }

    // 2. Filtro por Subcategoria
    if (subcategoriaAtiva) {
      const subProd = prod.subcategory ? padronizarTexto(prod.subcategory) : '';
      const subFiltro = padronizarTexto(subcategoriaAtiva);

      if (subProd !== subFiltro) {
        return false;
      }
    }

    // 3. Filtro por Busca (Nome, Descrição, Categoria e Subcategoria)
    if (termoBuscaAtivo && termoBuscaAtivo.trim() !== '') {
      const termo = padronizarTexto(termoBuscaAtivo);
      const nome = padronizarTexto(prod.name);
      const desc = padronizarTexto(prod.description);
      const cat = padronizarTexto(prod.category);
      const sub = prod.subcategory ? padronizarTexto(prod.subcategory) : '';

      const combina =
        nome.includes(termo) ||
        desc.includes(termo) ||
        cat.includes(termo) ||
        sub.includes(termo);

      if (!combina) {
        return false;
      }
    }

    return true;
  });
}
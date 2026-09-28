import { catalogo } from '../data/catalogo';
import type { CategoriaSidebar } from '../types/categoria';
import { formatarNome } from './formatter';

export function obterCategoriasSidebar(): CategoriaSidebar[] {
  const mapaCategorias = new Map<string, Set<string>>();

  catalogo.forEach((produto: any) => {
    const rawCat = produto.categoria || produto.category || produto.specs?.['Categoria'];
    const rawSub = produto.subcategoria || produto.subcategory || produto.specs?.['Subcategoria'];

    if (rawCat) {
      const catFormatada = formatarNome(rawCat);
      if (!mapaCategorias.has(catFormatada)) {
        mapaCategorias.set(catFormatada, new Set());
      }
      if (rawSub) {
        mapaCategorias.get(catFormatada)!.add(formatarNome(rawSub));
      }
    }
  });

  return Array.from(mapaCategorias.entries()).map(([categoria, subcategoriasSet]) => ({
    categoria,
    subcategorias: Array.from(subcategoriasSet)
  }));
}
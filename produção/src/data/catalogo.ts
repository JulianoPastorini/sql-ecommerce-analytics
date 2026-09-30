/**
 * src/data/catalogo.ts
 * Catálogo completo com 243 produtos distribuídos nas 9 categorias da aplicação
 */

import type { Produto } from '../types/produto';

// Base de dados de imagens e templates por subcategoria
const bancoImagens: Record<string, { fotos: string[]; nomes: string[]; desc: string }> = {
  // ELETRÔNICOS
  'audio': {
    fotos: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80'
    ],
    nomes: ['Fone Noise Cancelling', 'Caixa de Som Bluetooth', 'Headset Gamer Pro', 'Earbuds TWS Wireless'],
    desc: 'Qualidade de som impecável com isolamento acústico e graves profundos.'
  },
  'smartphones': {
    fotos: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80'
    ],
    nomes: ['Smartphone Pro Max 256GB', 'Smartphone Ultra 5G', 'Smartphone Lite Edition'],
    desc: 'Processador de última geração, tela OLED de alta frequência e conjunto de câmeras avançado.'
  },
  'wearables': {
    fotos: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    nomes: ['Smartwatch Fit Health', 'Pulseira Inteligente Sport', 'Relógio Conectado Titanium'],
    desc: 'Monitoramento contínuo de frequência cardíaca, GPS integrado e resistência à água.'
  },

  // VESTUÁRIO
  'masculino': {
    fotos: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80'
    ],
    nomes: ['Camiseta Algodão Egípcio Minimal', 'Jaqueta Jeans Slim Fit', 'Casaco Moletom Urbano'],
    desc: 'Modelagem moderna, tecido de alta durabilidade e conforto para o dia a dia.'
  },
  'feminino': {
    fotos: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    nomes: ['Vestido Midi Elegante', 'Blazer Estruturado Alfaiataria', 'Blusa de Tricô Premium'],
    desc: 'Caimento impecável, estilo versátil e toque macio para compor diversos looks.'
  },
  'infantil': {
    fotos: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80'
    ],
    nomes: ['Conjunto Infantil Algodão Doce', 'Jaqueta Divertida com Capuz'],
    desc: 'Tecido hipoalergênico, confortável e resistente para acompanhar todas as brincadeiras.'
  },

  // CALÇADOS
  'esportivos': {
    fotos: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
    ],
    nomes: ['Tênis de Corrida Zoom Pro', 'Tênis Ultraboost Performance'],
    desc: 'Sistema de amortecimento de alta resposta e cabedal em mesh respirável.'
  },
  'casual': {
    fotos: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    nomes: ['Tênis Classic Streetwear', 'Sapatênis Couro Legítimo'],
    desc: 'Design atemporal que combina perfeitamente com qualquer ocasião informal.'
  },

  // ACESSÓRIOS
  'mochilas': {
    fotos: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    nomes: ['Mochila Executiva Impermeável 25L', 'Mochila Urbana para Notebook'],
    desc: 'Compartimento acolchoado para laptop, porta USB e tecido resistente a rasgos.'
  },
  'relogios': {
    fotos: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'
    ],
    nomes: ['Relógio Cronógrafo Masculino Aço', 'Relógio Minimalista Rose Gold'],
    desc: 'Mecanismo de alta precisão, vidro em cristal mineral e pulseira reforçada.'
  },

  // CASA E DECORAÇÃO
  'cozinha': {
    fotos: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80'
    ],
    nomes: ['Cafeteira Espresso Automática', 'Jogo de Panelas Antiaderente Ceramic'],
    desc: 'Praticidade e sofisticação para preparar suas receitas favoritas na cozinha.'
  },
  'iluminacao': {
    fotos: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
    ],
    nomes: ['Luminária Articulada de Mesa', 'Lustre Pendente Escandinavo'],
    desc: 'Iluminação aconchegante com design moderno para transformar seu ambiente.'
  },

  // GAMES E GEEK
  'consoles': {
    fotos: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80'
    ],
    nomes: ['Console Next-Gen 1TB SSD', 'Console Portátil HD OLED'],
    desc: 'A melhor experiência em jogos com gráficos em 4K e carregamento ultrarrápido.'
  },
  'perifericos': {
    fotos: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'
    ],
    nomes: ['Teclado Mecânico RGB Hot-Swap', 'Mouse Gamer 16.000 DPI Precision'],
    desc: 'Tempo de resposta mínimo e ergonomia avançada para partidas competitivas.'
  },

  // ESPORTE E LAZER
  'fitness': {
    fotos: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
    ],
    nomes: ['Kit Dumbbells Emborrachados', 'Tapete de Yoga Antiderrapante Premium'],
    desc: 'Equipamentos de alta resistência para seus treinos em casa ou na academia.'
  },

  // BELEZA E CUIDADOS
  'skincare': {
    fotos: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    nomes: ['Sérum Facial Hidratante Ácido Hialurônico', 'Kit Cuidado Facial Completo'],
    desc: 'Fórmula dermatologicamente testada para hidratação e firmeza da pele.'
  },

  // LIVROS E PAPELARIA
  'ficcao': {
    fotos: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    nomes: ['Livro: As Crônicas do Tempo (Hardcover)', 'Bestseller: O Mistério das Sombras'],
    desc: 'Edição especial encadernada em capa dura com ilustrações exclusivas.'
  }
};

// Definição das 9 categorias e suas subcategorias
const estruturaCategorias = [
  { cat: 'eletronicos', nomeCat: 'Eletrônicos', subs: ['audio', 'smartphones', 'wearables'] },
  { cat: 'vestuario', nomeCat: 'Vestuário', subs: ['masculino', 'feminino', 'infantil'] },
  { cat: 'calcados', nomeCat: 'Calçados', subs: ['esportivos', 'casual'] },
  { cat: 'acessorios', nomeCat: 'Acessórios', subs: ['mochilas', 'relogios'] },
  { cat: 'casa-e-decoracao', nomeCat: 'Casa e Decoração', subs: ['cozinha', 'iluminacao'] },
  { cat: 'esporte-e-lazer', nomeCat: 'Esporte e Lazer', subs: ['fitness'] },
  { cat: 'beleza-e-cuidados', nomeCat: 'Beleza e Cuidados', subs: ['skincare'] },
  { cat: 'games-e-geek', nomeCat: 'Games e Geek', subs: ['consoles', 'perifericos'] },
  { cat: 'livros-e-papelaria', nomeCat: 'Livros e Papelaria', subs: ['ficcao'] }
];

// Gerador Automático para atingir exatamente 243 produtos reais
function gerarCatalogoCompleto(): Produto[] {
  const lista: Produto[] = [];
  const TOTAL_PRODUTOS = 243;
  let contador = 1;

  while (lista.length < TOTAL_PRODUTOS) {
    for (const catObj of estruturaCategorias) {
      for (const subSlug of catObj.subs) {
        if (lista.length >= TOTAL_PRODUTOS) break;

        const info = bancoImagens[subSlug] || bancoImagens['audio'];
        const fotoIndex = contador % info.fotos.length;
        const nomeIndex = contador % info.nomes.length;

        const precoBase = Math.floor((contador * 37) % 1200) + 49.9;
        const avaliacao = Number((4 + (contador % 10) / 10).toFixed(1));

        const prod: Produto = {
          id: `${catObj.cat}-${subSlug}-${String(contador).padStart(3, '0')}`,
          name: `${info.nomes[nomeIndex]} Mod. ${contador}`,
          description: info.desc,
          price: precoBase,
          rating: avaliacao > 5 ? 5.0 : avaliacao,
          image: info.fotos[fotoIndex],
          category: catObj.cat,
          subcategory: subSlug,
          specs: {
            Categoria: catObj.nomeCat,
            Subcategoria: subSlug.charAt(0).toUpperCase() + subSlug.slice(1),
            Código: `PRD-${contador}`
          }
        };

        lista.push(prod);
        contador++;
      }
    }
  }

  return lista;
}

export const catalogo: Produto[] = gerarCatalogoCompleto();
import { catalogo } from '../data/catalogo';
import { registrarPageView } from '../analytics/dataLayer';
import { criarHeader } from '../components/header';
import { criarSidebar } from '../components/sidebar';
import { criarVitrine } from '../components/vitrine';
import { obterCategoriasSidebar } from '../utils/categoria';
import { filtrarProdutos } from '../utils/filtro';
import { padronizarTexto } from '../utils/formatter';
import { configurarAcoesBotoes } from './buttonController';
import { abrirModalLogin, abrirModalPreferencias, abrirModalLogout } from './modalController';
import { adicionarItemAoCarrinho, atualizarBadgeCarrinho } from '../services/cartService';
import { obterUsuarioAtual, removerSessaoAtiva, type Usuario } from '../services/userService';
import { renderizarPDP } from '../components/pdp';
import { renderizarFavoritos } from '../components/favoritos';
import { renderizarCarrinho } from '../components/carrinho';
import { renderizarCheckout } from '../components/checkout';

export function inicializarApp(): void {
  // Estado Global
  let categoriaAtiva: string | null = null;
  let subcategoriaAtiva: string | null = null;
  let termoBuscaAtivo: string = '';
  let usuarioLogado: Usuario | null = obterUsuarioAtual();

  // Mapeamento DOM
  const headerEl = document.querySelector<HTMLElement>('#header-container')!;
  const sidebarEl = document.querySelector<HTMLElement>('#sidebar-container')!;
  const vitrineEl = document.querySelector<HTMLElement>('#vitrine-container')!;
  const modalEl = document.querySelector<HTMLElement>('#modal-container')!;
  const modalPrefEl = document.querySelector<HTMLElement>('#modal-pref-container')!;

  // Funções do App
  const abrirPDP = (produtoId: string) => {
    const produto = catalogo.find((p) => p.id === produtoId);
    if (produto) {
      registrarPageView(
        'pdp',
        usuarioLogado ? 'Logado' : 'Anônimo',
        {
          screenName: `pdp:${produtoId}`,
          screenSection: 'produtos'
        },
        usuarioLogado?.id
      );
      renderizarPDP(vitrineEl, produto, () => voltarParaHome());
    }
  };

  const abrirTelaFavoritos = () => {
    if (!usuarioLogado) {
      abrirModalLogin(modalEl, (user) => {
        usuarioLogado = user;
        atualizarTudo();
        registrarPageView(
          'favoritos',
          'Logado',
          {
            screenName: 'favoritos',
            screenSection: 'minha-conta'
          },
          usuarioLogado.id
        );
        renderizarFavoritos(vitrineEl, catalogo, usuarioLogado, () => voltarParaHome());
      });
      return;
    }

    registrarPageView(
      'favoritos',
      'Logado',
      {
        screenName: 'favoritos',
        screenSection: 'minha-conta'
      },
      usuarioLogado.id
    );
    renderizarFavoritos(vitrineEl, catalogo, usuarioLogado, () => voltarParaHome());
  };

  const abrirTelaCarrinho = () => {
    registrarPageView(
      'carrinho',
      usuarioLogado ? 'Logado' : 'Anônimo',
      {
        screenName: 'carrinho',
        screenSection: 'checkout'
      },
      usuarioLogado?.id
    );

    renderizarCarrinho(
      vitrineEl,
      () => voltarParaHome(),
      () => abrirTelaCheckout()
    );
  };

  // 🔒 TELA DE CHECKOUT PROTEGIDA
const abrirTelaCheckout = () => {
  if (!usuarioLogado) {
    abrirModalLogin(modalEl, (user) => {
      usuarioLogado = user;
      
      // 1. Atualiza apenas a barra do header e estado (sem recarregar vitrines/home)
      renderizarHeader();
      renderizarSidebar();
      
      // 2. Regista o PageView do Checkout
      registrarPageView(
        'checkout',
        'Logado',
        {
          screenName: 'checkout:pagamento',
          screenSection: 'checkout'
        },
        usuarioLogado.id
      );
      
      // 3. Renderiza o checkout
      renderizarCheckout(vitrineEl, () => voltarParaHome());
    });
    return;
  }

  // Utilizador já logado
  registrarPageView(
    'checkout',
    'Logado',
    {
      screenName: 'checkout:pagamento',
      screenSection: 'checkout'
    },
    usuarioLogado?.id
  );
  renderizarCheckout(vitrineEl, () => voltarParaHome());
};

  const atualizarTudo = () => {
    renderizarHeader();
    renderizarSidebar();
    atualizarVitrine();
    atualizarBadgeCarrinho();
  };

  const renderizarHeader = () => {
    criarHeader(
      headerEl,
      (termo) => {
        termoBuscaAtivo = padronizarTexto(termo);
        atualizarVitrine();
      },
      () => abrirModalLogin(modalEl, (user) => { usuarioLogado = user; atualizarTudo(); }),
      usuarioLogado,
      () => abrirModalLogout(modalEl, () => realizarLogout()),
      () => {}
    );
  };

  const renderizarSidebar = () => {
    criarSidebar(
      sidebarEl,
      obterCategoriasSidebar(),
      !!usuarioLogado,
      usuarioLogado?.preferencias || [],
      (categoria, subcategoria) => {
        categoriaAtiva = categoria;
        subcategoriaAtiva = subcategoria;
        atualizarVitrine();
      },
      () => {
        if (usuarioLogado) {
          abrirModalPreferencias(modalPrefEl, usuarioLogado, (usuarioAtualizado) => {
            usuarioLogado = usuarioAtualizado;
            renderizarSidebar();
          });
        }
      }
    );
  };

  const atualizarVitrine = () => {
    const produtosFiltrados = filtrarProdutos(catalogo, categoriaAtiva, subcategoriaAtiva, termoBuscaAtivo);
    
    criarVitrine(vitrineEl, produtosFiltrados, {
      categoriaAtiva,
      subcategoriaAtiva,
      termoBuscaAtivo,
      aoVoltarHome: () => voltarParaHome(),
      aoFiltrarCategoria: (categoria) => {
        categoriaAtiva = categoria;
        subcategoriaAtiva = null;
        atualizarVitrine();
      }
    });
  };

  const voltarParaHome = () => {
    categoriaAtiva = null;
    subcategoriaAtiva = null;
    termoBuscaAtivo = '';
    atualizarTudo();
    registrarPageView(
      'home',
      usuarioLogado ? 'Logado' : 'Anônimo',
      {
        screenName: 'home:vitrine',
        screenSection: 'home'
      },
      usuarioLogado?.id
    );
  };

  const realizarLogout = () => {
    usuarioLogado = null;
    removerSessaoAtiva();
    voltarParaHome();
  };

  // Inicialização do App
  atualizarTudo();
  registrarPageView(
    'home',
    usuarioLogado ? 'Logado' : 'Anônimo',
    {
      screenName: 'home:vitrine',
      screenSection: 'home'
    },
    usuarioLogado?.id
  );

  // Registro do Controlador de Botões
  configurarAcoesBotoes(document.body, {
    irParaHome: () => voltarParaHome(),
    
    irParaFavoritos: () => abrirTelaFavoritos(),
    
    irParaCarrinho: () => abrirTelaCarrinho(),

    irParaCheckout: () => abrirTelaCheckout(),

    comprarAgora: (produtoId: string) => {
      const prod = catalogo.find(p => p.id === produtoId);
      if (prod) {
        adicionarItemAoCarrinho(prod);
        atualizarBadgeCarrinho();
        abrirTelaCheckout();
      }
    },

    adicionarAoCarrinho: (produtoId: string) => {
      const prod = catalogo.find(p => p.id === produtoId);
      if (prod) {
        adicionarItemAoCarrinho(prod);
        atualizarBadgeCarrinho();
      }
    },

    favoritarProduto: (produtoId: string) => {
      if (!usuarioLogado) {
        abrirModalLogin(modalEl, (user) => {
          usuarioLogado = user;
          atualizarTudo();
        });
        return;
      }

      const prod = catalogo.find(p => p.id === produtoId);
      if (prod) {
        prod.isFavorito = !prod.isFavorito;
        atualizarVitrine();
      }
    },

    abrirPDP: (produtoId: string) => abrirPDP(produtoId),

    solicitarLogout: () => abrirModalLogout(modalEl, () => realizarLogout()),

    abrirModalPreferences: () => {
      if (usuarioLogado) {
        abrirModalPreferencias(modalPrefEl, usuarioLogado, (usuarioAtualizado) => {
          usuarioLogado = usuarioAtualizado;
          renderizarSidebar();
        });
      }
    },

    trocarConta: () => {
      realizarLogout();
      abrirModalLogin(modalEl, (user) => { usuarioLogado = user; atualizarTudo(); });
    }
  });
}
/**
 * src/analytics/dataLayer.ts
 */

import type { DataLayerPayload, EventInfo, PageType } from '../types/sdr';
import { obterCodigoCampanha, padronizarTexto } from '../utils/formatter';

window.adobeDataLayer = window.adobeDataLayer || [];
const dataLayer = window.adobeDataLayer;

export function dispararEvento(payload: DataLayerPayload): void {
  dataLayer.push(payload);
}

// ----------------------------------------------------
// INTERFACES DE CONTEXTO
// ----------------------------------------------------
export interface ContextoTela {
  screenName: string;     // Ex: 'pdp:calcados:sapatonis-v2'
  screenSection: string;  // Ex: 'calcados_casual'
}

export interface ContextoClique {
  clickText: string;      // Ex: 'Comprar Agora', 'Entrar'
  clickContext: string;   // Ex: 'card_vitrine', 'header_menu', 'pdp_hero'
}

export interface ItemCompraDataLayer {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Controladores de Trava (Debounce) contra disparos duplicados
let ultimoHitTime = 0;
let ultimaTelaRegistrada = '';

// ----------------------------------------------------
// 1. PAGE VIEW (Carrega Screen Name e Screen Section)
// ----------------------------------------------------
export function registrarPageView(
  pageType: PageType, 
  authStatus: 'Logado' | 'Anônimo', 
  tela?: ContextoTela,
  userId?: string
): void {
  const agora = Date.now();
  const nomeTela = tela?.screenName || pageType;

  // 🛡️ Trava contra chamadas duplicadas no mesmo clique (intervalo menor que 400ms)
  if (nomeTela === ultimaTelaRegistrada && (agora - ultimoHitTime) < 400) {
    console.warn(`[Analytics] Hit duplicado bloqueado para a tela: ${nomeTela}`);
    return;
  }

  ultimoHitTime = agora;
  ultimaTelaRegistrada = nomeTela;

  console.trace('🔍 PAGE VIEW DISPARADO POR:');
  const cid = obterCodigoCampanha();

  const eventInfo: EventInfo = {
    page: {
      pageType,
      screenName: tela?.screenName,
      screenSection: tela?.screenSection
    },
    user: {
      authStatus,
      ...(userId && { id: padronizarTexto(userId) })
    }
  };

  if (cid) {
    eventInfo.campaign = {
      code: cid
    };
  }

  dispararEvento({
    event: 'page_view',
    eventInfo
  });
}

// ----------------------------------------------------
// 2. CHECKOUT / COMPRA (Carrega Screen + User + Ecommerce)
// ----------------------------------------------------
export function registrarCompraSucesso(
  transactionId: string,
  total: number,
  authStatus: 'Logado' | 'Anônimo',
  items: ItemCompraDataLayer[],
  tela: ContextoTela,
  userId?: string
): void {
  const cid = obterCodigoCampanha();

  dispararEvento({
    event: 'purchaseValidado',
    eventInfo: {
      page: {
        screenName: tela.screenName,
        screenSection: tela.screenSection
      },
      user: {
        authStatus,
        ...(userId && { id: padronizarTexto(userId) })
      },
      ...(cid && { campaign: { code: cid } })
    },
    ecommerce: {
      purchase: {
        actionField: {
          id: transactionId,
          revenue: total
        },
        products: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      }
    }
  } as unknown as DataLayerPayload);
}

// ----------------------------------------------------
// 3. LOGIN (ID-03: Carrega Screen + Click Context completo)
// ----------------------------------------------------
export function registrarLoginSucesso(
  userId: string,
  tela: ContextoTela,
  clique: ContextoClique
): void {
  dispararEvento({
    event: 'user_login_success',
    eventInfo: {
      user: {
        authStatus: 'Logado',
        id: padronizarTexto(userId)
      },
      page: {
        screenName: tela.screenName,
        screenSection: tela.screenSection
      },
      interaction: {
        clickText: clique.clickText,
        clickContext: clique.clickContext
      }
    }
  } as unknown as DataLayerPayload);
}
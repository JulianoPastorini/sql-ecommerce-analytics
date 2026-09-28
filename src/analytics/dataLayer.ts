/**
 * src/analytics/dataLayer.ts
 */

import type { DataLayerPayload, EventInfo, PageType } from '../types/sdr';
import { obterCodigoCampanha, padronizarTexto } from '../utils/formatter';

// Garante que a propriedade existe na window sem erros de tipagem
window.adobeDataLayer = window.adobeDataLayer || [];
const dataLayer = window.adobeDataLayer;

export function dispararEvento(payload: DataLayerPayload): void {
  dataLayer.push(payload);
}

// ----------------------------------------------------
// SUA FUNÇÃO ORIGINAL (INTACTA)
// ----------------------------------------------------
export function registrarPageView(
  pageType: PageType, 
  authStatus: 'Logado' | 'Anônimo', 
  userId?: string
): void {
  const cid = obterCodigoCampanha();

  const eventInfo: EventInfo = {
    page: {
      pageType
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
// NOVA FUNÇÃO PARA A PERGUNTA 4 (ID-02) / CHECKOUT
// ----------------------------------------------------
export interface ItemCompraDataLayer {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function registrarCompraSucesso(
  transactionId: string,
  total: number,
  authStatus: 'Logado' | 'Anônimo',
  items: ItemCompraDataLayer[],
  userId?: string
): void {
  const cid = obterCodigoCampanha();

  dispararEvento({
    event: 'purchaseValidado',
    eventInfo: {
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
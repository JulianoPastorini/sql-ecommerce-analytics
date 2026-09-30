/**
 * src/types/sdr.ts
 * Contrato de Dados - Adobe Analytics SDR
 */

// Tipos permitidos para tipos de tela (prop1)
export type PageType = 
  | 'home' 
  | 'favoritos' 
  | 'carrinho' 
  | 'checkout' 
  | 'pdp' 
  | 'search' 
  | 'other';

// Tipos de status de autenticação (eVar3)
export type AuthStatus = 'Logado' | 'Anônimo';

// Estrutura das variáveis globais de contexto
export interface EventInfo {
  page?: {
    pageType: PageType;       // prop1
    screenName?: string;     // Nome da tela/página detalhado
    screenSection?: string;  // Seção/Categoria da aplicação
  };
  user?: {
    authStatus: AuthStatus;  // eVar3
    id?: string;             // eVar2 (Visitor expiration)
    preferences?: string;    // eVar4 (formato "cat1:cat2")
  };
  campaign?: {
    code?: string;           // eVar1 / Tracking Code (cid)
  };
  interaction?: {
    clickSource?: string;    // prop6
    clickText?: string;      // CTA exato clicado (ex: 'Comprar Agora', 'Entrar')
    clickContext?: string;   // Componente/Localização (ex: 'card_vitrine', 'pdp_hero')
  };
  search?: {
    term?: string;           // prop5 e eVar5
  };
}

// Nomes de eventos suportados pelo Data Layer
export type EventName = 
  | 'page_view'
  | 'user_login_success'  // event1
  | 'preferences_saved'   // event2
  | 'preferences_skipped' // event3
  | 'search_executed'     // event4
  | 'product_click'
  | 'purchaseValidado';   // Adicionado para a regra de compra

// Estrutura padronizada de cada item enviado ao adobeDataLayer
export interface DataLayerPayload {
  event: EventName;
  eventInfo?: EventInfo;
  ecommerce?: Record<string, unknown>; // Suporte para o objeto de checkout/purchase
}

// Declaração do objeto global para a Fila da Adobe
declare global {
  interface Window {
    adobeDataLayer?: DataLayerPayload[];
  }
}
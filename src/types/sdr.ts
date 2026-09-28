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
    pageType: PageType; // prop1
  };
  user?: {
    authStatus: AuthStatus; // eVar3
    id?: string;            // eVar2 (Visitor expiration)
    preferences?: string;   // eVar4 (formato "cat1:cat2")
  };
  campaign?: {
    code?: string;          // eVar1 / Tracking Code (cid)
  };
  interaction?: {
    clickSource?: string;   // prop6
  };
  search?: {
    term?: string;          // prop5 e eVar5
  };
}

// Nomes de eventos suportados pelo Data Layer
export type EventName = 
  | 'page_view'
  | 'user_login_success'  // event1
  | 'preferences_saved'   // event2
  | 'preferences_skipped' // event3
  | 'search_executed'     // event4
  | 'product_click';

// Estrutura padronizada de cada item enviado ao adobeDataLayer
export interface DataLayerPayload {
  event: EventName;
  eventInfo?: EventInfo;
}

// Declaração do objeto global para a Fila da Adobe
declare global {
  interface Window {
    adobeDataLayer?: DataLayerPayload[];
  }
}
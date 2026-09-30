import './styles/main.css';
import { inicializarApp } from './controllers/appController';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  app.innerHTML = `
    <div id="header-container"></div>
    
    <main class="w-full px-6 sm:px-10 lg:px-12 py-8 max-w-[1600px] mx-auto">
      <div class="grid grid-cols-12 gap-8 lg:gap-10 items-start">
        <div id="sidebar-container" class="col-span-12 lg:col-span-4 xl:col-span-3 sticky top-24 z-10"></div>
        <div id="vitrine-container" class="col-span-12 lg:col-span-8 xl:col-span-9"></div>
      </div>
    </main>
    
    <div id="modal-container"></div>
    <div id="modal-pref-container"></div>
  `;

  // Inicializa toda a lógica de estado e controle da aplicação
  inicializarApp();
}
(function (window, document) {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    if (document.body.dataset.pageType === "traffic-control") return;

    var customerID = window.localStorage.getItem("ecommerce_customer_id") || "";
    document.querySelectorAll("[data-menu-user-id]").forEach(function (element) {
      element.textContent = customerID || "Sessão não identificada";
    });

    var button = document.createElement("a");
    button.className = "floating-start-button";
    button.href = "bem-vindo.html";
    button.textContent = "Início";
    button.title = "Voltar para Bem Vindo";
    button.setAttribute("aria-label", "Voltar para Bem Vindo");
    button.setAttribute("data-analytics-click", "voltar-inicio");
    button.addEventListener("click", function () {
      var activeCustomerID = window.localStorage.getItem("ecommerce_customer_id") || "";
      if (activeCustomerID.indexOf("ANON-") === 0 && window.carrinho) {
        window.carrinho.limpar();
      }
    });
    document.body.appendChild(button);
  });
})(window, document);
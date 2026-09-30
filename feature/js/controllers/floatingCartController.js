(function (window, document) {
  "use strict";

  function createButton() {
    var button = document.createElement("a");
    button.id = "floating-checkout";
    button.className = "floating-checkout";
    button.href = "carrinho.html";
    button.textContent = "Finalizar Compra";
    button.setAttribute("data-analytics-click", "finalizar-compra-flutuante");
    document.body.appendChild(button);
    return button;
  }

  function update(button, items) {
    button.classList.toggle("is-visible", items.length > 0);
  }

  function bindProductButtons() {
    document.addEventListener("click", function (event) {
      var button = event.target.closest("[data-add-to-cart]");
      if (!button) return;
        window.carrinho.adicionar({
          id: button.dataset.productId,
          nome: button.dataset.productName,
          preco: button.dataset.productPrice
        });
        button.textContent = "Adicionado";
        button.disabled = true;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var button = createButton();
    update(button, window.carrinho.obter());
    bindProductButtons();
    window.addEventListener("cart:updated", function (event) {
      update(button, event.detail.items);
    });
  });
})(window, document);
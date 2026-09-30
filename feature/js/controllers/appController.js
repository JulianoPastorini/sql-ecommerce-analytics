(function (window, document) {
  "use strict";

  function bindProduct() {
    var button = document.querySelector("[data-add-to-cart]");
    if (!button) return;
    button.addEventListener("click", function () {
      window.carrinho.adicionar({
        id: button.dataset.productId,
        nome: button.dataset.productName,
        preco: button.dataset.productPrice
      });
      alert("Produto adicionado ao carrinho!");
      window.location.href = "carrinho.html";
    });
  }

  function bindCart() {
    var container = document.getElementById("itens-carrinho");
    var total = document.getElementById("valor-total");
    var finish = document.getElementById("btn-finalizar");
    var clear = document.getElementById("btn-limpar-carrinho");
    if (!container) return;
    var cartUserName = document.getElementById("cart-user-name");
    if (cartUserName) {
      cartUserName.textContent = window.localStorage.getItem("ecommerce_user_name") || "cliente";
    }
    function renderCart() {
      var items = window.carrinho.obter();
      container.innerHTML = items.length
        ? "<ul class=\"cart-items\">" + items.map(function (item, index) {
          return "<li><span>" + item.nome + " - R$ " + item.preco + "</span>" +
            "<button type=\"button\" class=\"remove-cart-item\" data-cart-index=\"" + index + "\" data-analytics-click=\"remover-item\">Remover</button></li>";
        }).join("") + "</ul>"
        : "<p>Seu carrinho está vazio.</p>";
      total.textContent = window.carrinho.calcularTotal(items);
      finish.disabled = !items.length;
      clear.disabled = !items.length;
    }

    renderCart();
    container.addEventListener("click", function (event) {
      var button = event.target.closest("[data-cart-index]");
      if (button) window.carrinho.remover(Number(button.dataset.cartIndex));
    });
    window.addEventListener("cart:updated", renderCart);
    finish.addEventListener("click", function () {
      var items = window.carrinho.obter();
      if (!items.length) {
        alert("Adicione itens ao carrinho primeiro!");
        return;
      }
      window.analyticsDataLayer.push("checkoutStart", { cart: window.digitalData.cart });
      window.location.href = "login.html?return_to=checkout";
    });
    clear.addEventListener("click", function () {
      window.carrinho.limpar();
    });
  }

  function bindLogin() {
    var form = document.getElementById("form-login");
    if (!form) return;
    var customerID = window.localStorage.getItem("ecommerce_customer_id");
    var name = window.localStorage.getItem("ecommerce_user_name");
    var email = window.localStorage.getItem("ecommerce_user_email");
    var skip = document.getElementById("skip-login");
    var returnTo = new URLSearchParams(window.location.search).get("return_to");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      name = document.getElementById("nome-usuario").value.trim();
      email = document.getElementById("email-usuario").value;
      customerID = "CUST-" + window.btoa(email).substring(0, 8).toUpperCase();
      window.localStorage.setItem("ecommerce_user_name", name);
      window.localStorage.setItem("ecommerce_customer_id", customerID);
      window.localStorage.setItem("ecommerce_user_email", email);
      window.analyticsDataLayer.refresh();
      window.analyticsDataLayer.push("login", { user: window.digitalData.user });
      window.location.href = returnTo === "checkout" ? "sucesso.html" : "preferencias.html";
    });

    skip.addEventListener("click", function () {
      name = "Usuário Anônimo";
      email = "";
      customerID = "ANON-" + Date.now().toString(36).toUpperCase();
      window.localStorage.setItem("ecommerce_user_name", name);
      window.localStorage.setItem("ecommerce_customer_id", customerID);
      window.localStorage.setItem("ecommerce_user_email", email);
      window.analyticsDataLayer.refresh();
      window.analyticsDataLayer.push("anonymousLogin", { user: window.digitalData.user });
      window.location.href = returnTo === "checkout" ? "sucesso.html" : "preferencias.html";
    });
  }

  function bindPurchase() {
    var order = document.getElementById("numero-pedido");
    if (!order) return;
    var transactionID = "ORD-" + Math.floor(Math.random() * 1000000);
    var cart = window.carrinho.obter();
    window.digitalData.transaction = {
      transactionID: transactionID,
      profile: { profileInfo: { paymentMethod: "PIX" } },
      total: { transactionTotal: window.carrinho.calcularTotal(cart) }
    };
    order.textContent = transactionID;
    window.analyticsDataLayer.push("purchase", { transaction: window.digitalData.transaction });
    window.carrinho.limpar();
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindProduct();
    bindCart();
    bindLogin();
    bindPurchase();
  });
})(window, document);
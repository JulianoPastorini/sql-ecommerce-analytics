(function (window, document) {
  "use strict";

  function renderProducts(products) {
    var grid = document.getElementById("product-grid");
    grid.innerHTML = products.map(function (product) {
      return "<article class=\"home-product-card\">" +
        "<a href=\"produto.html?id=" + product.id + "\" data-analytics-click=\"ver-detalhes\" data-product-id=\"" + product.id + "\">" +
        "<img src=\"" + product.image + "\" alt=\"" + product.name + "\" loading=\"lazy\">" +
        "<h3 data-product-id=\"" + product.id + "\" data-product-name=\"" + product.name + "\" data-product-price=\"" + product.price.replace(",", ".") + "\">" + product.name + "</h3>" +
        "<p>R$ " + product.price + "</p></a>" +
        "<button type=\"button\" class=\"card-add-button\" data-add-to-cart data-product-id=\"" + product.id + "\" data-product-name=\"" + product.name + "\" data-product-price=\"" + product.price.replace(",", ".") + "\">Adicionar ao carrinho</button></article>";
    }).join("");
    grid.querySelectorAll("img").forEach(function (image) {
      image.addEventListener("error", function () {
        image.src = "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=700&q=80";
      }, { once: true });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var name = window.localStorage.getItem("ecommerce_user_name") || "cliente";
    var categories = window.preferencesService.get();
    document.getElementById("catalog-user-name").textContent = name;
    document.getElementById("catalog-user-categories").textContent = categories.length
      ? categories.join(" | ")
      : "Prefêrncias não informadas!";
    window.productCatalog = {
      render: renderProducts,
      getSource: function () { return window.productService.getAll(); }
    };
    renderProducts(window.productCatalog.getSource());
  });
})(window, document);
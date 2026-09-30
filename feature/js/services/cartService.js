// Persistencia e regras do carrinho. Nenhuma regra de analytics vive neste modulo.
(function (window) {
  "use strict";
  var STORAGE_KEY = "ecommerce_carrinho";

  function obter() {
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || [];
    } catch (error) {
      return [];
    }
  }

  function calcularTotal(carrinho) {
    return carrinho.reduce(function (total, item) {
      return total + Number(item.preco);
    }, 0).toFixed(2);
  }

  window.carrinho = {
    obter: obter,
    adicionar: function (item) {
      var itens = obter();
      itens.push(item);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
      window.dispatchEvent(new CustomEvent("cart:updated", { detail: { items: itens } }));
      if (window.analyticsDataLayer) {
        window.analyticsDataLayer.refresh();
        window.analyticsDataLayer.push("addToCart", { product: item });
      }
    },
    remover: function (index) {
      var itens = obter();
      var removed = itens.splice(index, 1)[0];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
      window.dispatchEvent(new CustomEvent("cart:updated", { detail: { items: itens } }));
      if (window.analyticsDataLayer) {
        window.analyticsDataLayer.refresh();
        window.analyticsDataLayer.push("removeFromCart", { product: removed });
      }
    },
    limpar: function () {
      window.localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent("cart:updated", { detail: { items: [] } }));
    },
    calcularTotal: calcularTotal
  };
})(window);
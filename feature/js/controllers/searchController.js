(function (window, document) {
  "use strict";

  function matches(product, term) {
    var searchable = [product.name].concat(product.categories || []).join(" ").toLowerCase();
    return searchable.indexOf(term.toLowerCase()) !== -1;
  }

  function renderSuggestions(suggestions, products, input) {
    suggestions.innerHTML = products.length
      ? products.map(function (product) {
        return "<li><button type=\"button\" data-search-value=\"" + product.name + "\">" + product.name + "</button></li>";
      }).join("")
      : "<li class=\"search-empty\">Nenhum item encontrado.</li>";
    suggestions.hidden = !input.value.trim();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var input = document.querySelector("[data-search-input]");
    var suggestions = document.querySelector("[data-search-suggestions]");
    if (!input || !suggestions || !window.productCatalog) return;

    function update() {
      var term = input.value.trim();
      var source = window.productCatalog.getSource();
      var filtered = term ? source.filter(function (product) { return matches(product, term); }) : source;
      window.productCatalog.render(filtered);
      renderSuggestions(suggestions, term ? source.filter(function (product) { return matches(product, term); }).slice(0, 6) : [], input);
    }

    input.addEventListener("input", update);
    suggestions.addEventListener("click", function (event) {
      var option = event.target.closest("[data-search-value]");
      if (!option) return;
      input.value = option.dataset.searchValue;
      update();
      input.focus();
    });
  });
})(window, document);
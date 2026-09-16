(function (window, document) {
  "use strict";

  function initialize() {
    var form = document.getElementById("preferences-form");
    var checkboxes = Array.prototype.slice.call(form.querySelectorAll("input[name='category']"));
    var feedback = document.getElementById("category-feedback");
    var submit = form.querySelector("button[type='submit']");
    var skip = document.getElementById("skip-preferences");
    var name = window.localStorage.getItem("ecommerce_user_name") || "cliente";

    document.getElementById("user-name").textContent = name;

    function updateState() {
      var selected = checkboxes.filter(function (checkbox) { return checkbox.checked; });
      submit.disabled = selected.length !== 3;
      feedback.textContent = selected.length === 3
        ? "Ótimo! Você selecionou 3 categorias."
        : "Selecione 3 categorias.";
    }

    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", updateState);
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var selected = checkboxes.filter(function (checkbox) { return checkbox.checked; }).map(function (checkbox) { return checkbox.value; });
      window.preferencesService.save(selected);
      window.analyticsDataLayer.push("preferencesSelected", {
        user: { name: name },
        preferences: { categories: selected }
      });
      window.location.href = "home.html";
    });

    skip.addEventListener("click", function () {
      window.preferencesService.clear();
      window.analyticsDataLayer.push("preferencesSkipped", {
        user: { name: name },
        preferences: { categories: [] }
      });
      window.location.href = "home.html";
    });
  }

  document.addEventListener("DOMContentLoaded", initialize);
})(window, document);
(function (window, document) {
  "use strict";

  function initialize() {
    var choices = document.querySelectorAll("[data-traffic-choice]");

    choices.forEach(function (choice) {
      choice.addEventListener("click", function () {
        var origin = choice.dataset.trafficChoice;

        window.analyticsDataLayer.push("trafficChoice", {
          traffic: { origin: origin }
        });
        window.location.href = window.trafficService.buildLoginUrl(origin);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", initialize);
})(window, document);
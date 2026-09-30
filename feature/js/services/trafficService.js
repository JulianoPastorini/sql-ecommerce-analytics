(function (window) {
  "use strict";

  window.trafficService = {
    buildLoginUrl: function (origin) {
      var params = new URLSearchParams({ traffic_origin: origin });
      return "login.html?" + params.toString();
    }
  };
})(window);
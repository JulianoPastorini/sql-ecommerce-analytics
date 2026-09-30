(function (window) {
  "use strict";

  var STORAGE_KEY = "ecommerce_user_categories";

  window.preferencesService = {
    save: function (categories) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    },
    clear: function () {
      window.localStorage.removeItem(STORAGE_KEY);
    },
    get: function () {
      try {
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || [];
      } catch (error) {
        return [];
      }
    }
  };
})(window);
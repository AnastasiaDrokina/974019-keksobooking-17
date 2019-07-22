'use strict';
(function () {
  window.card = function () {

    var onSuccess = function (data) {
      window.adverts = data;
      var results = data.slice(0, 5);
      window.map.displayButtons(results);
    };

    window.load('https://js.dump.academy/keksobooking/data', onSuccess, window.modal.onError);
  };
})();

'use strict';
(function () {
  window.getCard = function () {

    var onSuccess = function (data) {
      window.adverts = data;
      var results = data.slice(0, window.common.constants.MAX_RESULTS);
      window.common.map.displayButtons(results);
    };

    window.load('https://cors-anywhere.herokuapp.com/https://js.dump.academy/keksobooking/data', onSuccess, window.common.modal.onError);
  };
})();

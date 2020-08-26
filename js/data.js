'use strict';
(function () {
  window.getCard = function () {

    var onSuccess = function (data) {
      window.adverts = data;
      var results = data.slice(0, window.common.constants.MAX_RESULTS);
      window.common.map.displayButtons(results);
    };

    window.load('https://anastasiadrokina.github.io/974019-keksobooking-17/data/data.json', onSuccess, window.common.modal.onError);
  };
})();

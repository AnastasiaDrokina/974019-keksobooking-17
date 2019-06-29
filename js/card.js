'use strict';
(function () {
  window.card = function () {
    var onError = function () {
      var error = document.querySelector('#error').content.querySelector('.error');
      window.map.main.appendChild(error);
    };

    var onSuccess = function (data) {
      window.map.displayButtons(data);
    };

    window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
  };
})();

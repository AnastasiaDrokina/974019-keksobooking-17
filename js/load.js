'use strict';
(function () {
  window.load = function (url, onSuccess, onError) {
    var xhr = window.generateXHR(onSuccess, onError);

    xhr.open('GET', url);
    xhr.send();
  };
})();

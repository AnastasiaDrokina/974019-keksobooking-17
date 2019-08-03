'use strict';
(function () {
  window.upload = function (data, url, onSuccess, onError) {
    var xhr = window.generateXHR(onSuccess, onError);

    xhr.open('POST', url);
    xhr.send(data);
  };
})();

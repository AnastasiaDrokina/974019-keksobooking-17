'use strict';
(function () {
  var typeInput = document.querySelector('#housing-type');
  typeInput.addEventListener('change', function () {
    var typeFilters;

    if (typeInput.value === 'any') {
      typeFilters = window.adverts;
    } else {
      typeFilters = window.adverts.filter(function (advert) {
        return advert.offer.type === typeInput.value;
      });
    }
    var typeLimit = typeFilters.slice(0, 5);
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      pin.parentNode.removeChild(pin);
    });

    window.map.displayButtons(typeLimit);
    window.pin.closePopup();
  });
})();

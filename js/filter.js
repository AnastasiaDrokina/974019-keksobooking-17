'use strict';
(function () {
  var filtersInput = document.querySelectorAll('.map__filter, .map__checkbox');
  var featuresInput = document.querySelectorAll('.map__checkbox');

  var typeInput = document.querySelector('#housing-type');
  var priceInput = document.querySelector('#housing-price');
  var roomInput = document.querySelector('#housing-rooms');
  var guestInput = document.querySelector('#housing-guests');
  var lastTimeout;

  var checkType = function (advert) {
    if (typeInput.value === 'any') {
      return advert;
    } else {
      return advert.offer.type === typeInput.value;
    }
  };

  var checkPrice = function (advert) {
    if (priceInput.value === 'middle') {
      return advert.offer.price > 10000 && advert.offer.price < 50000;
    } else if (priceInput.value === 'low') {
      return advert.offer.price < 10000;
    } else if (priceInput.value === 'high') {
      return advert.offer.price > 50000;
    } else {
      return advert;
    }
  };

  var checkRoom = function (advert) {
    if (roomInput.value === 'any') {
      return advert;
    } else {
      return advert.offer.rooms === +roomInput.value;
    }
  };

  var checkGuest = function (advert) {
    if (guestInput.value === 'any') {
      return advert;
    } else {
      return advert.offer.guests === +guestInput.value;
    }
  };

  var checkFeatures = function (advert) {
    var keepAdvert = true;

    featuresInput.forEach(function (featureInput) {
      if (keepAdvert) {
        if (featureInput.checked) {
          if (advert.offer.features.indexOf(featureInput.value) >= 0) {
            keepAdvert = true;
          } else {
            keepAdvert = false;
          }
        } else {
          keepAdvert = true;
        }
      }
    });

    return keepAdvert;
  };

  var getFilteredAdverts = function () {
    var adverts = window.adverts.filter(function (advert) {
      return checkType(advert) && checkPrice(advert) && checkRoom(advert) && checkGuest(advert) && checkFeatures(advert);
    });
    return adverts;
  };

  var displayFiltereAdverts = function () {
    var adverts = getFilteredAdverts();
    var advertsLimit = adverts.slice(0, 5);
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      pin.parentNode.removeChild(pin);
    });

    window.map.displayButtons(advertsLimit);
    window.pin.closePopup();
  };

  var debounceDisplayFilteredAdverts = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(function () {
      displayFiltereAdverts();
    }, 500);
  };

  filtersInput.forEach(function (filterInput) {
    filterInput.addEventListener('change', function () {
      debounceDisplayFilteredAdverts();
    });
  });
})();


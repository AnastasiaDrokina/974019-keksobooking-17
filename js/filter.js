'use strict';
(function () {
  var typeInput = document.querySelector('#housing-type');
  var priceInput = document.querySelector('#housing-price');
  var roomInput = document.querySelector('#housing-rooms');
  var guestInput = document.querySelector('#housing-guests');
  var wifiInput = document.querySelector('#filter-wifi');
  var dishWasherInput = document.querySelector('#filter-dishwasher');
  var parkingInput = document.querySelector('#filter-parking');
  var washerInput = document.querySelector('#filter-washer');
  var elevatorInput = document.querySelector('#filter-elevator');
  var conditionerInput = document.querySelector('#filter-conditioner');
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

  var checkWifi = function (advert) {
    if (wifiInput.checked) {
      return advert.offer.features.indexOf(wifiInput.value) >= 0;
    } else {
      return advert;
    }
  };

  var checkDishWasher = function (advert) {
    if (dishWasherInput.checked) {
      return advert.offer.features.indexOf(dishWasherInput.value) >= 0;
    } else {
      return advert;
    }
  };

  var checkParking = function (advert) {
    if (parkingInput.checked) {
      return advert.offer.features.indexOf(parkingInput.value) >= 0;
    } else {
      return advert;
    }
  };

  var checWasher = function (advert) {
    if (washerInput.checked) {
      return advert.offer.features.indexOf(washerInput.value) >= 0;
    } else {
      return advert;
    }
  };

  var checkElevator = function (advert) {
    if (elevatorInput.checked) {
      return advert.offer.features.indexOf(elevatorInput.value) >= 0;
    } else {
      return advert;
    }
  };

  var checkConditioner = function (advert) {
    if (conditionerInput.checked) {
      return advert.offer.features.indexOf(conditionerInput.value) >= 0;
    } else {
      return advert;
    }
  };

  var getFilteredAdverts = function () {
    var adverts = window.adverts.filter(function (advert) {
      return checkType(advert) && checkPrice(advert) && checkRoom(advert) && checkGuest(advert) && checkWifi(advert) && checkDishWasher(advert) && checkParking(advert) && checWasher(advert) && checkElevator(advert) && checkConditioner(advert);
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

  // Фильтр по типу жилья
  typeInput.addEventListener('change', function () {
    debounceDisplayFilteredAdverts();
  });

  // Фильтр по цене
  priceInput.addEventListener('change', function () {
    debounceDisplayFilteredAdverts();
  });

  // Фильтр по числу комнат
  roomInput.addEventListener('change', function () {
    debounceDisplayFilteredAdverts();
  });

  // Фильтр по числу гостей
  guestInput.addEventListener('change', function () {
    debounceDisplayFilteredAdverts();
  });

  // Фильтр wifi
  wifiInput.addEventListener('change', function () {
    debounceDisplayFilteredAdverts();
  });

  // Фильтр dishwasher
  dishWasherInput.addEventListener('change', function () {
    debounceDisplayFilteredAdverts();
  });

  // Фильтр parking
  parkingInput.addEventListener('change', function () {
    debounceDisplayFilteredAdverts();
  });

  // Фильтр washer
  washerInput.addEventListener('change', function () {
    debounceDisplayFilteredAdverts();
  });

  // Фильтр elevator
  elevatorInput.addEventListener('change', function () {
    debounceDisplayFilteredAdverts();
  });

  // Фильтр conditioner
  conditionerInput.addEventListener('change', function () {
    debounceDisplayFilteredAdverts();
  });
})();


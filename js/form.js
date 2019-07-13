'use strict';
(function () {
  // Функция блокировки элементов формы
  var disableForm = function (formArray) {
    for (var z = 0; z < formArray.length; z++) {
      formArray[z].setAttribute('disabled', 'disabled');
    }
  };

  // Блокировка формы fieldset
  disableForm(window.form.adFormDisabledInput);

  // Блокировка формы фильтров
  disableForm(window.form.adFormDisabledFilters);

  var mapMainPinX = window.map.mapMainPin.offsetLeft + (window.constants.WIDTH_MAP_PIN_MAIN / 2);
  var mapMainPinY = window.map.mapMainPin.offsetTop + (window.constants.HEIGHT_MAP_PIN_MAIN / 2);
  window.form.address.value = mapMainPinX + ', ' + mapMainPinY;

  // Минимальное значение поля «Цена за ночь»
  var typeProperty = document.querySelector('#type');
  var price = document.querySelector('#price');

  var typePropertyArray = [
    {
      value: 'bungalo',
      min: 0,
    },
    {
      value: 'flat',
      min: 1000,
    },
    {
      value: 'house',
      min: 5000,
    },
    {
      value: 'palace',
      min: 10000,
    }
  ];

  typeProperty.addEventListener('change', function () {
    for (var l = 0; l < typePropertyArray.length; l++) {
      if (typeProperty.value === typePropertyArray[l].value) {
        price.min = typePropertyArray[l].min;
        price.placeholder = typePropertyArray[l].min;
      }
    }
  });

  // Синхронизация полей «Время заезда» и «Время выезда».
  var arrival = document.querySelector('#timein');
  var departure = document.querySelector('#timeout');

  arrival.addEventListener('change', function () {
    departure.value = arrival.value;
  });

  departure.addEventListener('change', function () {
    arrival.value = departure.value;
  });

  var guestListMap = {
    1: [1],
    2: [2, 1],
    3: [3, 2, 1],
    100: [0],
  };

  var inputRoom = document.querySelector('#room_number');
  var inputGuest = document.querySelector('#capacity');
  var optionGuest = inputGuest.querySelectorAll('option');

  var generateGuestOptions = function () {
    var valueRoom = inputRoom.value;
    var optionFinal = '';

    optionGuest.forEach(function (option) {
      if (guestListMap[valueRoom].indexOf(+option.value) > -1) {
        optionFinal += option.outerHTML;
      }
    });
    inputGuest.innerHTML = optionFinal;
  };
  generateGuestOptions();

  inputRoom.addEventListener('change', function () {
    generateGuestOptions();
  });
})();

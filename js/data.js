'use strict';
(function () {
  window.constants = {
    // Параметры меток
    WIDTH_MAP_PIN: 50,
    HEIGHT_MAP_PIN: 70,
    WIDTH_MAP_PIN_MAIN: 65,
    HEIGHT_MAP_PIN_MAIN: 65,
    YMAXMAP: 630,
    YMINMAP: 130,
    CORNER: 16 // 16 = height от after минус transform
  };

  window.form = {
    address: document.querySelector('#address'),
    adForm: document.querySelector('.ad-form'),
    // Функция обновления координат адреса
    getAddressUpdate: function () {
      var x = window.map.mapMainPin.offsetLeft + (window.constants.WIDTH_MAP_PIN_MAIN / 2);
      var y = window.map.mapMainPin.offsetTop + (window.constants.HEIGHT_MAP_PIN_MAIN + window.constants.CORNER);
      window.form.address.value = x + ', ' + y;
    },
    // Функция активации элементов формы
    enableForm: function (formArray) {
      for (var p = 0; p < formArray.length; p++) {
        formArray[p].removeAttribute('disabled');
      }
    },
    // Блокировка формы fieldset
    adFormDisabledInput: document.querySelectorAll('.ad-form fieldset'),
    adFormDisabledFilters: document.querySelectorAll('.map__filters .map__filter, .map__features'),
  };

  window.map = {
    main: document.querySelector('main'),
    mapPins: document.querySelector('.map__pins'), // Находим карту
    map: document.querySelector('.map'), // Переключаем карту в активное состояние
    mapMainPin: document.querySelector('.map__pin--main'),
    // Минимальные и максимальные координаты x для карты
    xMaxMap: document.querySelector('.map__pins').offsetWidth - (window.constants.WIDTH_MAP_PIN / 2),
    xMinMap: window.constants.WIDTH_MAP_PIN / 2,

    // Функция заполнения блока DOM-элементами на основе массива JS-объектов //
    displayButtons: function (advertsArray) {
      for (var j = 0; j < advertsArray.length; j++) { // Создаем цикл для каждого объекта
        var button = window.pin.getButton(advertsArray[j]);

        window.map.mapPins.appendChild(button); // Вставляем button в DOM
      }
    },
  };

  window.methods = {
    // Функция получения рандомного числа
    getRandom: function (min, max) {
      return (Math.round(min + Math.random() * (max - min)));
    }
  };
})();

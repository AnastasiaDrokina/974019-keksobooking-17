'use strict';
(function () {
  window.common = {
    constants: {
      WIDTH_MAP_PIN: 50,
      HEIGHT_MAP_PIN: 70,
      WIDTH_MAP_PIN_MAIN: 65,
      HEIGHT_MAP_PIN_MAIN: 65,
      YMAXMAP: 630,
      YMINMAP: 130,
      CORNER: 16, // 16 = height от after минус transform
      TOP_INITIAL: 375,
      LEFT_INITIAL: 570,
      FILES_TYPE: ['gif', 'jpg', 'jpeg', 'png'],
      MAX_RESULTS: 5,
      LOW_PRICE: 10000,
      HIGH_PRICE: 50000,
      DEBOUNCE_DELAY: 500,
      SUCCESS_STATUS: 200,
      XHR_TIMEOUT: 10000,
      ENTER_KEYCODE: 13,
      ESCAPE_KEYCODE: 27,
      WIDTH_PHOTO: 70,
      HEIGH_PHOTO: 70
    },

    form: {
      address: document.querySelector('#address'),
      adForm: document.querySelector('.ad-form'),
      // Функция обновления координат адреса
      getAddressUpdate: function () {
        var x = window.common.map.mainPin.offsetLeft + (window.common.constants.WIDTH_MAP_PIN_MAIN / 2);
        var y = window.common.map.mainPin.offsetTop + (window.common.constants.HEIGHT_MAP_PIN_MAIN + window.common.constants.CORNER);
        window.common.form.address.value = x + ', ' + y;
      },
      // Функция активации элементов формы
      enable: function (forms) {
        for (var p = 0; p < forms.length; p++) {
          forms[p].disabled = false;
        }
      },

      disable: function (forms) {
        for (var p = 0; p < forms.length; p++) {
          forms[p].disabled = true;
        }
      },

      // Блокировка формы fieldset
      adFormDisabledInput: document.querySelectorAll('.ad-form fieldset'),
      adFormDisabledFilters: document.querySelectorAll('.map__filters .map__filter, .map__features'),
    },

    map: {
      firstMove: false,
      main: document.querySelector('main'),
      pins: document.querySelector('.map__pins'), // Находим карту
      map: document.querySelector('.map'), // Переключаем карту в активное состояние
      mainPin: document.querySelector('.map__pin--main'),

      // Функция заполнения блока DOM-элементами на основе массива JS-объектов //
      displayButtons: function (adverts) {
        for (var j = 0; j < adverts.length; j++) { // Создаем цикл для каждого объекта
          var button = window.pin.getButton(adverts[j]);
          window.common.map.pins.appendChild(button); // Вставляем button в DOM
        }
      },
    },

    modal: {
      onError: function (message) {
        var templateError = document.querySelector('#error').content.querySelector('.error');
        var error = templateError.cloneNode(true);
        var errorMessage = error.querySelector('.error__message');

        errorMessage.textContent = message;

        var onClose = function () {
          var errorParent = error.parentNode;
          errorParent.removeChild(error);
          document.removeEventListener('keydown', onErrorEscPress);
        };

        var onErrorEscPress = function (evt) {
          if (evt.keyCode === window.common.constants.ESCAPE_KEYCODE) {
            onClose();
          }
        };

        error.addEventListener('click', onClose);

        document.addEventListener('keydown', onErrorEscPress);
        document.querySelector('body').appendChild(error);
      }
    }
  };
})();

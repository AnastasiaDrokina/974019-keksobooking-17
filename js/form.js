'use strict';
(function () {
  // Блокировка формы fieldset
  window.form.disableForm(window.form.adFormDisabledInput);

  // Блокировка формы фильтров
  window.form.disableForm(window.form.adFormDisabledFilters);

  var getInitialAddress = function () {
    var mapMainPinX = window.map.mapMainPin.offsetLeft + (window.constants.WIDTH_MAP_PIN_MAIN / 2);
    var mapMainPinY = window.map.mapMainPin.offsetTop + (window.constants.HEIGHT_MAP_PIN_MAIN / 2);
    window.form.address.value = mapMainPinX + ', ' + mapMainPinY;
  };
  getInitialAddress();

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

  // Cообщения отправке формы
  var form = document.querySelector('.ad-form');

  var displaySuccessMessage = function () {
    var templateSuccess = document.querySelector('#success').content.querySelector('.success');
    var success = templateSuccess.cloneNode(true);

    var onClose = function () {
      var successParent = success.parentNode;
      successParent.removeChild(success);
      document.removeEventListener('keydown', onSuccessEscPress);
    };

    var onSuccessEscPress = function (evt) {
      if (evt.keyCode === 27) {
        onClose();
      }
    };
    success.addEventListener('click', onClose);

    document.addEventListener('keydown', onSuccessEscPress);
    document.querySelector('body').appendChild(success);
  };

  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
    resetMap();
  });

  var resetForm = function () {
    // Форма заdisabled
    form.classList.add('ad-form--disabled');
    // Сброс формы
    form.reset();
    // Блокировка формы fieldset
    window.form.disableForm(window.form.adFormDisabledInput);
    // Блокировка формы фильтров
    window.form.disableForm(window.form.adFormDisabledFilters);
  };

  var resetMap = function () {
    window.map.firstMove = false;
    // Меняем главную метку
    window.map.mapMainPin.style.left = window.constants.LEFT_INITIAL + 'px';
    window.map.mapMainPin.style.top = window.constants.TOP_INITIAL + 'px';
    getInitialAddress();

    // Активируем карту
    window.map.map.classList.add('map--faded');
    // Удаление пинов с карты
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.parentNode.removeChild(pin);
    });
    // Удаление попапов с карты
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.parentNode.removeChild(popup);
    }
  };

  var onSuccess = function () {
    displaySuccessMessage();
    resetForm();
    resetMap();
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(form), 'https://js.dump.academy/keksobooking', onSuccess, window.modal.onError);
  });
})();

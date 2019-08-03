'use strict';
(function () {
  // Блокировка формы fieldset
  window.common.form.disable(window.common.form.adFormDisabledInput);

  // Блокировка формы фильтров
  window.common.form.disable(window.common.form.adFormDisabledFilters);

  var getInitialAddress = function () {
    var mapMainPinX = window.common.map.mainPin.offsetLeft + (window.common.constants.WIDTH_MAP_PIN_MAIN / 2);
    var mapMainPinY = window.common.map.mainPin.offsetTop + (window.common.constants.HEIGHT_MAP_PIN_MAIN / 2);
    window.common.form.address.value = mapMainPinX + ', ' + mapMainPinY;
  };
  getInitialAddress();

  // Доступность checkbox
  var onCheckboxEnterPress = function (evt) {
    if (evt.keyCode === window.common.constants.ENTER_KEYCODE) {
      evt.preventDefault();
      if (evt.target.checked === true) {
        evt.target.checked = false;
      } else {
        evt.target.checked = true;
      }
    }
  };
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('keydown', onCheckboxEnterPress);
  });

  // Минимальное значение поля «Цена за ночь»
  var typeProperty = document.querySelector('#type');
  var price = document.querySelector('#price');

  var propertiesType = [
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
    for (var l = 0; l < propertiesType.length; l++) {
      if (typeProperty.value === propertiesType[l].value) {
        price.min = propertiesType[l].min;
        price.placeholder = propertiesType[l].min;
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
      if (evt.keyCode === window.common.constants.ESCAPE_KEYCODE) {
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
    window.common.form.disable(window.common.form.adFormDisabledInput);
    // Блокировка формы фильтров
    window.common.form.disable(window.common.form.adFormDisabledFilters);

    // Сброс аватара
    var preview = document.querySelector('.ad-form-header__preview img');
    preview.src = 'img/muffin-grey.svg';
    // Сброс фото жилья
    var previewPhotos = document.querySelectorAll('.ad-form__photo');
    previewPhotos.forEach(function (photo) {
      photo.parentNode.removeChild(photo);
    });
    var emptyPreviewPhoto = document.createElement('div');
    var previewParent = document.querySelector('.ad-form__photo-container');
    emptyPreviewPhoto.classList.add('ad-form__photo');
    previewParent.appendChild(emptyPreviewPhoto);
  };

  var resetMap = function () {
    window.common.map.firstMove = false;
    // Меняем главную метку
    window.common.map.mainPin.style.left = window.common.constants.LEFT_INITIAL + 'px';
    window.common.map.mainPin.style.top = window.common.constants.TOP_INITIAL + 'px';
    getInitialAddress();

    // Активируем карту
    window.common.map.map.classList.add('map--faded');
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
    window.upload(new FormData(form), 'https://js.dump.academy/keksobooking', onSuccess, window.common.modal.onError);
  });
})();

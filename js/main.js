'use strict';
// Параметры меток
var WIDTH_MAP_PIN = 50;
var HEIGHT_MAP_PIN = 70;
var WIDTH_MAP_PIN_MAIN = 65;
var HEIGHT_MAP_PIN_MAIN = 65;

// Функция получения рандомного числа
var getRandom = function (min, max) {
  return (Math.round(min + Math.random() * (max - min)));
};

// Минимальные и максимальные координаты x для карты
var xMaxMap = document.querySelector('.map__pins').offsetWidth - (WIDTH_MAP_PIN / 2);
var xMinMap = WIDTH_MAP_PIN / 2;

var xMaxMapMain = document.querySelector('.map__pins').offsetWidth - WIDTH_MAP_PIN_MAIN;
var xMinMapMain = 0;

var yMaxMapMain = 630 - (HEIGHT_MAP_PIN_MAIN + 16);
var yMinMapMain = 130;

// Массив, состоящий из сгенерированных объектов
var advertsGenerated = [];
var places = ['palace', 'flat', 'house', 'bungalo'];

for (var i = 0; i < 8; i++) {
  var userId = i + 1;
  var advertObject = {
    author: {
      avatar: 'img/avatars/user0' + userId + '.png'
    },
    offer: {
      type: places[getRandom(0, 3)]
    },
    location: {
      x: getRandom(xMinMap, xMaxMap),
      y: getRandom(130, 630),
    }
  };
  advertsGenerated.push(advertObject);
}

// Переключаем карту в активное состояние
var map = document.querySelector('.map');
// map.classList.remove('map--faded');

// Находим карту
var mapPins = document.querySelector('.map__pins');

// Находим template -> document-fragment -> button(метку)
var template = document.querySelector('#pin').content.querySelector('.map__pin');


// Функция создания DOM-элемента на основе JS-объекта //

var getButton = function (advert) {
  // Сохраняем в переменных каждое свойство объекта
  var avatar = advert.author.avatar;
  // var type = advert.offer.type;
  var x = advert.location.x - (WIDTH_MAP_PIN / 2);
  var y = advert.location.y - HEIGHT_MAP_PIN;

  // Клонируем button из template
  var button = template.cloneNode(true);

  // Меняем значения атрибутов button
  button.style.left = x + 'px';
  button.style.top = y + 'px';
  button.children[0].src = avatar;
  // button.children[0].alt = ; Здесь будет "alt"

  // Возвращаем button с новыми значениями
  return button;
};

// Функция заполнения блока DOM-элементами на основе массива JS-объектов //
var displayButtons = function (advertsArray) {
  for (var j = 0; j < advertsArray.length; j++) { // Создаем цикл для каждого объекта
    var button = getButton(advertsArray[j]);

    mapPins.appendChild(button); // Вставляем button в DOM
  }
};

// Функция блокировки элементов формы
var disableForm = function (formArray) {
  for (var z = 0; z < formArray.length; z++) {
    formArray[z].setAttribute('disabled', 'disabled');
  }
};

// Блокировка формы fieldset
var adFormDisabledInput = document.querySelectorAll('.ad-form fieldset');
disableForm(adFormDisabledInput);

// Блокировка формы фильтров
var adFormDisabledFilters = document.querySelectorAll('.map__filters .map__filter, .map__features');
disableForm(adFormDisabledFilters);


// Функция активации элементов формы
var enableForm = function (formArray) {
  for (var p = 0; p < formArray.length; p++) {
    formArray[p].removeAttribute('disabled');
  }
};

var adForm = document.querySelector('.ad-form');

// Перевод страницы в активный режим
var onPageActive = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  enableForm(adFormDisabledInput);
  enableForm(adFormDisabledFilters);
  displayButtons(advertsGenerated);
};

var mapMainPin = document.querySelector('.map__pin--main');
var mapMainPinX = mapMainPin.offsetLeft + (WIDTH_MAP_PIN_MAIN / 2);
var mapMainPinY = mapMainPin.offsetTop + (HEIGHT_MAP_PIN_MAIN / 2);
var address = document.querySelector('#address');
var firstMove = false;

address.value = mapMainPinX + ', ' + mapMainPinY;

// Функция обновления координат адреса
var getAddressUpdate = function () {
  var x = mapMainPin.offsetLeft + (WIDTH_MAP_PIN_MAIN / 2);
  var y = mapMainPin.offsetTop + (HEIGHT_MAP_PIN_MAIN + 16); // 16 = height от after минус transform
  address.value = x + ', ' + y;
};

mapMainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

// Цикл Drag-and-drop
  var onMouseMove = function (moveEvt) {
    if (!firstMove) {
      onPageActive();
      firstMove = true;
    }

    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var markerCoords = {
      x: mapMainPin.offsetLeft - shift.x,
      y: mapMainPin.offsetTop - shift.y,
    };

// Ограничения перетаскивания
    if (markerCoords.x < xMinMapMain) {
      markerCoords.x = xMinMapMain;
    } else {
      markerCoords.x = markerCoords.x;
    }

    if (markerCoords.x > xMaxMapMain) {
      markerCoords.x = xMaxMapMain;
    } else {
      markerCoords.x = markerCoords.x;
    }

    if (markerCoords.y < yMinMapMain) {
      markerCoords.y = yMinMapMain;
    } else {
      markerCoords.y = markerCoords.y;
    }

    if (markerCoords.y > yMaxMapMain) {
      markerCoords.y = yMaxMapMain;
    } else {
      markerCoords.y = markerCoords.y;
    }

    mapMainPin.style.left = markerCoords.x + 'px';
    mapMainPin.style.top = markerCoords.y + 'px';

    getAddressUpdate();

  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    getAddressUpdate();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

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

// Синхронизация полей «Время заезда» и «Время выезда»
var arrival = document.querySelector('#timein');
var departure = document.querySelector('#timeout');

arrival.addEventListener('change', function () {
  departure.value = arrival.value;
});

departure.addEventListener('change', function () {
  arrival.value = departure.value;
});

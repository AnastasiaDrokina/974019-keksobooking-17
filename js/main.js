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
var xMaxMap = document.querySelector('.map__pins').offsetWidth - WIDTH_MAP_PIN;
var xMinMap = WIDTH_MAP_PIN / 2;

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
var mainPin = document.querySelector('.map__pin--main');

// onClick
var onMainPinClick = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  enableForm(adFormDisabledInput);
  enableForm(adFormDisabledFilters);
  displayButtons(advertsGenerated);
};

mainPin.addEventListener('click', onMainPinClick);

var mapMainPin = document.querySelector('.map__pin--main');
var mapMainPinX = mapMainPin.offsetLeft + (WIDTH_MAP_PIN_MAIN / 2);
var mapMainPinY = mapMainPin.offsetTop + (HEIGHT_MAP_PIN_MAIN / 2);
var address = document.querySelector('#address');

address.value = mapMainPinX + ', ' + mapMainPinY;

// onMouseup
var onMainPinMouseup = function () {
  mapMainPinX = mapMainPin.offsetLeft + (WIDTH_MAP_PIN_MAIN / 2);
  mapMainPinY = mapMainPin.offsetTop + (HEIGHT_MAP_PIN_MAIN + 16); // 16 = height от after минус transform
  address.value = mapMainPinX + ', ' + mapMainPinY;
};

mainPin.addEventListener('mouseup', onMainPinMouseup);

// Минимальное значение поля «Цена за ночь»
var typeProperty = document.querySelector('#type');
var price = document.querySelector('#price');

typeProperty.addEventListener('change', function () {
  if (typeProperty.value === 'bungalo') {
    price.min = 0;
    price.placeholder = '0';
  }
  if (typeProperty.value === 'flat') {
    price.min = 1000;
    price.placeholder = '1000';
  }
  if (typeProperty.value === 'house') {
    price.min = 5000;
    price.placeholder = '5000';
  }
  if (typeProperty.value === 'palace') {
    price.min = 10000;
    price.placeholder = '10000';
  }
});

// Синхронизация полей «Время заезда» и «Время выезда»
var arrival = document.querySelector('#timein');
var departure = document.querySelector('#timeout');

arrival.addEventListener('change', function () {
  if (arrival.value === '12:00') {
    departure.value = '12:00';
  }
  if (arrival.value === '13:00') {
    departure.value = '13:00';
  }
  if (arrival.value === '14:00') {
    departure.value = '14:00';
  }
});

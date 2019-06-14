'use strict';
// Параметры метки
var WIDTH_MAP_PIN = 50;
var HEIGHT_MAP_PIN = 70;

// 1. Функция генерации случайных данных //
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
map.classList.remove('map--faded');

// Находим карту
var mapPins = document.querySelector('.map__pins');

// Находим template -> document-fragment -> button(метку)
var template = document.querySelector('#pin').content.querySelector('.map__pin');


// 2. Функция создания DOM-элемента на основе JS-объекта //

var getButton = function (advert) {
  // 2.1. Сохраняем в переменных каждое свойство объекта
  var avatar = advert.author.avatar;
  // var type = advert.offer.type;
  var x = advert.location.x - (WIDTH_MAP_PIN / 2);
  var y = advert.location.y - HEIGHT_MAP_PIN;

  // 2.2. Клонируем button из template
  var button = template.cloneNode(true);

  // 2.3. Меняем значения атрибутов button
  button.style.left = x + 'px';
  button.style.top = y + 'px';
  button.children[0].src = avatar;
  // button.children[0].alt = ; Здесь будет "alt"

  // 2.4. Возвращаем button с новыми значениями
  return button;
};

// 3.Функция заполнения блока DOM-элементами на основе массива JS-объектов //
var displayButtons = function (advertsArray) {
  for (var j = 0; j < advertsArray.length; j++) { // Создаем цикл для каждого объекта
    var button = getButton(advertsArray[j]);

    mapPins.appendChild(button); // Вставляем button в DOM
  }
};
displayButtons(advertsGenerated);

'use strict';
// 1. Функцию генерации случайных данных //

// Функция случайного числа координата "x" метки на карте
var getRandomX = function () {
  return Math.floor(Math.random() * document.querySelector('.map__pins').offsetWidth);
};

// Функция случайного числа координата "y" метки на карте
var getRandomY = function () {
  return Math.floor(Math.random() * (630 - 130) + 130);
};

// Массив, описывающий похожие объявления неподалёку
var adverts = [
  {
    author: {
      avatar: 'img/avatars/user01.png'
    },
    offer: {
      type: 'palace'
    },
    location: {
      x: getRandomX(),
      y: getRandomY(),
    }
  },

  {
    author: {
      avatar: 'img/avatars/user02.png'
    },
    offer: {
      type: 'flat'
    },
    location: {
      x: getRandomX(),
      y: getRandomY(),
    }
  },

  {
    author: {
      avatar: 'img/avatars/user03.png'
    },
    offer: {
      type: 'house'
    },
    location: {
      x: getRandomX(),
      y: getRandomY(),
    }
  },

  {
    author: {
      avatar: 'img/avatars/user04.png'
    },
    offer: {
      type: 'bungalo'
    },
    location: {
      x: getRandomX(),
      y: getRandomY(),
    }
  },

  {
    author: {
      avatar: 'img/avatars/user05.png'
    },
    offer: {
      type: 'palace'
    },
    location: {
      x: getRandomX(),
      y: getRandomY(),
    }
  },

  {
    author: {
      avatar: 'img/avatars/user06.png'
    },
    offer: {
      type: 'flat'
    },
    location: {
      x: getRandomX(),
      y: getRandomY(),
    }
  },

  {
    author: {
      avatar: 'img/avatars/user07.png'
    },
    offer: {
      type: 'house'
    },
    location: {
      x: getRandomX(),
      y: getRandomY(),
    }
  },

  {
    author: {
      avatar: 'img/avatars/user08.png'
    },
    offer: {
      type: 'bungalo'
    },
    location: {
      x: getRandomX(),
      y: getRandomY(),
    }
  }
];


// Переключаем карту в активное состояние
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Находим карту
var mapPins = document.querySelector('.map__pins');

// Находим template -> document-fragment -> button(метку)
var template = document.querySelector('#pin').content.querySelector('.map__pin');

// Параметры метки
var WIDTH_MAP_PIN = 50;
var HEIGHT_MAP_PIN = 70;


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
  for (var i = 0; i < advertsArray.length; i++) { // Создаем цикл для каждого объекта
    var button = getButton(advertsArray[i]);

    mapPins.appendChild(button); // Вставляем button в DOM
  }
};
displayButtons(adverts);

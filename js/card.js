'use strict';
(function () {
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
        type: places[window.methods.getRandom(0, 3)]
      },
      location: {
        x: window.methods.getRandom(window.map.xMinMap, window.map.xMaxMap),
        y: window.methods.getRandom(130, 630),
      }
    };
    advertsGenerated.push(advertObject);
  }
  window.pin.adverts = advertsGenerated;
})();

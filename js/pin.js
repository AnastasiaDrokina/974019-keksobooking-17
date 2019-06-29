'use strict';
// модуль, который отвечает за создание пина — метки на карте;
(function () {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pin = {
    getButton: function (advert) {
      var avatar = advert.author.avatar;
      // var type = advert.offer.type;
      var x = advert.location.x - (window.constants.WIDTH_MAP_PIN / 2);
      var y = advert.location.y - window.constants.HEIGHT_MAP_PIN;
      var button = template.cloneNode(true);

      // Меняем значения атрибутов button
      button.style.left = x + 'px';
      button.style.top = y + 'px';
      button.children[0].src = avatar;
      // button.children[0].alt = ; Здесь будет "alt"
      return button;
    },
  };
})();

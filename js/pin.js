'use strict';
// модуль, который отвечает за создание пина — метки на карте;
(function () {
  var templateButton = document.querySelector('#pin').content.querySelector('.map__pin');
  var templatePopup = document.querySelector('#card').content.querySelector('.map__card');

  window.pin = {
    getButton: function (advert) {
      var avatar = advert.author.avatar;
      var x = advert.location.x - (window.constants.WIDTH_MAP_PIN / 2);
      var y = advert.location.y - window.constants.HEIGHT_MAP_PIN;

      var button = templateButton.cloneNode(true);

      // Меняем значения атрибутов button
      button.style.left = x + 'px';
      button.style.top = y + 'px';
      button.children[0].src = avatar;

      var onPopupEscPress = function (evt) {
        if (evt.keyCode === 27) {
          closePopup();
        }
      };

      var openPopup = function () {
        if (document.querySelector('.map__card')) {
          closePopup();
        }

        var popup = window.pin.getPopup(advert);
        window.map.mapPins.appendChild(popup);
        document.addEventListener('keydown', onPopupEscPress);
      };

      button.addEventListener('click', function () {
        openPopup();
      });

      var closePopup = function () {
        document.removeEventListener('keydown', onPopupEscPress);
        var popupParent = document.querySelector('.map__pins');
        var popupChild = document.querySelector('.map__card');
        popupParent.removeChild(popupChild);
      };

      return button;
    },

    getPopup: function (advert) {
      var avatar = advert.author.avatar;
      var title = advert.offer.title;
      var address = advert.offer.address;
      var price = advert.offer.price;
      var type = advert.offer.type;
      var room = advert.offer.rooms;
      var guest = advert.offer.guests;
      var checkin = advert.offer.checkin;
      var checkout = advert.offer.checkout;
      var feature = advert.offer.features;
      var featureHtml = '';
      var description = advert.offer.description;
      var photo = advert.offer.photos;
      var photoHtml = '';

      var popup = templatePopup.cloneNode(true);

      if (type === 'flat') {
        type = 'Квартира';
      }
      if (type === 'bungalo') {
        type = 'Бунгало';
      }
      if (type === 'house') {
        type = 'Дом';
      }
      if (type === 'palace') {
        type = 'Дворец';
      }

      for (var i = 0; i < feature.length; i++) {
        var li = '<li class="popup__feature popup__feature--' + feature[i] + '"></li>';
        featureHtml += li;
      }


      for (var k = 0; k < photo.length; k++) {
        var img = '<img src="' + photo[k] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
        photoHtml += img;
      }

      popup.querySelector('.popup__title').textContent = title;
      popup.querySelector('.popup__text--address').textContent = address;
      popup.querySelector('.popup__text--price').textContent = price + ' ₽/ночь';
      popup.querySelector('.popup__type').textContent = type;
      popup.querySelector('.popup__text--capacity').textContent = guest;
      popup.querySelector('.popup__text--capacity').textContent = room + ' комнаты для ' + guest + ' гостей';
      popup.querySelector('.popup__text--time').textContent = checkin;
      popup.querySelector('.popup__text--time').textContent = 'Заезд после ' + checkin + ' выезд до ' + checkout;
      popup.querySelector('.popup__features').innerHTML = featureHtml;
      popup.querySelector('.popup__description').textContent = description;
      popup.querySelector('.popup__photos').innerHTML = photoHtml;
      popup.querySelector('.popup__avatar').src = avatar;

      var closePopup = popup.querySelector('.popup__close');
      closePopup.addEventListener('click', function () {
        var popupParent = closePopup.parentNode;
        var mapParent = popupParent.parentNode;
        mapParent.removeChild(popupParent);
      });

      return popup;
    }
  };
})();

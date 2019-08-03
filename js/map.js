'use strict';
(function () {
  var xMaxMapMain = document.querySelector('.map__pins').offsetWidth - window.common.constants.WIDTH_MAP_PIN_MAIN;
  var xMinMapMain = 0;

  var yMaxMapMain = window.common.constants.YMAXMAP - (window.common.constants.HEIGHT_MAP_PIN_MAIN + window.common.constants.CORNER);
  var yMinMapMain = window.common.constants.YMINMAP - (window.common.constants.HEIGHT_MAP_PIN_MAIN + window.common.constants.CORNER);

  var onInit = function () {
    window.getCard();
    window.page.onActive();
    window.common.map.firstMove = true;
  };

  window.common.map.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.common.constants.ENTER_KEYCODE) {
      onInit();
    }
  });

  window.common.map.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Цикл Drag-and-drop
    var onMouseMove = function (moveEvt) {
      if (!window.common.map.firstMove) {
        onInit();
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
        x: window.common.map.mainPin.offsetLeft - shift.x,
        y: window.common.map.mainPin.offsetTop - shift.y,
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

      window.common.map.mainPin.style.left = markerCoords.x + 'px';
      window.common.map.mainPin.style.top = markerCoords.y + 'px';

      window.common.form.getAddressUpdate();

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.common.form.getAddressUpdate();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

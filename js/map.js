'use strict';
(function () {
  var xMaxMapMain = document.querySelector('.map__pins').offsetWidth - window.constants.WIDTH_MAP_PIN_MAIN;
  var xMinMapMain = 0;

  var yMaxMapMain = window.constants.YMAXMAP - (window.constants.HEIGHT_MAP_PIN_MAIN + window.constants.CORNER);
  var yMinMapMain = window.constants.YMINMAP - (window.constants.HEIGHT_MAP_PIN_MAIN + window.constants.CORNER);

  var onInit = function () {
    window.card();
    window.page.onPageActive();
    window.map.firstMove = true;
  };

  window.map.mapMainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      onInit();
    }
  });

  window.map.mapMainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Цикл Drag-and-drop
    var onMouseMove = function (moveEvt) {
      if (!window.map.firstMove) {
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
        x: window.map.mapMainPin.offsetLeft - shift.x,
        y: window.map.mapMainPin.offsetTop - shift.y,
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

      window.map.mapMainPin.style.left = markerCoords.x + 'px';
      window.map.mapMainPin.style.top = markerCoords.y + 'px';

      window.form.getAddressUpdate();

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.getAddressUpdate();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();

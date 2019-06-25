'use strict';
(function () {
  // Перевод страницы в активный режим
  window.page = {
    onPageActive: function () {
      window.map.map.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      window.form.enableForm(window.form.adFormDisabledInput);
      window.form.enableForm(window.form.adFormDisabledFilters);
      window.map.displayButtons(window.pin.adverts);
    },
  };

})();

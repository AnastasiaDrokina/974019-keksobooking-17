'use strict';
(function () {
  // Перевод страницы в активный режим
  window.page = {
    onActive: function () {
      window.common.map.map.classList.remove('map--faded');
      window.common.form.adForm.classList.remove('ad-form--disabled');
      window.common.form.enable(window.common.form.adFormDisabledInput);
      window.common.form.enable(window.common.form.adFormDisabledFilters);
    },
  };

})();

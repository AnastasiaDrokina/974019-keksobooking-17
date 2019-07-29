'use strict';
(function () {
  // Загрузка аватара
  var avatarInput = document.querySelector('#avatar');
  var preview = document.querySelector('.ad-form-header__preview img');

  avatarInput.addEventListener('change', function () {
    var file = avatarInput.files[0];
    var fileName = file.name.toLowerCase();

    if (file) {
      var matches = window.constants.FILES_TYPE.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  });

  // Загрузка нескольких фото жилья
  var photosInput = document.querySelector('#images');
  var previewParent = document.querySelector('.ad-form__photo-container');

  photosInput.addEventListener('change', function () {
    var file = photosInput.files[0];
    var fileName = file.name.toLowerCase();

    if (file) {
      var matches = window.constants.FILES_TYPE.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var previewPhoto = document.querySelector('.ad-form__photo');
          if (previewPhoto.querySelector('img')) {
            var copyPreviewPhoto = previewPhoto.cloneNode(true);
            var copyImgPhoto = copyPreviewPhoto.querySelector('img');

            copyImgPhoto.src = reader.result;
            previewParent.appendChild(copyPreviewPhoto);
          } else {
            var imgPhoto = document.createElement('img');

            imgPhoto.src = reader.result;
            imgPhoto.width = 70;
            imgPhoto.height = 70;
            previewPhoto.appendChild(imgPhoto);
          }
        });
        reader.readAsDataURL(file);
      }
    }
  });
})();
